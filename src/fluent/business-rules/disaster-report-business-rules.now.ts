import '@servicenow/sdk/global'
import { BusinessRule } from '@servicenow/sdk/core'
import { sendHighPriorityNotification } from '../../server/verification-workflow.js'

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