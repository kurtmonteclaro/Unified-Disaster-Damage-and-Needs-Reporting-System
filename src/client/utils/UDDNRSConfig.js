/**
 * UDDNRS Configuration Utility
 * Provides configurable settings for the disaster reporting system
 * Makes the components reusable across different regions and organizations
 */

export class UDDNRSConfig {
    static defaultConfig = {
        // System Settings
        systemName: 'UDDNRS - Unified Disaster Damage and Needs Reporting System',
        organizationName: 'Government of the Philippines',
        
        // Geographic Settings
        defaultRegion: 'Region IV-A (CALABARZON)',
        country: 'Philippines',
        coordinateBounds: {
            minLat: 4.5,
            maxLat: 21.5,
            minLng: 116,
            maxLng: 127
        },
        
        // Form Configuration
        form: {
            enableGeoLocation: true,
            requireGeoLocation: false,
            enableMultimedia: true,
            autoDetectLocation: true,
            maxFileSize: 10, // MB
            allowedFileTypes: ['image/*', 'video/*'],
            maxDescriptionLength: 4000,
            maxImmediateNeedsLength: 2000
        },
        
        // List Configuration
        list: {
            itemsPerPage: 10,
            showFilters: true,
            showPagination: true,
            showLocationDetails: true,
            showStatusBadges: true,
            enableSearch: true
        },
        
        // User Roles and Permissions
        roles: {
            citizen: {
                canSubmit: true,
                canEdit: false,
                canVerify: false,
                canViewAll: false
            },
            lguOfficer: {
                canSubmit: true,
                canEdit: true,
                canVerify: true,
                canViewAll: true,
                canViewByLocation: true
            },
            nationalAgency: {
                canSubmit: true,
                canEdit: false,
                canVerify: false,
                canViewAll: true,
                canViewAnalytics: true
            },
            admin: {
                canSubmit: true,
                canEdit: true,
                canVerify: true,
                canViewAll: true,
                canViewAnalytics: true,
                canDelete: true,
                canManageSystem: true
            }
        },
        
        // Notification Settings
        notifications: {
            enabled: true,
            criticalReportAlert: true,
            verificationReminders: true,
            responseUpdates: true
        },
        
        // API Settings
        api: {
            baseUrl: '/api/now/table/x_2002275_unified_disaster_report',
            rateLimit: 100, // requests per hour
            timeout: 30000 // milliseconds
        },
        
        // UI Theme
        theme: {
            primaryColor: '#dc3545',
            secondaryColor: '#6c757d',
            successColor: '#28a745',
            warningColor: '#ffc107',
            dangerColor: '#dc3545',
            infoColor: '#17a2b8'
        }
    }

    static locationHierarchy = {
        'Philippines': {
            'Region IV-A (CALABARZON)': {
                'Laguna': ['Los Baños', 'Calamba', 'Santa Rosa', 'Biñan', 'San Pedro'],
                'Cavite': ['Bacoor', 'Dasmariñas', 'Imus', 'General Trias', 'Carmona'],
                'Batangas': ['Batangas City', 'Lipa', 'Tanauan', 'Santo Tomas', 'Calaca'],
                'Rizal': ['Antipolo', 'Cainta', 'Taytay', 'Marikina', 'San Mateo'],
                'Quezon': ['Lucena', 'Tayabas', 'Sariaya', 'Candelaria', 'Tiaong']
            },
            'National Capital Region (NCR)': {
                'Metro Manila': ['Manila', 'Quezon City', 'Makati', 'Taguig', 'Pasig', 'Marikina', 'Mandaluyong', 'San Juan', 'Pasay', 'Parañaque', 'Las Piñas', 'Muntinlupa', 'Malabon', 'Navotas', 'Valenzuela', 'Caloocan', 'Pateros']
            }
            // Add more regions as needed
        }
    }

    static damageTypes = [
        {
            value: 'structural',
            label: 'Structural Damage',
            description: 'Damage to buildings, houses, and other structures',
            icon: '🏘️'
        },
        {
            value: 'infrastructure',
            label: 'Infrastructure Damage',
            description: 'Damage to roads, bridges, utilities, and public infrastructure',
            icon: '🛣️'
        },
        {
            value: 'agricultural',
            label: 'Agricultural Damage',
            description: 'Damage to crops, livestock, and farming infrastructure',
            icon: '🌾'
        },
        {
            value: 'environmental',
            label: 'Environmental Damage',
            description: 'Environmental degradation, pollution, and ecosystem damage',
            icon: '🌿'
        },
        {
            value: 'livelihood',
            label: 'Livelihood Impact',
            description: 'Impact on businesses, jobs, and economic activities',
            icon: '💼'
        },
        {
            value: 'casualties',
            label: 'Casualties',
            description: 'Injuries, deaths, and medical emergencies',
            icon: '🏥'
        },
        {
            value: 'displacement',
            label: 'Population Displacement',
            description: 'Evacuation, temporary shelter needs, and displacement',
            icon: '🏕️'
        }
    ]

    static severityLevels = [
        {
            value: 'minimal',
            label: 'Minimal',
            description: 'Minor damage with minimal impact',
            color: '#28a745',
            priority: 'low'
        },
        {
            value: 'moderate',
            label: 'Moderate',
            description: 'Moderate damage requiring attention',
            color: '#ffc107',
            priority: 'medium'
        },
        {
            value: 'severe',
            label: 'Severe',
            description: 'Severe damage requiring urgent response',
            color: '#fd7e14',
            priority: 'high'
        },
        {
            value: 'catastrophic',
            label: 'Catastrophic',
            description: 'Catastrophic damage requiring immediate emergency response',
            color: '#dc3545',
            priority: 'critical'
        }
    ]

    static statusTypes = [
        {
            value: 'pending',
            label: 'Pending Verification',
            description: 'Report awaiting verification by LGU',
            color: '#ffc107'
        },
        {
            value: 'verified',
            label: 'Verified',
            description: 'Report verified by LGU officer',
            color: '#28a745'
        },
        {
            value: 'rejected',
            label: 'Rejected',
            description: 'Report rejected during verification',
            color: '#dc3545'
        },
        {
            value: 'resolved',
            label: 'Resolved',
            description: 'Response completed and issue resolved',
            color: '#17a2b8'
        }
    ]

    /**
     * Get configuration for a specific component
     */
    static getComponentConfig(componentName, customConfig = {}) {
        const baseConfig = this.defaultConfig[componentName] || {}
        return { ...baseConfig, ...customConfig }
    }

    /**
     * Get user permissions based on role
     */
    static getUserPermissions(userRole) {
        return this.defaultConfig.roles[userRole] || this.defaultConfig.roles.citizen
    }

    /**
     * Get location options for a specific level
     */
    static getLocationOptions(country = 'Philippines', region = null, province = null) {
        const locations = this.locationHierarchy[country] || {}
        
        if (!region) {
            return Object.keys(locations)
        }
        
        if (!province) {
            return Object.keys(locations[region] || {})
        }
        
        return locations[region]?.[province] || []
    }

    /**
     * Get damage type configuration
     */
    static getDamageTypeConfig(damageType) {
        return this.damageTypes.find(type => type.value === damageType)
    }

    /**
     * Get severity level configuration
     */
    static getSeverityConfig(severity) {
        return this.severityLevels.find(level => level.value === severity)
    }

    /**
     * Get status configuration
     */
    static getStatusConfig(status) {
        return this.statusTypes.find(s => s.value === status)
    }

    /**
     * Validate coordinates within configured bounds
     */
    static validateCoordinates(lat, lng) {
        const bounds = this.defaultConfig.coordinateBounds
        return lat >= bounds.minLat && lat <= bounds.maxLat && 
               lng >= bounds.minLng && lng <= bounds.maxLng
    }

    /**
     * Format location for display
     */
    static formatLocation(report, includeCountry = false) {
        const parts = []
        
        if (report.barangay) parts.push(report.barangay)
        if (report.municipality) parts.push(report.municipality)
        if (report.province) parts.push(report.province)
        if (report.region) parts.push(report.region)
        if (includeCountry) parts.push(this.defaultConfig.country)
        
        return parts.filter(Boolean).join(', ')
    }

    /**
     * Get theme colors
     */
    static getThemeColor(colorName) {
        return this.defaultConfig.theme[colorName + 'Color'] || this.defaultConfig.theme.primaryColor
    }

    /**
     * Create a customized configuration for different organizations/regions
     */
    static createCustomConfig(overrides) {
        return {
            ...this.defaultConfig,
            ...overrides,
            form: { ...this.defaultConfig.form, ...(overrides.form || {}) },
            list: { ...this.defaultConfig.list, ...(overrides.list || {}) },
            roles: { ...this.defaultConfig.roles, ...(overrides.roles || {}) },
            notifications: { ...this.defaultConfig.notifications, ...(overrides.notifications || {}) },
            api: { ...this.defaultConfig.api, ...(overrides.api || {}) },
            theme: { ...this.defaultConfig.theme, ...(overrides.theme || {}) }
        }
    }
}