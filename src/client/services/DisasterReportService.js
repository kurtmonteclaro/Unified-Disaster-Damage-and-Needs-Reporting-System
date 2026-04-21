export class DisasterReportService {
    constructor() {
        this.tableName = 'x_2002275_unified_disaster_report'
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

        return {
            // Reporter information
            reporter_name: formData.reporter_name || '',
            reporter_role: formData.reporter_role || 'citizen',
            contact_number: formData.contact_number || '',
            
            // Incident details
            disaster_type: formData.disaster_type || '',
            incident_date: formData.incident_date || new Date().toISOString().split('T')[0],
            severity: formData.severity || 'medium',
            status: statusMapping[formData.status] || formData.status || 'new',
            description: formData.description || 'No description provided',
            
            // Location (map to table fields)
            region: regionMapping[formData.region] || formData.region || '',
            province: formData.province || '',
            municipality: formData.city || '',
            city_municipality: formData.city || '',
            
            // Required fields with defaults
            damage_description: formData.description || 'Damage assessment pending',
            location_description: `${formData.city || ''}, ${formData.province || ''}, ${formData.region || ''}`.replace(/^,\s*|,\s*$/g, ''),
            damage_severity: 'moderate', // Default severity
            
            // Impact data
            people_affected: parseInt(formData.people_affected) || 0,
            houses_damaged: parseInt(formData.houses_damaged) || 0,
            
            // Set default values for verification workflow
            verification_status: 'submitted',
            u_verification_status: 'submitted',
            u_damage_description: formData.description || 'Damage assessment pending',
            response_status: 'no_response',
            has_multimedia: false
        }
    }

    // Return all disaster reports
    async list() {
        try {
            const searchParams = new URLSearchParams()
            searchParams.set('sysparm_display_value', 'all')
            searchParams.set('sysparm_fields', 'sys_id,number,reporter_name,reporter_role,disaster_type,severity,status,region,province,municipality,city_municipality,people_affected,houses_damaged,incident_date,description,contact_number')
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
            console.log('Disaster reports loaded:', result?.length || 0)
            return result || []
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