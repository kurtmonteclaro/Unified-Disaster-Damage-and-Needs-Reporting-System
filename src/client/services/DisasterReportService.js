export class DisasterReportService {
    constructor() {
        this.tableName = 'x_2002275_unifie_0_disaster_report'
    }

    static formatLocation(report) {
        const parts = [
            report.barangay,
            report.municipality || report.city_municipality,
            report.province,
            report.region,
        ].filter(Boolean)

        return parts.join(', ') || report.location_description || 'Location not provided'
    }

    // Map form data to ServiceNow table schema
    mapFormDataToTable(formData) {
        // Map region display values to choice keys
        const regionMapping = {
            'NCR': 'ncr_national_capital_region',
            'CAR': 'car',
            'Region I': 'region_1',
            'Region II': 'region_2',
            'Region III': 'region_3',
            'Region IV-A': 'region_4a',
            'Region IV-B': 'region_4b',
            'Region V': 'region_5',
            'Region VI': 'region_6',
            'Region VII': 'region_7',
            'Region VIII': 'region_8',
            'Region IX': 'region_9',
            'Region X': 'region_10',
            'Region XI': 'region_11',
            'Region XII': 'region_12',
            'CARAGA': 'region_13',
            'BARMM': 'barmm'
        }

        // Map status values
        const statusMapping = {
            'reported': 'new',
            'ongoing': 'in_progress',
            'resolved': 'resolved'
        }

        const disasterTypeMapping = {
            typhoon: 'storm',
            volcanic_eruption: 'other',
            storm_surge: 'storm',
            tornado: 'storm',
            drought: 'other',
        }

        const verificationStatusMapping = {
            reported: 'pending',
            ongoing: 'verified',
            resolved: 'resolved',
            new: 'pending',
            in_progress: 'verified',
        }

        const priorityByDamageSeverity = {
            minimal: 'low',
            moderate: 'medium',
            severe: 'high',
            catastrophic: 'critical',
        }

        const incidentDate = formData.incident_date || new Date().toISOString()
        const municipality = formData.municipality || formData.city || ''
        const reporterType = formData.reporter_type || formData.reporter_role || 'citizen'
        const reporterContact = formData.reporter_contact || formData.contact_number || ''
        const rawDamageType = formData.damage_type || formData.disaster_type || ''
        const damageType = disasterTypeMapping[rawDamageType] || rawDamageType
        const damageSeverity = formData.damage_severity || 'moderate'
        const verificationStatus =
            formData.verification_status ||
            verificationStatusMapping[formData.status] ||
            'pending'
        const priorityLevel =
            formData.priority_level ||
            priorityByDamageSeverity[damageSeverity] ||
            'medium'
        const damageDescription = formData.damage_description || formData.description || 'No description provided'
        const locationDescription =
            formData.location_description ||
            [formData.barangay, municipality, formData.province, formData.region].filter(Boolean).join(', ') ||
            'Location details provided in report'

        return {
            // Reporter information
            reporter_name: formData.reporter_name || '',
            reporter_type: reporterType,
            reporter_contact: reporterContact,
            
            // Incident details
            damage_type: damageType,
            incident_date: incidentDate,
            damage_severity: damageSeverity,
            verification_status: verificationStatus,
            priority_level: priorityLevel,
            
            // Location (map to table fields)
            region: regionMapping[formData.region] || formData.region || '',
            province: formData.province || '',
            municipality,
            barangay: formData.barangay || '',
            latitude: formData.latitude === null || formData.latitude === undefined || formData.latitude === '' ? '' : String(formData.latitude),
            longitude: formData.longitude === null || formData.longitude === undefined || formData.longitude === '' ? '' : String(formData.longitude),
            
            // Required fields with defaults
            damage_description: damageDescription,
            location_description: locationDescription,
            immediate_needs: formData.immediate_needs || '',
            has_multimedia: formData.has_multimedia ? 'true' : 'false',
            
            // Impact data
            affected_individuals: parseInt(formData.affected_individuals ?? formData.people_affected) || 0,
            affected_households: parseInt(formData.affected_households ?? formData.houses_damaged) || 0,
            estimated_damage_cost: String(parseFloat(formData.estimated_damage_cost ?? 0) || 0),
        }
    }

    // Return all disaster reports
    async list() {
        try {
            const searchParams = new URLSearchParams()
            searchParams.set('sysparm_display_value', 'all')
            searchParams.set('sysparm_fields', 'sys_id,number,reporter_name,reporter_type,reporter_contact,region,province,municipality,barangay,latitude,longitude,location_description,incident_date,damage_type,damage_severity,damage_description,immediate_needs,has_multimedia,affected_individuals,affected_households,estimated_damage_cost,priority_level,verification_status,sys_created_on')
            searchParams.set('sysparm_query', 'ORDERBYDESCincident_date')

            console.log('Fetching disaster reports from:', `/api/now/table/${this.tableName}`)

            const response = await fetch(`/api/now/table/${this.tableName}?${searchParams.toString()}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'X-UserToken': window.g_ck,
                },
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                console.error('API Error:', errorData)
                throw new Error(errorData.error?.message || `HTTP error ${response.status}`)
            }

            const { result } = await response.json()
            const normalized = (result || []).map((report) => {
                const normalizedReport = { ...report }

                // Canonical table columns
                normalizedReport.reporter_type = report.reporter_type
                normalizedReport.reporter_contact = report.reporter_contact
                normalizedReport.damage_type = report.damage_type
                normalizedReport.affected_individuals = report.affected_individuals
                normalizedReport.affected_households = report.affected_households

                // Backward-compatible aliases for existing UI components
                normalizedReport.reporter_role = report.reporter_type
                normalizedReport.contact_number = report.reporter_contact
                normalizedReport.disaster_type = report.damage_type
                normalizedReport.people_affected = report.affected_individuals
                normalizedReport.houses_damaged = report.affected_households
                normalizedReport.estimated_damage_cost = report.estimated_damage_cost
                normalizedReport.city_municipality = report.municipality
                normalizedReport.description = report.damage_description
                normalizedReport.status = report.verification_status
                normalizedReport.severity = report.priority_level
                normalizedReport.reported_at = report.sys_created_on || report.incident_date

                return normalizedReport
            })

            console.log('Disaster reports loaded:', normalized.length)
            return normalized
        } catch (error) {
            console.error('Error fetching disaster reports:', error)
            throw error
        }
    }

    // Get a single disaster report by sys_id
    async get(sysId) {
        try {
            const searchParams = new URLSearchParams()
            searchParams.set('sysparm_display_value', 'all')

            const response = await fetch(`/api/now/table/${this.tableName}/${sysId}?${searchParams.toString()}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'X-UserToken': window.g_ck,
                },
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.error?.message || `HTTP error ${response.status}`)
            }

            const { result } = await response.json()
            return result
        } catch (error) {
            console.error(`Error fetching disaster report ${sysId}:`, error)
            throw error
        }
    }

    // Create a new disaster report
    async create(data) {
        try {
            const mappedData = this.mapFormDataToTable(data)
            console.log('Sending data to ServiceNow:', mappedData)

            const response = await fetch(`/api/now/table/${this.tableName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-UserToken': window.g_ck,
                },
                body: JSON.stringify(mappedData),
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                console.error('ServiceNow error response:', errorData)
                throw new Error(errorData.error?.message || 'Operation Failed')
            }

            const result = await response.json()
            console.log('Disaster report created successfully:', result)
            return result
        } catch (error) {
            console.error('Error creating disaster report:', error)
            throw error
        }
    }

    // Update a disaster report
    async update(sysId, data) {
        try {
            const mappedData = this.mapFormDataToTable(data)

            const response = await fetch(`/api/now/table/${this.tableName}/${sysId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-UserToken': window.g_ck,
                },
                body: JSON.stringify(mappedData),
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.error?.message || `HTTP error ${response.status}`)
            }

            return response.json()
        } catch (error) {
            console.error(`Error updating disaster report ${sysId}:`, error)
            throw error
        }
    }

    // Delete a disaster report
    async delete(sysId) {
        try {
            const response = await fetch(`/api/now/table/${this.tableName}/${sysId}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'X-UserToken': window.g_ck,
                },
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.error?.message || `HTTP error ${response.status}`)
            }

            return response.ok
        } catch (error) {
            console.error(`Error deleting disaster report ${sysId}:`, error)
            throw error
        }
    }
}
