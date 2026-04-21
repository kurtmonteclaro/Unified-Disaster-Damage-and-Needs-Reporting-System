import '@servicenow/sdk/global'
import { ApplicationMenu, Record } from '@servicenow/sdk/core'
import { citizen_reporter_role, lgu_officer_role, national_agency_role, uddnrs_admin_role } from '../roles/uddnrs-roles.now.ts'

// Create a menu category for disaster management applications
export const disaster_management_category = Record({
    $id: Now.ID['disaster_category'],
    table: 'sys_app_category',
    data: {
        name: 'disaster_management',
        style: 'border-color: #dc3545; background-color: #f8d7da;'
    }
})

// Main UDDNRS application menu
export const uddnrs_application_menu = ApplicationMenu({
    $id: Now.ID['uddnrs_menu'],
    title: 'UDDNRS - Disaster Reporting',
    hint: 'Unified Disaster Damage and Needs Reporting System',
    description: 'Standardized disaster damage and needs reporting for citizens, LGUs, and national agencies',
    category: disaster_management_category,
    roles: [citizen_reporter_role, lgu_officer_role, national_agency_role, uddnrs_admin_role],
    active: true,
    order: 100
})

// Disaster Reports List (for all users)
export const disaster_reports_list_module = Record({
    $id: Now.ID['disaster_reports_list'],
    table: 'sys_app_module',
    data: {
        title: 'All Disaster Reports',
        application: uddnrs_application_menu,
        link_type: 'LIST',
        name: 'x_2002275_unified_disaster_report',
        hint: 'View all disaster reports',
        roles: [citizen_reporter_role, lgu_officer_role, national_agency_role, uddnrs_admin_role],
        active: true,
        order: 100
    }
})

// Submit New Report (for all users)
export const submit_report_module = Record({
    $id: Now.ID['submit_report'],
    table: 'sys_app_module',
    data: {
        title: 'Submit New Report',
        application: uddnrs_application_menu,
        link_type: 'NEW',
        name: 'x_2002275_unified_disaster_report',
        hint: 'Submit a new disaster damage report',
        roles: [citizen_reporter_role, lgu_officer_role, national_agency_role, uddnrs_admin_role],
        active: true,
        order: 200
    }
})

// Verification section separator
export const verification_separator = Record({
    $id: Now.ID['verification_separator'],
    table: 'sys_app_module',
    data: {
        title: 'Verification & Management',
        application: uddnrs_application_menu,
        link_type: 'SEPARATOR',
        roles: [lgu_officer_role, uddnrs_admin_role],
        active: true,
        order: 300
    }
})

// Pending Verification (LGU Officers and Admins)
export const pending_verification_module = Record({
    $id: Now.ID['pending_verification'],
    table: 'sys_app_module',
    data: {
        title: 'Pending Verification',
        application: uddnrs_application_menu,
        link_type: 'LIST',
        name: 'x_2002275_unified_disaster_report',
        filter: 'verification_status=processing',
        hint: 'Reports under automated processing',
        roles: [lgu_officer_role, uddnrs_admin_role],
        active: true,
        order: 310
    }
})

// Critical Reports (LGU Officers and Admins)
export const critical_reports_module = Record({
    $id: Now.ID['critical_reports'],
    table: 'sys_app_module',
    data: {
        title: 'Critical Priority Reports',
        application: uddnrs_application_menu,
        link_type: 'LIST',
        name: 'x_2002275_unified_disaster_report',
        filter: 'priority_level=critical^verification_status=prioritized',
        hint: 'Critical priority reports requiring immediate attention',
        roles: [lgu_officer_role, national_agency_role, uddnrs_admin_role],
        active: true,
        order: 320
    }
})

// Analytics section separator
export const analytics_separator = Record({
    $id: Now.ID['analytics_separator'],
    table: 'sys_app_module',
    data: {
        title: 'Analytics & Reports',
        application: uddnrs_application_menu,
        link_type: 'SEPARATOR',
        roles: [national_agency_role, uddnrs_admin_role],
        active: true,
        order: 400
    }
})

// Analytics Dashboard
export const analytics_dashboard_module = Record({
    $id: Now.ID['analytics_dashboard'],
    table: 'sys_app_module',
    data: {
        title: 'Analytics Dashboard',
        application: uddnrs_application_menu,
        link_type: 'DIRECT',
        query: 'x_2002275_unified_incident_manager.do',
        hint: 'View disaster reporting analytics and dashboards',
        roles: [national_agency_role, uddnrs_admin_role],
        active: true,
        order: 410
    }
})

// Administration section separator
export const admin_separator = Record({
    $id: Now.ID['admin_separator'],
    table: 'sys_app_module',
    data: {
        title: 'Administration',
        application: uddnrs_application_menu,
        link_type: 'SEPARATOR',
        roles: [uddnrs_admin_role],
        active: true,
        order: 500
    }
})

// System Properties (Admins only)
export const system_properties_module = Record({
    $id: Now.ID['system_properties'],
    table: 'sys_app_module',
    data: {
        title: 'System Properties',
        application: uddnrs_application_menu,
        link_type: 'LIST',
        name: 'sys_properties',
        filter: 'nameLIKEx_2002275_unified',
        hint: 'Configure UDDNRS system properties',
        roles: [uddnrs_admin_role],
        active: true,
        order: 510
    }
})

// User Role Management (Admins only)
export const role_management_module = Record({
    $id: Now.ID['role_management'],
    table: 'sys_app_module',
    data: {
        title: 'Role Management',
        application: uddnrs_application_menu,
        link_type: 'LIST',
        name: 'sys_user_role',
        filter: 'nameLIKEx_2002275_unified',
        hint: 'Manage UDDNRS user roles',
        roles: [uddnrs_admin_role],
        active: true,
        order: 520
    }
})