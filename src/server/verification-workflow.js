import { gs, GlideDateTime } from '@servicenow/glide'

function canVerifyDisasterReports() {
    return gs.hasRole('x_2002275_unifie_0.lgu_officer') || gs.hasRole('x_2002275_unifie_0.app_admin')
}

export function enforceVerificationAccess(current) {
    try {
        if (!current || !current.isValidRecord || !current.isValidRecord()) {
            return
        }

        if (!current.operation || current.operation() !== 'update') {
            return
        }

        const previousStatus = current.previous ? current.previous.getValue('verification_status') : ''
        const currentStatus = current.getValue('verification_status')

        if (currentStatus === previousStatus) {
            return
        }

        if (!canVerifyDisasterReports()) {
            gs.addErrorMessage('Only LGU Officers and App Admins can approve or reject disaster reports.')
            if (current.setAbortAction) {
                current.setAbortAction(true)
            }
            return
        }

        const now = new GlideDateTime()
        current.setValue('verified_by', gs.getUserID())
        current.setValue('verification_date', now.getDisplayValue())
    } catch (error) {
        gs.warn('Verification access check failed: ' + error.message)
    }
}

export function sendHighPriorityNotification(current) {
    const priority = current.getValue('priority_level')
    const severity = current.getValue('damage_severity')
    
    // Send notification for high priority reports
    if (priority === 'critical' || priority === 'high' || severity === 'catastrophic' || severity === 'severe') {
        const reportNumber = current.getValue('number') || 'New Report'
        const location = `${current.getValue('municipality') || 'Unknown'}, ${current.getValue('province') || 'Unknown'}, ${current.getValue('region') || 'Unknown'}`
        const disasterType = current.getValue('damage_type')
        
        gs.addInfoMessage(`High priority disaster report ${reportNumber} submitted for ${disasterType} in ${location}`)
        
        // In a real implementation, this would send emails, SMS, or other notifications
        // to LGU officers and national agencies
    }
}

export function processVerificationUpdate(current) {
    const verificationStatus = current.getValue('verification_status')
    let previousStatus = ''
    
    // Safely get previous status if this is an update operation
    try {
        if (current.isValidRecord() && current.operation() === 'update' && current.previous) {
            previousStatus = current.previous.getValue('verification_status')
        }
    } catch (e) {
        // If we can't get previous status, continue without comparison
        gs.log('Could not retrieve previous verification status: ' + e.message)
    }
    
    // Only process if verification status actually changed
    if (verificationStatus && verificationStatus !== previousStatus) {
        const reportNumber = current.getValue('number') || 'Report'
        
        switch (verificationStatus) {
            case 'verified':
                gs.addInfoMessage(`Disaster report ${reportNumber} has been verified`)
                break
                
            case 'rejected':
                gs.addInfoMessage(`Disaster report ${reportNumber} has been rejected`)
                break
                
            case 'resolved':
                gs.addInfoMessage(`Disaster report ${reportNumber} has been resolved`)
                break
        }
        
        // Set verification date and user using GlideDateTime
        const now = new GlideDateTime()
        current.setValue('verification_date', now.getDisplayValue())
        current.setValue('verified_by', gs.getUserID())
    }
}