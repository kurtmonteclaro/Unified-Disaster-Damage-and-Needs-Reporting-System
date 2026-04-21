import '@servicenow/sdk/global'
import { BusinessRule } from '@servicenow/sdk/core'
import { validateSubmissionThrottle } from '../../server/disaster-report-validation.js'
import { sanitizeReportNumber } from '../../server/disaster-report-validation.js'
import { enforceVerificationAccess } from '../../server/verification-workflow.js'
import { processAiInsights } from '../../server/disaster-report-ai.js'
import { sendHighPriorityNotification } from '../../server/verification-workflow.js'

BusinessRule({
    $id: 'br_validate_submission_throttle',
    name: 'Validate Submission Throttle',
    table: 'x_2002275_unifie_0_disaster_report',
    action: ['insert'],
    when: 'before',
    active: true,
    script: validateSubmissionThrottle,
})

BusinessRule({
    $id: 'br_sanitize_report_number',
    name: 'Sanitize Report Number',
    table: 'x_2002275_unifie_0_disaster_report',
    action: ['insert', 'update'],
    when: 'before',
    active: true,
    script: sanitizeReportNumber,
})

BusinessRule({
    $id: 'br_enforce_verification_access',
    name: 'Enforce Verification Access',
    table: 'x_2002275_unifie_0_disaster_report',
    action: ['update'],
    when: 'before',
    active: true,
    script: enforceVerificationAccess,
})

BusinessRule({
    $id: 'br_ai_report_insights',
    name: 'Generate AI Report Insights',
    table: 'x_2002275_unifie_0_disaster_report',
    action: ['insert', 'update'],
    when: 'after',
    active: true,
    script: processAiInsights,
})

// Only keep the essential business rule for notifications (non-blocking)
BusinessRule({
    $id: 'br_notify_high_priority',
    name: 'Notify High Priority Reports',
    table: 'x_2002275_unifie_0_disaster_report',
    action: ['insert', 'update'],
    when: 'after',
    active: true,
    script: sendHighPriorityNotification
})
