import { gs, GlideDateTime } from '@servicenow/glide'

export function generateReportNumber(current) {
    // Generate unique report number using GlideDateTime (scoped app compatible)
    const now = new GlideDateTime()
    const timestamp = now.getNumericValue()
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    current.setValue('report_number', `DR${timestamp}${random}`)
}

export function calculatePriority(current) {
    const severity = current.getValue('severity') || 'medium'
    const peopleAffected = parseInt(current.getValue('people_affected')) || 0
    const housesDamaged = parseInt(current.getValue('houses_damaged')) || 0
    
    let priority = 3 // Default to medium priority
    
    // High severity automatically gets high priority
    if (severity === 'high') {
        priority = 1
    } else if (severity === 'low') {
        priority = 5
    }
    
    // Adjust based on impact
    if (peopleAffected > 100 || housesDamaged > 50) {
        priority = Math.min(priority, 2) // Elevate to at least high-medium
    }
    
    if (peopleAffected > 1000 || housesDamaged > 500) {
        priority = 1 // Critical priority
    }
    
    current.setValue('priority', priority.toString())
}

export function validateLocation(current) {
    const region = current.getValue('region')
    const province = current.getValue('province')  
    const city = current.getValue('city_municipality') || current.getValue('municipality')
    
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