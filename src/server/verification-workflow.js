import { gs, GlideDateTime, GlideRecord } from '@servicenow/glide'

function hasLguOfficerRole() {
    return gs.hasRole('x_2002275.lgu_officer') || gs.hasRole('x_2002275_unified.lgu_officer')
}

function getFieldValue(record, primaryField, fallbackField) {
    const primary = record.getValue(primaryField)
    if (primary) {
        return primary
    }
    return fallbackField ? record.getValue(fallbackField) : ''
}

function setFieldValueIfExists(record, fieldName, value) {
    try {
        if (record.isValidField(fieldName)) {
            record.setValue(fieldName, value)
            return true
        }
    } catch (e) {
        gs.log(`Could not set ${fieldName}: ${e.message}`)
    }
    return false
}

export function initializeVerificationStatus(current) {
    const status = getFieldValue(current, 'u_verification_status', 'verification_status')

    if (!status) {
        setFieldValueIfExists(current, 'u_verification_status', 'pending')
        setFieldValueIfExists(current, 'verification_status', 'pending')
    }
}

export function routeToRegionalLguOfficer(current) {
    const region = getFieldValue(current, 'u_region', 'region')
    if (!region) {
        return
    }

    // Reuse standard assignment fields only when available in the current table.
    const canAssignToUser = current.isValidField('assigned_to')
    if (!canAssignToUser || current.getValue('assigned_to')) {
        return
    }

    const role = new GlideRecord('sys_user_role')
    role.addQuery('name', 'x_2002275.lgu_officer')
    role.addOrCondition('name', 'x_2002275_unified.lgu_officer')
    role.query()

    const roleIds = []
    while (role.next()) {
        roleIds.push(String(role.getUniqueValue()))
    }

    if (roleIds.length === 0) {
        return
    }

    const userRole = new GlideRecord('sys_user_has_role')
    userRole.addQuery('role', 'IN', roleIds.join(','))
    userRole.orderBy('sys_created_on')
    userRole.query()

    let fallbackOfficer = ''
    while (userRole.next()) {
        const userId = String(userRole.getValue('user'))
        if (!userId) {
            continue
        }

        if (!fallbackOfficer) {
            fallbackOfficer = userId
        }

        const user = new GlideRecord('sys_user')
        if (!user.get(userId) || user.getValue('active') !== 'true') {
            continue
        }

        const userRegion = user.isValidField('u_region')
            ? user.getValue('u_region')
            : (user.isValidField('region') ? user.getValue('region') : '')

        if (userRegion && userRegion === region) {
            current.setValue('assigned_to', userId)
            return
        }
    }

    if (fallbackOfficer) {
        current.setValue('assigned_to', fallbackOfficer)
    }
}

export function enforceVerificationUpdatePermission(current) {
    if (!current || current.operation() !== 'update') {
        return
    }

    const changed = (current.isValidField('u_verification_status') && current.u_verification_status.changes()) ||
        (current.isValidField('verification_status') && current.verification_status.changes())

    if (changed && !hasLguOfficerRole()) {
        gs.addErrorMessage('Only LGU officers can update verification status.')
        current.setAbortAction(true)
    }
}

export function sendHighPriorityNotification(current) {
    const priority = getFieldValue(current, 'u_priority_level', 'priority')
    const severity = current.getValue('severity')
    
    // Send notification for high priority reports (priority 1-2)
    if (priority === '1' || priority === '2' || severity === 'high') {
        const reportNumber = current.getValue('number') || 'New Report'
        const location = `${current.getValue('municipality') || current.getValue('city_municipality') || 'Unknown'}, ${current.getValue('province') || 'Unknown'}, ${current.getValue('region') || 'Unknown'}`
        const disasterType = current.getValue('disaster_type')
        
        gs.addInfoMessage(`High priority disaster report ${reportNumber} submitted for ${disasterType} in ${location}`)
        
        // In a real implementation, this would send emails, SMS, or other notifications
        // to LGU officers and national agencies
    }
}

export function processVerificationUpdate(current) {
    const verificationStatus = getFieldValue(current, 'u_verification_status', 'verification_status')
    let previousStatus = ''
    
    // Safely get previous status if this is an update operation
    try {
        if (current.isValidRecord() && current.operation() === 'update' && current.previous) {
            previousStatus = current.previous.getValue('u_verification_status') || current.previous.getValue('verification_status')
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
                // Update status to in_progress if currently new
                if (current.getValue('status') === 'new') {
                    current.setValue('status', 'in_progress')
                }
                break
                
            case 'rejected':
                gs.addInfoMessage(`Disaster report ${reportNumber} has been rejected`)
                current.setValue('status', 'resolved')
                break
                
            case 'needs_info':
                gs.addInfoMessage(`Additional information requested for report ${reportNumber}`)
                break
        }
        
        // Set verification date and user using GlideDateTime
        const now = new GlideDateTime()
        current.setValue('verification_date', now.getDisplayValue())
        current.setValue('verified_by', gs.getUserID())
    }
}