import { gs, GlideDateTime, GlideRecord } from '@servicenow/glide'

function getSubmissionKey(current) {
    const reporterContact = (current.getValue('reporter_contact') || '').toString().trim().toLowerCase()
    if (reporterContact) {
        return `contact:${reporterContact}`
    }

    const reporterName = (current.getValue('reporter_name') || '').toString().trim().toLowerCase()
    if (reporterName) {
        return `name:${reporterName}`
    }

    const clientIp = (gs.getSession && gs.getSession().getClientIP && gs.getSession().getClientIP()) || ''
    if (clientIp) {
        return `ip:${clientIp}`
    }

    return `user:${gs.getUserID() || 'guest'}`
}

export function validateSubmissionThrottle(current) {
    const maxReportsPerDay = parseInt(gs.getProperty('x_2002275_unifie_0.max_reports_per_user_per_day', '0'), 10) || 0
    if (maxReportsPerDay <= 0) {
        return
    }

    const submissionKey = getSubmissionKey(current)
    const lookupValue = submissionKey.split(':').slice(1).join(':')
    const lookupField = submissionKey.startsWith('contact:')
        ? 'reporter_contact'
        : submissionKey.startsWith('name:')
            ? 'reporter_name'
            : null

    const gr = new GlideRecord('x_2002275_unifie_0_disaster_report')
    gr.addQuery('sys_created_on', '>=', 'javascript:gs.daysAgoStart(1)')
    if (lookupField) {
        gr.addQuery(lookupField, lookupValue)
    } else {
        gr.addQuery('sys_created_by', gs.getUserName())
    }
    gr.query()

    let count = 0
    while (gr.next()) {
        count += 1
        if (count >= maxReportsPerDay) {
            gs.addErrorMessage('You have reached the maximum number of disaster reports allowed for today. Please try again tomorrow.')
            if (current.setAbortAction) {
                current.setAbortAction(true)
            }
            return
        }
    }
}

function isValidReportNumber(numberValue) {
    return /^DR\d{6}$/.test((numberValue || '').toString().trim())
}

function syncLegacyReportNumberField(current, numberValue) {
    if (current.isValidField && current.isValidField('report_number')) {
        current.setValue('report_number', numberValue)
    }
}

function getNextIncrementalReportNumber(current) {
    const tableName = (current.getTableName && current.getTableName()) || 'x_2002275_unifie_0_disaster_report'
    const gr = new GlideRecord(tableName)
    gr.addNotNullQuery('number')
    gr.addQuery('number', 'STARTSWITH', 'DR')
    gr.orderByDesc('number')
    gr.setLimit(20)
    gr.query()

    let highest = 999
    while (gr.next()) {
        const candidate = (gr.getValue('number') || '').toString().trim()
        const match = /^DR(\d{6})$/.exec(candidate)
        if (match) {
            const numeric = parseInt(match[1], 10)
            if (!isNaN(numeric) && numeric > highest) {
                highest = numeric
            }
            break
        }
    }

    const next = Math.max(highest + 1, 1000)
    return `DR${next.toString().padStart(6, '0')}`
}

export function sanitizeReportNumber(current) {
    const currentNumber = (current.getValue('number') || '').toString().trim()
    const hasValidFormat = isValidReportNumber(currentNumber)

    if (hasValidFormat) {
        syncLegacyReportNumberField(current, currentNumber)
        return
    }

    // For inserts and updates, guarantee incremental DR###### when invalid or empty.
    const generatedNumber = getNextIncrementalReportNumber(current)
    current.setValue('number', generatedNumber)
    syncLegacyReportNumberField(current, generatedNumber)
}

export function generateReportNumber(current) {
    // Generate unique report number using GlideDateTime (scoped app compatible)
    const now = new GlideDateTime()
    const timestamp = now.getNumericValue()
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    current.setValue('report_number', `DR${timestamp}${random}`)
}

export function calculatePriority(current) {
    const damageSeverity = current.getValue('damage_severity') || 'moderate'
    const peopleAffected = parseInt(current.getValue('affected_individuals')) || 0
    const housesDamaged = parseInt(current.getValue('affected_households')) || 0
    
    let priority = 'medium'
    
    // High severity automatically gets high priority
    if (damageSeverity === 'catastrophic') {
        priority = 'critical'
    } else if (damageSeverity === 'severe') {
        priority = 'high'
    } else if (damageSeverity === 'minimal') {
        priority = 'low'
    }
    
    // Adjust based on impact
    if (peopleAffected > 100 || housesDamaged > 50) {
        priority = priority === 'critical' ? 'critical' : 'high'
    }
    
    if (peopleAffected > 1000 || housesDamaged > 500) {
        priority = 'critical'
    }
    
    current.setValue('priority_level', priority)
}

export function validateLocation(current) {
    const region = current.getValue('region')
    const province = current.getValue('province')  
    const city = current.getValue('municipality')
    
    // Only validate if this is coming from the web form (has certain fields)
    const reporterName = current.getValue('reporter_name')
    
    // Skip validation for system-generated records or if basic info is missing
    if (!reporterName) {
        return // Don't validate system records
    }
    
    // For web submissions, region/province/city are optional - don't abort
    if (!region && !province && !city) {
        gs.addInfoMessage('Location information is recommended for better disaster response coordination')
        return // Don't abort, just inform
    }
    
    // Additional validation for coordinates (if provided)
    const latitude = parseFloat(current.getValue('latitude')) || 0
    const longitude = parseFloat(current.getValue('longitude')) || 0
    
    if (latitude !== 0 && longitude !== 0) {
        // Basic Philippines coordinate bounds check
        if (latitude < 4.5 || latitude > 21.5 || longitude < 116.0 || longitude > 127.0) {
            gs.addInfoMessage('Location coordinates appear to be outside Philippines bounds')
        }
    }
}