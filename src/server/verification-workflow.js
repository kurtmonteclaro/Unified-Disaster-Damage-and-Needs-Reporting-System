import { gs, GlideDateTime } from '@servicenow/glide'

function getFieldValue(record, primaryField, fallbackField = '') {
    const primary = record.getValue(primaryField)
    if (primary !== null && primary !== undefined && String(primary).trim() !== '') {
        return String(primary)
    }
    return fallbackField ? String(record.getValue(fallbackField) || '') : ''
}

function setFieldValueIfExists(record, fieldName, value) {
    try {
        if (record.isValidField(fieldName)) {
            record.setValue(fieldName, value)
            return true
        }
    } catch (e) {
        gs.log(`Unable to set field ${fieldName}: ${e.message}`)
    }
    return false
}

function isSpamText(input) {
    const text = (input || '').trim()
    if (!text) {
        return true
    }

    const normalized = text.toLowerCase().replace(/\s+/g, ' ').trim()
    const meaningfulChars = normalized.replace(/[^a-z0-9]/g, '')
    if (meaningfulChars.length < 8) {
        return true
    }

    // Repeated characters like "aaaaaaa" or "!!!!!"
    if (/(.)\1{5,}/.test(normalized)) {
        return true
    }

    // Repeated words such as "help help help help"
    if (/\b(\w+)\b(?:\s+\1\b){3,}/.test(normalized)) {
        return true
    }

    // Common ad/unrelated tokens
    if (/\b(buy now|free offer|click here|subscribe|promo|discount|casino|crypto)\b/.test(normalized)) {
        return true
    }

    // Mostly non-word noise
    const wordCount = normalized.split(' ').filter(Boolean).length
    if (wordCount <= 2 && normalized.length < 20) {
        return true
    }

    return false
}

function getPriorityLevel(current) {
    const raw = getFieldValue(current, 'u_priority_level', 'priority_level') || getFieldValue(current, 'priority')
    const normalized = String(raw).toLowerCase()

    // Backward compatibility when existing AI output is numeric
    if (normalized === '1' || normalized === '2') {
        return 'high'
    }
    if (normalized === '3') {
        return 'medium'
    }
    if (normalized === '4' || normalized === '5') {
        return 'low'
    }

    if (['low', 'medium', 'high', 'critical'].includes(normalized)) {
        return normalized
    }
    return 'medium'
}

export function getAiValidationResult(current) {
    const damageDescription = getFieldValue(current, 'u_damage_description', 'damage_description')
    const immediateNeeds =
        getFieldValue(current, 'u_immediate_needs', 'immediate_needs') ||
        getFieldValue(current, 'u_needs', 'needs')
    const spamInput = `${damageDescription} ${immediateNeeds}`.trim()
    const priorityLevel = getPriorityLevel(current)

    return {
        is_spam: isSpamText(spamInput),
        priority_level: priorityLevel,
    }
}

export function applyAutomatedValidationStatus(current, isInsert = false) {
    const aiResult = getAiValidationResult(current)

    // Expected AI result shape required by workflow extension.
    gs.log(`AI validation result: ${JSON.stringify(aiResult)}`)

    if (aiResult.is_spam) {
        setFieldValueIfExists(current, 'u_verification_status', 'flagged_spam')
        setFieldValueIfExists(current, 'verification_status', 'flagged_spam')
        return
    }

    const incidentLifecycleStatus = getFieldValue(current, 'status')
    if (incidentLifecycleStatus === 'resolved' || incidentLifecycleStatus === 'closed') {
        setFieldValueIfExists(current, 'u_verification_status', 'completed')
        setFieldValueIfExists(current, 'verification_status', 'completed')
        return
    }

    if (isInsert) {
        setFieldValueIfExists(current, 'u_verification_status', 'processing')
        setFieldValueIfExists(current, 'verification_status', 'processing')
        return
    }

    if (aiResult.priority_level === 'high' || aiResult.priority_level === 'critical') {
        setFieldValueIfExists(current, 'u_verification_status', 'prioritized')
        setFieldValueIfExists(current, 'verification_status', 'prioritized')
        return
    }

    setFieldValueIfExists(current, 'u_verification_status', 'processing')
    setFieldValueIfExists(current, 'verification_status', 'processing')
}

export function sendHighPriorityNotification(current) {
    const priority = getPriorityLevel(current)
    const severity = current.getValue('severity')
    
    // Send notification for high priority reports
    if (priority === 'high' || priority === 'critical' || severity === 'high') {
        const reportNumber = current.getValue('number') || 'New Report'
        const location = `${current.getValue('municipality') || current.getValue('city_municipality') || 'Unknown'}, ${current.getValue('province') || 'Unknown'}, ${current.getValue('region') || 'Unknown'}`
        const disasterType = current.getValue('disaster_type')
        
        gs.addInfoMessage(`High priority disaster report ${reportNumber} submitted for ${disasterType} in ${location}`)
        
        // In a real implementation, this would send emails, SMS, or other notifications
        // to LGU officers and national agencies
    }
}