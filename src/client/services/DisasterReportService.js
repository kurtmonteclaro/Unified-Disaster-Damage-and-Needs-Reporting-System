export class DisasterReportService {
    constructor() {
        this.tableName = 'x_2002275_unified_disaster_report'
    }

    // Map form data to table field names and values
    mapFormDataToTable(formData) {
        // Map region display names to choice keys
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
            // Reporter info
            reporter_name: formData.reporter_name,
            reporter_role: formData.reporter_role,
            contact_number: formData.contact_number,
            
            // Incident info
            disaster_type: formData.disaster_type,
            incident_date: formData.incident_date,
            severity: formData.severity,
            status: statusMapping[formData.status] || formData.status,
            
            // Location - map to correct field names
            region: regionMapping[formData.region] || formData.region,
            province: formData.province,
            municipality: formData.city, // Form uses 'city' but table expects 'municipality'
            city_municipality: formData.city, // Also populate this field
            
            // Impact assessment
            people_affected: formData.people_affected || 0,
            houses_damaged: formData.houses_damaged || 0,
            
            // Description and details
            description: formData.description || '',
            
            // Required fields with defaults
            damage_description: formData.description || 'Disaster report submitted via web portal',
            location_description: `${formData.city}, ${formData.province}, ${formData.region}`,
            damage_severity: 'moderate', // Default value
            reported_at: new Date().toISOString(),
            verification_status: 'pending'
        }
    }

    // Return all disaster reports with comprehensive error handling
    async list(filters = {}) {
        try {
            const searchParams = new URLSearchParams(filters)
            searchParams.set('sysparm_display_value', 'all')
            searchParams.set('sysparm_fields', 'sys_id,number,disaster_type,incident_date,severity,status,region,province,municipality,city_municipality,people_affected,houses_damaged,reporter_name,contact_number,description,sys_created_on')
            searchParams.set('sysparm_query', 'ORDERBYDESCsys_created_on')

            const response = await fetch(`/api/now/table/${this.tableName}?${searchParams.toString()}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'X-UserToken': window.g_ck,
                },
            })

            if (!response.ok) {
                let errorMessage = `HTTP error ${response.status}`
                try {
                    const errorData = await response.json()
                    errorMessage = errorData.error?.message || errorMessage
                } catch (e) {
                    // If we can't parse the error response, use the default message
                }
                throw new Error(errorMessage)
            }

            const { result } = await response.json()
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
                    'Accept': 'application/json',
                    'X-UserToken': window.g_ck,
                },
            })

            if (!response.ok) {
                let errorMessage = `HTTP error ${response.status}`
                try {
                    const errorData = await response.json()
                    errorMessage = errorData.error?.message || errorMessage
                } catch (e) {
                    // If we can't parse the error response, use the default message
                }
                throw new Error(errorMessage)
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
            // Map form data to table fields
            const tableData = this.mapFormDataToTable(data)
            
            console.log('Sending data to ServiceNow:', tableData) // Debug log

            const response = await fetch(`/api/now/table/${this.tableName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-UserToken': window.g_ck,
                },
                body: JSON.stringify(tableData),
            })

            if (!response.ok) {
                let errorMessage = `HTTP error ${response.status}`
                try {
                    const errorData = await response.json()
                    errorMessage = errorData.error?.message || `HTTP ${response.status}: ${errorData.error?.detail || 'Unknown error'}`
                    console.error('ServiceNow error response:', errorData) // Debug log
                } catch (e) {
                    console.error('Could not parse error response:', e)
                }
                throw new Error(errorMessage)
            }

            const result = await response.json()
            console.log('ServiceNow success response:', result) // Debug log
            return result
        } catch (error) {
            console.error('Error creating disaster report:', error)
            throw error
        }
    }

    // Update a disaster report
    async update(sysId, data) {
        try {
            const tableData = this.mapFormDataToTable(data)
            
            const response = await fetch(`/api/now/table/${this.tableName}/${sysId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-UserToken': window.g_ck,
                },
                body: JSON.stringify(tableData),
            })

            if (!response.ok) {
                let errorMessage = `HTTP error ${response.status}`
                try {
                    const errorData = await response.json()
                    errorMessage = errorData.error?.message || errorMessage
                } catch (e) {
                    // If we can't parse the error response, use the default message
                }
                throw new Error(errorMessage)
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
                    'Accept': 'application/json',
                    'X-UserToken': window.g_ck,
                },
            })

            if (!response.ok) {
                let errorMessage = `HTTP error ${response.status}`
                try {
                    const errorData = await response.json()
                    errorMessage = errorData.error?.message || errorMessage
                } catch (e) {
                    // If we can't parse the error response, use the default message
                }
                throw new Error(errorMessage)
            }

            return response.ok
        } catch (error) {
            console.error(`Error deleting disaster report ${sysId}:`, error)
            throw error
        }
    }

    // Get reports summary for analytics
    async getSummary() {
        try {
            const reports = await this.list()
            
            const summary = {
                totalReports: reports.length,
                byDisasterType: {},
                bySeverity: { low: 0, medium: 0, high: 0 },
                byStatus: { new: 0, in_progress: 0, resolved: 0 },
                byRegion: {},
                totalPeopleAffected: 0,
                totalHousesDamaged: 0,
                totalEstimatedCost: 0
            }

            reports.forEach(report => {
                // Extract values properly from ServiceNow objects
                const disasterType = typeof report.disaster_type === 'object' 
                    ? report.disaster_type.display_value 
                    : report.disaster_type

                const severity = typeof report.severity === 'object' 
                    ? report.severity.display_value 
                    : report.severity

                const status = typeof report.status === 'object' 
                    ? report.status.display_value 
                    : report.status

                const region = typeof report.region === 'object' 
                    ? report.region.display_value 
                    : report.region

                // Count by disaster type
                if (disasterType) {
                    summary.byDisasterType[disasterType] = (summary.byDisasterType[disasterType] || 0) + 1
                }

                // Count by severity
                if (severity && summary.bySeverity.hasOwnProperty(severity)) {
                    summary.bySeverity[severity]++
                }

                // Count by status
                if (status) {
                    // Map ServiceNow status values back to our expected keys
                    let mappedStatus = status
                    if (status === 'New') mappedStatus = 'new'
                    if (status === 'In Progress') mappedStatus = 'in_progress'
                    if (status === 'Resolved') mappedStatus = 'resolved'
                    
                    if (summary.byStatus.hasOwnProperty(mappedStatus)) {
                        summary.byStatus[mappedStatus]++
                    }
                }

                // Count by region
                if (region) {
                    summary.byRegion[region] = (summary.byRegion[region] || 0) + 1
                }

                // Sum totals
                const peopleAffected = parseFloat(
                    typeof report.people_affected === 'object' 
                        ? report.people_affected.display_value 
                        : report.people_affected
                ) || 0
                summary.totalPeopleAffected += peopleAffected

                const housesDamaged = parseFloat(
                    typeof report.houses_damaged === 'object' 
                        ? report.houses_damaged.display_value 
                        : report.houses_damaged
                ) || 0
                summary.totalHousesDamaged += housesDamaged
            })

            return summary
        } catch (error) {
            console.error('Error generating reports summary:', error)
            throw error
        }
    }
}