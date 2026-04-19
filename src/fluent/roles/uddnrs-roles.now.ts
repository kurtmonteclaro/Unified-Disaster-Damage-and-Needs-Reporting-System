import '@servicenow/sdk/global'
import { Role } from '@servicenow/sdk/core'

// Citizens who can submit disaster reports
export const citizen_reporter_role = Role({
    $id: Now.ID['role_citizen_reporter'],
    name: 'x_2002275_unified.citizen_reporter',
    description: 'Citizens who can submit disaster damage reports'
})

// LGU officers who can verify and manage local reports
export const lgu_officer_role = Role({
    $id: Now.ID['role_lgu_officer'],
    name: 'x_2002275_unified.lgu_officer', 
    description: 'Local Government Unit officers who can verify and manage disaster reports'
})

// National agency representatives with broader access
export const national_agency_role = Role({
    $id: Now.ID['role_national_agency'],
    name: 'x_2002275_unified.national_agency',
    description: 'National agency representatives with access to all reports and analytics'
})

// System administrators
export const uddnrs_admin_role = Role({
    $id: Now.ID['role_uddnrs_admin'],
    name: 'x_2002275_unified.admin',
    description: 'UDDNRS System administrators with full access'
})