import '@servicenow/sdk/global'
import { Property } from '@servicenow/sdk/core'
import { uddnrs_admin_role, lgu_officer_role } from '../roles/uddnrs-roles.now.ts'

// Configuration properties for UDDNRS system
export const enable_geo_validation = Property({
    $id: Now.ID['geo_validation_prop'],
    name: 'x_2002275_unifie_0.enable_geo_validation',
    type: 'boolean',
    value: true,
    description: 'Enable validation of GPS coordinates within Philippines boundaries',
    roles: {
        read: [uddnrs_admin_role, lgu_officer_role],
        write: [uddnrs_admin_role]
    }
})

export const default_region = Property({
    $id: Now.ID['default_region_prop'],
    name: 'x_2002275_unifie_0.default_region',
    type: 'string',
    value: 'Region IV-A (CALABARZON)',
    description: 'Default region for new disaster reports',
    roles: {
        read: [uddnrs_admin_role, lgu_officer_role],
        write: [uddnrs_admin_role]
    }
})

export const auto_priority_assignment = Property({
    $id: Now.ID['auto_priority_prop'],
    name: 'x_2002275_unifie_0.auto_priority_assignment',
    type: 'boolean',
    value: true,
    description: 'Automatically assign priority levels based on damage severity and type',
    roles: {
        read: [uddnrs_admin_role, lgu_officer_role],
        write: [uddnrs_admin_role]
    }
})

export const notification_enabled = Property({
    $id: Now.ID['notification_enabled_prop'],
    name: 'x_2002275_unifie_0.notification_enabled',
    type: 'boolean',
    value: true,
    description: 'Enable notifications for critical disaster reports',
    roles: {
        read: [uddnrs_admin_role, lgu_officer_role],
        write: [uddnrs_admin_role]
    }
})

export const max_reports_per_user_per_day = Property({
    $id: Now.ID['max_reports_prop'],
    name: 'x_2002275_unifie_0.max_reports_per_user_per_day',
    type: 'integer',
    value: 10,
    description: 'Maximum number of reports a user can submit per day (0 for unlimited)',
    roles: {
        read: [uddnrs_admin_role, lgu_officer_role],
        write: [uddnrs_admin_role]
    }
})

export const verification_auto_assign = Property({
    $id: Now.ID['verification_auto_assign_prop'],
    name: 'x_2002275_unifie_0.verification_auto_assign',
    type: 'boolean',
    value: false,
    description: 'Automatically assign reports to LGU officers based on location',
    roles: {
        read: [uddnrs_admin_role, lgu_officer_role],
        write: [uddnrs_admin_role]
    }
})

export const multimedia_max_size_mb = Property({
    $id: Now.ID['multimedia_max_size_prop'],
    name: 'x_2002275_unifie_0.multimedia_max_size_mb',
    type: 'integer',
    value: 10,
    description: 'Maximum file size for multimedia attachments in MB',
    roles: {
        read: [uddnrs_admin_role, lgu_officer_role],
        write: [uddnrs_admin_role]
    }
})

export const api_rate_limit = Property({
    $id: Now.ID['api_rate_limit_prop'],
    name: 'x_2002275_unifie_0.api_rate_limit',
    type: 'integer',
    value: 100,
    description: 'API rate limit per hour per user (0 for unlimited)',
    roles: {
        read: [uddnrs_admin_role],
        write: [uddnrs_admin_role]
    }
})

export const ai_enabled = Property({
    $id: 'ai_enabled_prop',
    name: 'x_2002275_unifie_0.ai_enabled',
    type: 'boolean',
    value: false,
    description: 'Enable AI insights generation for disaster reports',
    roles: {
        read: [uddnrs_admin_role],
        write: [uddnrs_admin_role],
    },
})

export const ai_api_url = Property({
    $id: 'ai_api_url_prop',
    name: 'x_2002275_unifie_0.ai_api_url',
    type: 'string',
    value: 'https://api.openai.com/v1/chat/completions',
    description: 'External AI API endpoint URL',
    roles: {
        read: [uddnrs_admin_role],
        write: [uddnrs_admin_role],
    },
})

export const ai_model = Property({
    $id: 'ai_model_prop',
    name: 'x_2002275_unifie_0.ai_model',
    type: 'string',
    value: 'gpt-4o-mini',
    description: 'AI model identifier for report analysis',
    roles: {
        read: [uddnrs_admin_role],
        write: [uddnrs_admin_role],
    },
})

export const ai_api_key = Property({
    $id: 'ai_api_key_prop',
    name: 'x_2002275_unifie_0.ai_api_key',
    type: 'string',
    value: '',
    description: 'API key for external AI service (store securely)',
    roles: {
        read: [uddnrs_admin_role],
        write: [uddnrs_admin_role],
    },
})

export const ai_timeout_ms = Property({
    $id: 'ai_timeout_ms_prop',
    name: 'x_2002275_unifie_0.ai_timeout_ms',
    type: 'integer',
    value: 8000,
    description: 'Timeout in milliseconds for AI service requests',
    roles: {
        read: [uddnrs_admin_role],
        write: [uddnrs_admin_role],
    },
})
