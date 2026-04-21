import '@servicenow/sdk/global'
import { BusinessRule } from '@servicenow/sdk/core'
import { applyAutomatedValidationStatus, sendHighPriorityNotification } from '../../server/verification-workflow.js'

BusinessRule({
    $id: 'br_auto_validation_status_insert',
    name: 'Auto Validation Status on Insert',
    table: 'x_2002275_unified_disaster_report',
    action: ['insert'],
    when: 'before',
    active: true,
    script: (current: any) => {
        applyAutomatedValidationStatus(current, true)
    },
})

BusinessRule({
    $id: 'br_auto_validation_status_update',
    name: 'Auto Validation Status on Update',
    table: 'x_2002275_unified_disaster_report',
    action: ['update'],
    when: 'before',
    active: true,
    script: (current: any) => {
        applyAutomatedValidationStatus(current, false)
    },
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