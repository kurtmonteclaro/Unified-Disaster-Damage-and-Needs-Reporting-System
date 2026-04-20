import '@servicenow/sdk/global'
import { Acl } from '@servicenow/sdk/core'

// Create comprehensive ACLs for disaster report table
// Need to handle both regular access and cross-scope access

// ACL for Create operations - allow app roles to create disaster reports
Acl({
    $id: Now.ID['acl_disaster_report_create'],
    table: 'x_2002275_unified_disaster_report',
    operation: 'create',
    type: 'record',
    script: `
        // Restrict create to app roles
        answer = gs.hasRole('x_2002275_unified.citizen') ||
            gs.hasRole('x_2002275_unified.lgu_officer') ||
            gs.hasRole('x_2002275_unified.national_agency') ||
            gs.hasRole('x_2002275_unified.app_admin');
    `,
    active: true
})

// ACL for Read operations - allow app roles to read disaster reports
Acl({
    $id: Now.ID['acl_disaster_report_read'],
    table: 'x_2002275_unified_disaster_report',
    operation: 'read',
    type: 'record',
    script: `
        // Restrict read to app roles
        answer = gs.hasRole('x_2002275_unified.citizen') ||
            gs.hasRole('x_2002275_unified.lgu_officer') ||
            gs.hasRole('x_2002275_unified.national_agency') ||
            gs.hasRole('x_2002275_unified.app_admin');
    `,
    active: true
})

// ACL for Write operations - staff/admin roles only
Acl({
    $id: Now.ID['acl_disaster_report_write'],
    table: 'x_2002275_unified_disaster_report',
    operation: 'write',
    type: 'record',
    script: `
        // Allow report updates for staff and app admins
        answer = gs.hasRole('x_2002275_unified.lgu_officer') ||
            gs.hasRole('x_2002275_unified.national_agency') ||
            gs.hasRole('x_2002275_unified.app_admin');
    `,
    active: true
})

// ACL for Delete operations - only app admins
Acl({
    $id: Now.ID['acl_disaster_report_delete'],
    table: 'x_2002275_unified_disaster_report',
    operation: 'delete',
    type: 'record',
    script: `
        // Only allow app admins to delete disaster reports
        answer = gs.hasRole('x_2002275_unified.app_admin');
    `,
    active: true
})