import '@servicenow/sdk/global'
import {
    Table,
    StringColumn,
    IntegerColumn,
    DateTimeColumn,
    ChoiceColumn,
} from '@servicenow/sdk/core'

// Create the main disaster damage and needs reporting table
export const x_2002275_unified_disaster_report = Table({
    name: 'x_2002275_unified_disaster_report',
    label: 'Disaster Report',
    schema: {
        // Report identification and tracking - auto-generated
        number: StringColumn({
            label: 'Report Number',
            maxLength: 40,
            readOnly: true,
        }),

        // Reporter information
        reporter_name: StringColumn({
            label: 'Reporter Name',
            maxLength: 100,
            mandatory: true,
        }),

        reporter_role: ChoiceColumn({
            choices: {
                citizen: {
                    label: 'Citizen',
                    sequence: 0,
                },
                lgu_officer: {
                    label: 'LGU Officer',
                    sequence: 1,
                },
                national_agency: {
                    label: 'National Agency',
                    sequence: 2,
                },
            },
            dropdown: 'dropdown_without_none',
            label: 'Reporter Role',
        }),

        contact_number: StringColumn({
            label: 'Contact Number',
            maxLength: 50,
        }),

        // Location information - made optional to avoid validation issues
        region: ChoiceColumn({
            label: 'Region',
            maxLength: 40,
            mandatory: false,
            choices: {
                region_4b: {
                    label: 'Region IV-B (MIMAROPA)',
                    sequence: 5,
                },
                region_12: {
                    label: 'Region XII (SOCCSKSARGEN)',
                    sequence: 13,
                },
                region_3: {
                    label: 'Region III (Central Luzon)',
                    sequence: 3,
                },
                region_10: {
                    label: 'Region X (Northern Mindanao)',
                    sequence: 11,
                },
                region_1: {
                    label: 'Region I (Ilocos Region)',
                    sequence: 1,
                },
                region_8: {
                    label: 'Region VIII (Eastern Visayas)',
                    sequence: 9,
                },
                region_6: {
                    label: 'Region VI (Western Visayas)',
                    sequence: 7,
                },
                barmm: {
                    label: 'BARMM (Bangsamoro Autonomous Region)',
                    sequence: 15,
                },
                ncr_national_capital_region: {
                    label: 'NCR (National Capital Region)',
                    sequence: 0,
                },
                car: {
                    label: 'CAR (Cordillera Administrative Region)',
                    sequence: 16,
                },
                region_7: {
                    label: 'Region VII (Central Visayas)',
                    sequence: 8,
                },
                region_5: {
                    label: 'Region V (Bicol Region)',
                    sequence: 6,
                },
                region_13: {
                    label: 'Region XIII (Caraga)',
                    sequence: 14,
                },
                region_4a: {
                    label: 'Region IV-A (CALABARZON)',
                    sequence: 4,
                },
                region_11: {
                    label: 'Region XI (Davao Region)',
                    sequence: 12,
                },
                region_2: {
                    label: 'Region II (Cagayan Valley)',
                    sequence: 2,
                },
                region_9: {
                    label: 'Region IX (Zamboanga Peninsula)',
                    sequence: 10,
                },
            },
            dropdown: 'dropdown_with_none',
        }),

        province: StringColumn({
            label: 'Province',
            maxLength: 100,
            mandatory: false, // Made optional
        }),

        municipality: StringColumn({
            label: 'Municipality/City',
            maxLength: 100,
            mandatory: false, // Made optional
        }),

        city_municipality: StringColumn({
            label: 'City / Municipality',
            maxLength: 100,
            mandatory: false, // Made optional
        }),

        // Incident information
        disaster_type: ChoiceColumn({
            choices: {
                earthquake: {
                    label: 'Earthquake',
                    sequence: 2,
                },
                flood: {
                    label: 'Flood',
                    sequence: 0,
                },
                landslide: {
                    label: 'Landslide',
                    sequence: 3,
                },
                typhoon: {
                    label: 'Typhoon',
                    sequence: 1,
                },
                fire: {
                    label: 'Fire',
                    sequence: 4,
                },
                volcanic_eruption: {
                    label: 'Volcanic Eruption',
                    sequence: 5,
                },
                storm_surge: {
                    label: 'Storm Surge',
                    sequence: 6,
                },
                tornado: {
                    label: 'Tornado',
                    sequence: 7,
                },
                drought: {
                    label: 'Drought',
                    sequence: 8,
                },
                other: {
                    label: 'Other',
                    sequence: 9,
                },
            },
            dropdown: 'dropdown_without_none',
            label: 'Disaster Type',
        }),

        incident_date: DateTimeColumn({
            label: 'Incident Date',
            mandatory: false, // Made optional to avoid validation issues
        }),

        severity: ChoiceColumn({
            choices: {
                high: {
                    label: 'High',
                    sequence: 2,
                },
                low: {
                    label: 'Low',
                    sequence: 0,
                },
                medium: {
                    label: 'Medium',
                    sequence: 1,
                },
            },
            dropdown: 'dropdown_without_none',
            label: 'Severity',
            default: 'medium', // Provide default
        }),

        status: ChoiceColumn({
            choices: {
                new: {
                    label: 'New',
                    sequence: 0,
                },
                in_progress: {
                    label: 'In Progress',
                    sequence: 1,
                },
                resolved: {
                    label: 'Resolved',
                    sequence: 2,
                },
                closed: {
                    label: 'Closed',
                    sequence: 3,
                },
            },
            dropdown: 'dropdown_without_none',
            label: 'Status',
            default: 'new',
        }),

        // Impact assessment
        people_affected: IntegerColumn({
            label: 'People Affected',
            maxLength: 255,
            default: 0, // Provide default
        }),

        houses_damaged: IntegerColumn({
            label: 'Houses Damaged',
            maxLength: 255,
            default: 0, // Provide default
        }),

        // Description and details
        description: StringColumn({
            label: 'Description',
            maxLength: 4000,
            mandatory: false, // Made optional
        }),

        // Auto-populated fields with defaults
        damage_description: StringColumn({
            label: 'Damage Description',
            maxLength: 4000,
            mandatory: false, // Made optional
            default: 'Disaster report submitted via web portal',
        }),

        location_description: StringColumn({
            label: 'Location Description',
            maxLength: 255,
            mandatory: false, // Made optional
            default: 'Location details provided in report',
        }),

        damage_severity: ChoiceColumn({
            label: 'Damage Severity',
            choices: {
                minimal: { label: 'Minimal', sequence: 0 },
                moderate: { label: 'Moderate', sequence: 1 },
                severe: { label: 'Severe', sequence: 2 },
                catastrophic: { label: 'Catastrophic', sequence: 3 },
            },
            dropdown: 'dropdown_without_none',
            mandatory: false, // Made optional
            default: 'moderate',
        }),

        // Verification workflow
        verification_status: ChoiceColumn({
            label: 'Verification Status',
            choices: {
                submitted: { label: 'Submitted', sequence: 0 },
                processing: { label: 'Processing', sequence: 1 },
                prioritized: { label: 'Prioritized', sequence: 2 },
                completed: { label: 'Completed', sequence: 3 },
                flagged_spam: { label: 'Flagged as Spam', sequence: 4 },
            },
            dropdown: 'dropdown_without_none',
            default: 'submitted',
        }),

        // Timestamps
        reported_at: DateTimeColumn({
            label: 'Reported At',
            mandatory: false, // Made optional
            default: 'javascript:new GlideDateTime().getDisplayValue();',
        }),
    },

    // Critical settings for API access and cross-scope permissions
    display: 'number',
    webServiceAccessible: true,
    allowWebServiceAccess: true,
    audit: false,
    textIndex: false,
    extensible: true,
    isExtendable: false,
    
    // Enable cross-scope access for public reporting
    accessibleFrom: 'public',     // Allow public access
    callerAccess: 'tracking',     // Enable caller access tracking
    
    // Auto-numbering configuration
    autoNumber: {
        prefix: 'DR',
        number: 1000,
        numberOfDigits: 7,
    },

    // Enable all operations
    actions: ['read', 'update', 'create', 'delete'],
    allowClientScripts: true,
    allowNewFields: true,
    allowUiActions: true,
})