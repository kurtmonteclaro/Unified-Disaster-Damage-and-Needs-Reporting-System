import '@servicenow/sdk/global'
import { BusinessRule } from '@servicenow/sdk/core'
import { sanitizeReportNumber } from '../../server/disaster-report-validation.js'
import { sendHighPriorityNotification } from '../../server/verification-workflow.js'

BusinessRule({
    $id: 'br_sanitize_report_number',
    name: 'Sanitize Report Number',
    table: 'x_2002275_unifie_0_disaster_report',
    action: ['insert', 'update'],
    when: 'before',
    active: true,
    script: sanitizeReportNumber,
})

// Only keep the essential business rule for notifications (non-blocking)
BusinessRule({
    $id: Now.ID['br_notify_high_priority'],
    name: 'Notify High Priority Reports',
    table: 'x_2002275_unifie_0_disaster_report',
    action: ['insert', 'update'],
    when: 'after',
    active: true,
    script: sendHighPriorityNotification
})
