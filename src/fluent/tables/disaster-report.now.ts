import '@servicenow/sdk/global'
import {
    Table,
    StringColumn,
    IntegerColumn,
    DateTimeColumn,
    ChoiceColumn,
} from '@servicenow/sdk/core'

// Create the main disaster damage and needs reporting table
export const x_2002275_unifie_0_disaster_report = Table({
    name: 'x_2002275_unifie_0_disaster_report',
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

        reporter_type: ChoiceColumn({
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
            label: 'Reporter Type',
            default: 'citizen',
        }),

        reporter_contact: StringColumn({
            label: 'Reporter Contact',
            maxLength: 100,
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

        barangay: StringColumn({
            label: 'Barangay',
            maxLength: 100,
            mandatory: false, // Made optional
        }),

        latitude: StringColumn({
            label: 'Latitude',
            maxLength: 38,
            mandatory: false,
        }),

        longitude: StringColumn({
            label: 'Longitude',
            maxLength: 38,
            mandatory: false,
        }),

        // Incident information
        damage_type: ChoiceColumn({
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
                storm: {
                    label: 'Storm',
                    sequence: 1,
                },
                fire: {
                    label: 'Fire',
                    sequence: 4,
                },
                infrastructure_damage: {
                    label: 'Infrastructure Damage',
                    sequence: 5,
                },
                other: {
                    label: 'Other',
                    sequence: 6,
                },
            },
            dropdown: 'dropdown_without_none',
            label: 'Damage Type',
        }),

        incident_date: DateTimeColumn({
            label: 'Incident Date',
            mandatory: false, // Made optional to avoid validation issues
        }),

        priority_level: ChoiceColumn({
            choices: {
                low: {
                    label: 'Low',
                    sequence: 0,
                },
                medium: {
                    label: 'Medium',
                    sequence: 1,
                },
                high: {
                    label: 'High',
                    sequence: 2,
                },
                critical: {
                    label: 'Critical',
                    sequence: 3,
                },
            },
            dropdown: 'dropdown_without_none',
            label: 'Priority Level',
            default: 'medium', // Provide default
        }),

        // Impact assessment
        affected_individuals: IntegerColumn({
            label: 'Affected Individuals',
            maxLength: 255,
            default: 0, // Provide default
        }),

        affected_households: IntegerColumn({
            label: 'Affected Households',
            maxLength: 255,
            default: 0, // Provide default
        }),

        estimated_damage_cost: StringColumn({
            label: 'Estimated Damage Cost (PHP)',
            maxLength: 40,
            mandatory: false,
        }),

        immediate_needs: StringColumn({
            label: 'Immediate Needs',
            maxLength: 4000,
            mandatory: false, // Made optional
        }),

        damage_description: StringColumn({
            label: 'Damage Description',
            maxLength: 4000,
            mandatory: false, // Made optional
        }),

        location_description: StringColumn({
            label: 'Location Description',
            maxLength: 4000,
            mandatory: false, // Made optional
        }),

        has_multimedia: ChoiceColumn({
            label: 'Has Multimedia',
            choices: {
                false: { label: 'False', sequence: 0 },
                true: { label: 'True', sequence: 1 },
            },
            dropdown: 'dropdown_without_none',
            default: 'false',
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
                pending: { label: 'Pending Verification', sequence: 0 },
                verified: { label: 'Verified', sequence: 1 },
                rejected: { label: 'Rejected', sequence: 2 },
                resolved: { label: 'Resolved', sequence: 3 },
            },
            dropdown: 'dropdown_without_none',
            default: 'pending',
        }),

        ai_summary: StringColumn({
            label: 'AI Summary',
            maxLength: 1000,
            mandatory: false,
        }),

        ai_suggested_damage_type: StringColumn({
            label: 'AI Suggested Damage Type',
            maxLength: 100,
            mandatory: false,
        }),

        ai_urgency_level: ChoiceColumn({
            label: 'AI Urgency Level',
            choices: {
                low: { label: 'Low', sequence: 0 },
                medium: { label: 'Medium', sequence: 1 },
                high: { label: 'High', sequence: 2 },
                critical: { label: 'Critical', sequence: 3 },
            },
            dropdown: 'dropdown_without_none',
            mandatory: false,
        }),

        ai_key_needs: StringColumn({
            label: 'AI Key Needs',
            maxLength: 1000,
            mandatory: false,
        }),

        ai_priority_prediction: ChoiceColumn({
            label: 'AI Priority Prediction',
            choices: {
                low: { label: 'Low', sequence: 0 },
                medium: { label: 'Medium', sequence: 1 },
                high: { label: 'High', sequence: 2 },
                critical: { label: 'Critical', sequence: 3 },
            },
            dropdown: 'dropdown_without_none',
            mandatory: false,
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
        numberOfDigits: 6,
    },

    // Enable all operations
    actions: ['read', 'update', 'create', 'delete'],
    allowClientScripts: true,
    allowNewFields: true,
    allowUiActions: true,
})
