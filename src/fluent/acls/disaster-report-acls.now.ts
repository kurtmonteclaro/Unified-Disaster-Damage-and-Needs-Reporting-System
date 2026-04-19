import '@servicenow/sdk/global'
import { Acl } from '@servicenow/sdk/core'

// Create comprehensive ACLs for disaster report table
// Need to handle both regular access and cross-scope access

// ACL for Create operations - allow everyone to create disaster reports
Acl({
    $id: Now.ID['acl_disaster_report_create'],
    table: 'x_2002275_unified_disaster_report',
    operation: 'create',
    type: 'record',
    script: `
        // Allow everyone to create disaster reports - this is public safety
        answer = true;
    `,
    active: true
})

// ACL for Read operations - allow everyone to read disaster reports  
Acl({
    $id: Now.ID['acl_disaster_report_read'],
    table: 'x_2002275_unified_disaster_report',
    operation: 'read',
    type: 'record',
    script: `
        // Allow everyone to read disaster reports
        answer = true;
    `,
    active: true
})

// ACL for Write operations - allow everyone (for now, can be restricted later)
Acl({
    $id: Now.ID['acl_disaster_report_write'],
    table: 'x_2002275_unified_disaster_report',
    operation: 'write',
    type: 'record',
    script: `
        // Allow everyone to update disaster reports for now
        answer = true;
    `,
    active: true
})

// ACL for Delete operations - only allow admins
Acl({
    $id: Now.ID['acl_disaster_report_delete'],
    table: 'x_2002275_unified_disaster_report',
    operation: 'delete',
    type: 'record',
    script: `
        // Only allow admins to delete disaster reports
        answer = gs.hasRole('admin');
    `,
    active: true
})