// Role-based access control system for UDDNRS
export const ROLES = {
    GUEST: 'guest',
    CITIZEN: 'citizen', 
    LGU_OFFICER: 'lgu_officer',
    NATIONAL_AGENCY: 'national_agency',
    APP_ADMIN: 'app_admin',
    ADMIN: 'app_admin'
}

export const ROLE_DISPLAY_NAMES = {
    [ROLES.GUEST]: 'Guest',
    [ROLES.CITIZEN]: 'Citizen',
    [ROLES.LGU_OFFICER]: 'LGU Officer', 
    [ROLES.NATIONAL_AGENCY]: 'National Agency',
    [ROLES.APP_ADMIN]: 'Application Admin'
}

export const ROLE_COLORS = {
    [ROLES.GUEST]: '#6b7280',
    [ROLES.CITIZEN]: '#10b981',
    [ROLES.LGU_OFFICER]: '#f59e0b',
    [ROLES.NATIONAL_AGENCY]: '#3b82f6',
    [ROLES.APP_ADMIN]: '#ef4444'
}

// Permission groups
export const PERMISSIONS = {
    // Public permissions
    VIEW_HOME: 'view_home',
    SUBMIT_REPORT: 'submit_report',
    VIEW_PUBLIC_UPDATES: 'view_public_updates',
    
    // Staff permissions
    VIEW_ALL_REPORTS: 'view_all_reports',
    EDIT_REPORTS: 'edit_reports',
    CHANGE_REPORT_STATUS: 'change_report_status',
    VERIFY_REPORTS: 'verify_reports',
    VIEW_ANALYTICS: 'view_analytics',
    
    // Admin permissions
    MANAGE_USERS: 'manage_users',
    SYSTEM_CONFIG: 'system_config',
    DELETE_REPORTS: 'delete_reports'
}

// Role-based permissions mapping
export const ROLE_PERMISSIONS = {
    [ROLES.GUEST]: [
        PERMISSIONS.VIEW_HOME,
        PERMISSIONS.SUBMIT_REPORT,
        PERMISSIONS.VIEW_PUBLIC_UPDATES
    ],
    [ROLES.CITIZEN]: [
        PERMISSIONS.VIEW_HOME,
        PERMISSIONS.SUBMIT_REPORT,
        PERMISSIONS.VIEW_PUBLIC_UPDATES
    ],
    [ROLES.LGU_OFFICER]: [
        PERMISSIONS.VIEW_HOME,
        PERMISSIONS.SUBMIT_REPORT,
        PERMISSIONS.VIEW_PUBLIC_UPDATES,
        PERMISSIONS.VIEW_ALL_REPORTS,
        PERMISSIONS.EDIT_REPORTS,
        PERMISSIONS.CHANGE_REPORT_STATUS,
        PERMISSIONS.VERIFY_REPORTS,
        PERMISSIONS.VIEW_ANALYTICS
    ],
    [ROLES.NATIONAL_AGENCY]: [
        PERMISSIONS.VIEW_HOME,
        PERMISSIONS.SUBMIT_REPORT,
        PERMISSIONS.VIEW_PUBLIC_UPDATES,
        PERMISSIONS.VIEW_ALL_REPORTS,
        PERMISSIONS.EDIT_REPORTS,
        PERMISSIONS.CHANGE_REPORT_STATUS,
        PERMISSIONS.VERIFY_REPORTS,
        PERMISSIONS.VIEW_ANALYTICS
    ],
    [ROLES.APP_ADMIN]: [
        ...Object.values(PERMISSIONS)
    ]
}

// Utility functions
export const hasPermission = (userRole, permission) => {
    const rolePermissions = ROLE_PERMISSIONS[userRole] || []
    return rolePermissions.includes(permission)
}

export const isStaffRole = (role) => {
    return [ROLES.LGU_OFFICER, ROLES.NATIONAL_AGENCY, ROLES.APP_ADMIN].includes(role)
}

export const isPublicRole = (role) => {
    return [ROLES.GUEST, ROLES.CITIZEN].includes(role)
}

export const canAccessPage = (userRole, page) => {
    const pagePermissions = {
        'home': PERMISSIONS.VIEW_HOME,
        'submit': PERMISSIONS.SUBMIT_REPORT,
        'public-updates': PERMISSIONS.VIEW_PUBLIC_UPDATES,
        'reports': PERMISSIONS.VIEW_ALL_REPORTS,
        'analytics': PERMISSIONS.VIEW_ANALYTICS
    }
    
    const requiredPermission = pagePermissions[page]
    return requiredPermission ? hasPermission(userRole, requiredPermission) : false
}

export const getAvailablePages = (userRole) => {
    const pages = []
    
    if (hasPermission(userRole, PERMISSIONS.VIEW_HOME)) {
        pages.push({ id: 'home', label: 'Home' })
    }
    
    if (hasPermission(userRole, PERMISSIONS.SUBMIT_REPORT)) {
        pages.push({ id: 'submit', label: 'Submit Report' })
    }
    
    if (hasPermission(userRole, PERMISSIONS.VIEW_PUBLIC_UPDATES)) {
        pages.push({ id: 'public-updates', label: 'Public Updates' })
    }
    
    if (hasPermission(userRole, PERMISSIONS.VIEW_ALL_REPORTS)) {
        pages.push({ id: 'reports', label: 'View Reports' })
    }
    
    if (hasPermission(userRole, PERMISSIONS.VIEW_ANALYTICS)) {
        pages.push({ id: 'analytics', label: 'Analytics' })
    }
    
    return pages
}

export const getSubmitRoleOptions = (userRole) => {
    // Public users can only submit as citizen
    if (isPublicRole(userRole)) {
        return [{ value: 'citizen', label: 'Citizen' }]
    }
    
    // Staff can submit in different capacities
    return [
        { value: 'citizen', label: 'Citizen' },
        { value: 'lgu_officer', label: 'LGU Officer' },
        { value: 'national_agency', label: 'National Agency' }
    ]
}