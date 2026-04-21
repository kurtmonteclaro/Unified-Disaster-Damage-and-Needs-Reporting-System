import '@servicenow/sdk/global'
import { BusinessRule } from '@servicenow/sdk/core'
import {
    enforceVerificationUpdatePermission,
    initializeVerificationStatus,
    routeToRegionalLguOfficer,
    sendHighPriorityNotification,
} from '../../server/verification-workflow.js'

BusinessRule({
    $id: 'br_initialize_verification_and_route_lgu_officer',
    name: 'Initialize Verification and Route LGU Officer',
    table: 'x_2002275_unified_disaster_report',
    action: ['insert'],
    when: 'before',
    active: true,
    script: (current: any) => {
        initializeVerificationStatus(current)
        routeToRegionalLguOfficer(current)
    },
})

BusinessRule({
    $id: 'br_restrict_verification_status_updates',
    name: 'Restrict Verification Status Updates',
    table: 'x_2002275_unified_disaster_report',
    action: ['update'],
    when: 'before',
    active: true,
    script: enforceVerificationUpdatePermission,
})

// Only keep the essential business rule for notifications (non-blocking)
BusinessRule({
    $id: Now.ID['br_notify_high_priority'],
    name: 'Notify High Priority Reports',
    table: 'x_2002275_unified_disaster_report',
    action: ['insert', 'update'],
    when: 'after',
    active: true,
    script: sendHighPriorityNotification
})