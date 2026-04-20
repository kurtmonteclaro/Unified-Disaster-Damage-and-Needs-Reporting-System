import { gs, GlideDateTime } from '@servicenow/glide'

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