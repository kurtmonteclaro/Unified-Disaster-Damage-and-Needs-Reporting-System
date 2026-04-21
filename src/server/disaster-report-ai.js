import { gs, GlideRecord } from '@servicenow/glide'

function clampText(value, maxLength = 1200) {
    const raw = (value || '').toString().trim()
    return raw.length > maxLength ? raw.substring(0, maxLength) : raw
}

function sanitizeForAi(value) {
    const text = clampText(value)
    return text
        .replace(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/g, '[redacted-email]')
        .replace(/(\+?\d[\d\s-]{7,}\d)/g, '[redacted-phone]')
}

function normalizePriority(value) {
    const v = (value || '').toString().trim().toLowerCase()
    if (['low', 'medium', 'high', 'critical'].indexOf(v) > -1) {
        return v
    }
    return ''
}

function normalizeUrgency(value) {
    return normalizePriority(value)
}

function normalizeDamageType(value) {
    const v = (value || '').toString().trim().toLowerCase().replace(/\s+/g, '_')
    const map = {
        typhoon: 'storm',
        storm_surge: 'storm',
        tornado: 'storm',
        wildfire: 'fire',
        quake: 'earthquake',
    }

    const normalized = map[v] || v
    const allowed = ['flood', 'storm', 'earthquake', 'landslide', 'fire', 'infrastructure_damage', 'other']
    return allowed.indexOf(normalized) > -1 ? normalized : 'other'
}

function extractJsonFromText(text) {
    if (!text) return null

    try {
        return JSON.parse(text)
    } catch (e) {
        // fall through
    }

    const fenced = text.match(/```json\s*([\s\S]*?)```/i)
    if (fenced && fenced[1]) {
        try {
            return JSON.parse(fenced[1])
        } catch (e) {
            // fall through
        }
    }

    const start = text.indexOf('{')
    const end = text.lastIndexOf('}')
    if (start > -1 && end > start) {
        try {
            return JSON.parse(text.substring(start, end + 1))
        } catch (e) {
            return null
        }
    }

    return null
}

function deriveNeedsFromText(damageDescription, immediateNeeds) {
    const text = `${damageDescription || ''} ${immediateNeeds || ''}`.toLowerCase()
    const tags = []

    if (/food|relief pack|ration/.test(text)) tags.push('food')
    if (/water|drinking/.test(text)) tags.push('water')
    if (/shelter|evacuation|tent/.test(text)) tags.push('shelter')
    if (/medicine|medical|first aid/.test(text)) tags.push('medical support')
    if (/power|electricity|generator/.test(text)) tags.push('power restoration')

    return tags
}

function heuristicPriority(input) {
    const severity = (input.damageSeverity || '').toLowerCase()
    const households = parseInt(input.affectedHouseholds, 10) || 0
    const individuals = parseInt(input.affectedIndividuals, 10) || 0

    if (severity === 'catastrophic') return 'critical'
    if (severity === 'severe') {
        return (households > 100 || individuals > 300) ? 'critical' : 'high'
    }
    if (severity === 'moderate') {
        return (households > 200 || individuals > 600) ? 'high' : 'medium'
    }
    if (households > 300 || individuals > 1000) return 'high'
    return 'low'
}

function fallbackSummary(input, keyNeeds, urgency) {
    const severityLabel = (input.damageSeverity || 'moderate').toLowerCase()
    const affected = parseInt(input.affectedHouseholds, 10) || 0
    const needs = keyNeeds.length ? keyNeeds.join(', ') : 'assessment support'
    const urgencyLabel = urgency || heuristicPriority(input)

    return `${severityLabel} incident affecting ${affected} households, urgent needs: ${needs} (${urgencyLabel})`
}

function getAiConfig() {
    return {
        enabled: gs.getProperty('x_2002275_unifie_0.ai_enabled', 'false') === 'true',
        endpoint: gs.getProperty('x_2002275_unifie_0.ai_api_url', ''),
        model: gs.getProperty('x_2002275_unifie_0.ai_model', 'gpt-4o-mini'),
        apiKey: gs.getProperty('x_2002275_unifie_0.ai_api_key', ''),
        timeoutMs: parseInt(gs.getProperty('x_2002275_unifie_0.ai_timeout_ms', '8000'), 10) || 8000,
    }
}

function hasRelevantChanges(current) {
    if (!current.operation || current.operation() === 'insert') {
        return true
    }

    try {
        return current.damage_description.changes() ||
            current.immediate_needs.changes() ||
            current.damage_severity.changes() ||
            current.affected_households.changes() ||
            current.affected_individuals.changes()
    } catch (e) {
        return true
    }
}

function callExternalAi(input, cfg) {
    try {
        const request = new sn_ws.RESTMessageV2()
        request.setHttpMethod('post')
        request.setEndpoint(cfg.endpoint)
        request.setRequestHeader('Content-Type', 'application/json')
        request.setRequestHeader('Authorization', `Bearer ${cfg.apiKey}`)
        request.setHttpTimeout(cfg.timeoutMs)

        const promptPayload = {
            damage_description: input.damageDescription,
            immediate_needs: input.immediateNeeds,
            damage_severity: input.damageSeverity,
            affected_households: input.affectedHouseholds,
            affected_individuals: input.affectedIndividuals,
        }

        const body = {
            model: cfg.model,
            temperature: 0.1,
            response_format: { type: 'json_object' },
            messages: [
                {
                    role: 'system',
                    content: 'You are a disaster response assistant. Return JSON only with keys: suggested_damage_type, urgency_level, key_needs (array of max 5 strings), predicted_priority_level, ai_summary.',
                },
                {
                    role: 'user',
                    content: JSON.stringify(promptPayload),
                },
            ],
        }

        request.setRequestBody(JSON.stringify(body))
        const response = request.execute()
        const status = response.getStatusCode()
        const responseBody = response.getBody() || ''

        gs.info(`[UDDNRS-AI] status=${status} body=${responseBody.substring(0, 800)}`)

        if (status < 200 || status >= 300) {
            return null
        }

        const parsed = JSON.parse(responseBody)
        const content = parsed?.choices?.[0]?.message?.content || ''
        return extractJsonFromText(content)
    } catch (error) {
        gs.warn(`[UDDNRS-AI] AI request failed: ${error}`)
        return null
    }
}

function updateRecordWithAi(current, aiResult, input, sourceLabel) {
    const rec = new GlideRecord(current.getTableName())
    if (!rec.get(current.getUniqueValue())) {
        return
    }

    const suggestedDamageType = normalizeDamageType(aiResult?.suggested_damage_type || input.damageType)
    const urgencyLevel = normalizeUrgency(aiResult?.urgency_level)
    const predictedPriority = normalizePriority(aiResult?.predicted_priority_level) || heuristicPriority(input)

    let keyNeeds = []
    if (Array.isArray(aiResult?.key_needs)) {
        keyNeeds = aiResult.key_needs
            .map((item) => clampText(item, 60))
            .filter(Boolean)
            .slice(0, 5)
    }
    if (!keyNeeds.length) {
        keyNeeds = deriveNeedsFromText(input.damageDescription, input.immediateNeeds)
    }

    const summary = clampText(
        aiResult?.ai_summary || fallbackSummary(input, keyNeeds, urgencyLevel),
        1000
    )

    rec.setValue('ai_suggested_damage_type', suggestedDamageType)
    rec.setValue('ai_urgency_level', urgencyLevel || predictedPriority)
    rec.setValue('ai_key_needs', keyNeeds.join(', '))
    rec.setValue('ai_priority_prediction', predictedPriority)
    rec.setValue('ai_summary', summary)

    // AI prediction is authoritative for the operational queue.
    rec.setValue('priority_level', predictedPriority)

    // Optionally enrich immediate_needs if empty.
    if (!rec.getValue('immediate_needs') && keyNeeds.length) {
        rec.setValue('immediate_needs', keyNeeds.join(', '))
    }

    rec.setWorkflow(false)
    rec.update()
    gs.info(`[UDDNRS-AI] Applied AI insights via ${sourceLabel} for ${current.getUniqueValue()}`)
}

export function processAiInsights(current) {
    try {
        if (!current || !current.isValidRecord || !current.isValidRecord()) {
            return
        }

        if (!hasRelevantChanges(current)) {
            return
        }

        const input = {
            damageDescription: sanitizeForAi(current.getValue('damage_description')),
            immediateNeeds: sanitizeForAi(current.getValue('immediate_needs')),
            damageSeverity: (current.getValue('damage_severity') || 'moderate').toString(),
            affectedHouseholds: current.getValue('affected_households') || '0',
            affectedIndividuals: current.getValue('affected_individuals') || '0',
            damageType: current.getValue('damage_type') || 'other',
        }

        const cfg = getAiConfig()

        if (!cfg.enabled || !cfg.endpoint || !cfg.apiKey) {
            updateRecordWithAi(current, null, input, 'fallback')
            return
        }

        const aiResult = callExternalAi(input, cfg)
        if (!aiResult) {
            updateRecordWithAi(current, null, input, 'fallback')
            return
        }

        updateRecordWithAi(current, aiResult, input, 'external-ai')
    } catch (error) {
        gs.warn(`[UDDNRS-AI] processAiInsights failed: ${error}`)
        // Non-blocking fail-safe: keep record creation path alive.
    }
}
