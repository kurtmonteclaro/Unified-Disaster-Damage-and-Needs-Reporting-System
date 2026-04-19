import React, { useState, useEffect } from 'react'
import { DisasterReportService } from '../services/DisasterReportService.js'

export default function ReportsPage() {
    const [reports, setReports] = useState([])
    const [filteredReports, setFilteredReports] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [filters, setFilters] = useState({
        region: '',
        severity: '',
        status: '',
        disaster_type: ''
    })

    const service = new DisasterReportService()

    useEffect(() => {
        loadReports()
    }, [])

    useEffect(() => {
        applyFilters()
    }, [reports, filters])

    const loadReports = async () => {
        try {
            setLoading(true)
            setError('')
            const data = await service.list()
            setReports(data)
        } catch (err) {
            console.error('Error loading reports:', err)
            setError('Failed to load reports. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const applyFilters = () => {
        let filtered = reports

        if (filters.region) {
            filtered = filtered.filter(report => {
                const region = typeof report.region === 'object' ? report.region.display_value : report.region
                return region && region.toLowerCase().includes(filters.region.toLowerCase())
            })
        }

        if (filters.severity) {
            filtered = filtered.filter(report => {
                const severity = typeof report.severity === 'object' ? report.severity.display_value : report.severity
                return severity === filters.severity
            })
        }

        if (filters.status) {
            filtered = filtered.filter(report => {
                const status = typeof report.status === 'object' ? report.status.display_value : report.status
                // Handle both display names and internal values
                return status === filters.status || 
                       (filters.status === 'new' && status === 'New') ||
                       (filters.status === 'in_progress' && (status === 'In Progress' || status === 'in_progress')) ||
                       (filters.status === 'resolved' && status === 'Resolved')
            })
        }

        if (filters.disaster_type) {
            filtered = filtered.filter(report => {
                const disasterType = typeof report.disaster_type === 'object' ? report.disaster_type.display_value : report.disaster_type
                return disasterType && disasterType.toLowerCase().includes(filters.disaster_type.toLowerCase())
            })
        }

        setFilteredReports(filtered)
    }

    const handleFilterChange = (e) => {
        const { name, value } = e.target
        setFilters(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const clearFilters = () => {
        setFilters({
            region: '',
            severity: '',
            status: '',
            disaster_type: ''
        })
    }

    const getSeverityBadge = (severity) => {
        const sev = typeof severity === 'object' ? severity.display_value : severity
        
        switch (sev) {
            case 'low':
            case 'Low':
                return <span className="badge badge-success">Low</span>
            case 'medium':
            case 'Medium':
                return <span className="badge badge-warning">Medium</span>
            case 'high':
            case 'High':
                return <span className="badge badge-danger">High</span>
            default:
                return <span className="badge badge-primary">{sev || 'Unknown'}</span>
        }
    }

    const getStatusBadge = (status) => {
        const stat = typeof status === 'object' ? status.display_value : status
        
        switch (stat) {
            case 'new':
            case 'New':
                return <span className="badge badge-primary">New</span>
            case 'in_progress':
            case 'In Progress':
                return <span className="badge badge-warning">In Progress</span>
            case 'resolved':
            case 'Resolved':
                return <span className="badge badge-success">Resolved</span>
            case 'closed':
            case 'Closed':
                return <span className="badge badge-success">Closed</span>
            default:
                return <span className="badge badge-primary">{stat || 'Unknown'}</span>
        }
    }

    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A'
        const date = new Date(dateStr)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const formatNumber = (num) => {
        const number = typeof num === 'object' ? num.display_value : num
        return number ? Number(number).toLocaleString() : '0'
    }

    if (loading) {
        return (
            <div className="reports-page fade-in">
                <div className="loading">
                    <div className="spinner"></div>
                    Loading reports...
                </div>
            </div>
        )
    }

    return (
        <div className="reports-page fade-in">
            <div className="page-header" style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                    Disaster Reports Monitor
                </h1>
                <p style={{ color: 'var(--text-secondary)' }}>
                    View and filter disaster reports from all regions. Total reports: {reports.length}
                </p>
            </div>

            {error && (
                <div className="error-message">
                    <span>{error}</span>
                    <button onClick={() => setError('')}>×</button>
                </div>
            )}

            {/* Filters */}
            <div className="filters">
                <div className="filter-group">
                    <label className="form-label">Region</label>
                    <input
                        type="text"
                        name="region"
                        className="form-input"
                        value={filters.region}
                        onChange={handleFilterChange}
                        placeholder="Search by region..."
                    />
                </div>

                <div className="filter-group">
                    <label className="form-label">Severity</label>
                    <select
                        name="severity"
                        className="form-select"
                        value={filters.severity}
                        onChange={handleFilterChange}
                    >
                        <option value="">All Severities</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label className="form-label">Status</label>
                    <select
                        name="status"
                        className="form-select"
                        value={filters.status}
                        onChange={handleFilterChange}
                    >
                        <option value="">All Statuses</option>
                        <option value="new">New</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label className="form-label">Disaster Type</label>
                    <input
                        type="text"
                        name="disaster_type"
                        className="form-input"
                        value={filters.disaster_type}
                        onChange={handleFilterChange}
                        placeholder="Search disaster type..."
                    />
                </div>

                <div className="filter-group" style={{ display: 'flex', alignItems: 'end' }}>
                    <button
                        className="btn btn-secondary"
                        onClick={clearFilters}
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-4" style={{ marginBottom: '2rem' }}>
                <div className="card">
                    <div className="card-content text-center">
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-blue)', marginBottom: '0.5rem' }}>
                            {filteredReports.length}
                        </div>
                        <h3 className="feature-title">Total Reports</h3>
                        <p className="feature-description">Currently showing</p>
                    </div>
                </div>

                <div className="card">
                    <div className="card-content text-center">
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--danger-red)', marginBottom: '0.5rem' }}>
                            {filteredReports.filter(r => {
                                const sev = typeof r.severity === 'object' ? r.severity.display_value : r.severity
                                return sev === 'high' || sev === 'High'
                            }).length}
                        </div>
                        <h3 className="feature-title">High Severity</h3>
                        <p className="feature-description">Critical incidents</p>
                    </div>
                </div>

                <div className="card">
                    <div className="card-content text-center">
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--warning-yellow)', marginBottom: '0.5rem' }}>
                            {filteredReports.filter(r => {
                                const stat = typeof r.status === 'object' ? r.status.display_value : r.status
                                return stat === 'in_progress' || stat === 'In Progress'
                            }).length}
                        </div>
                        <h3 className="feature-title">In Progress</h3>
                        <p className="feature-description">Active incidents</p>
                    </div>
                </div>

                <div className="card">
                    <div className="card-content text-center">
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success-green)', marginBottom: '0.5rem' }}>
                            {filteredReports.reduce((sum, report) => {
                                const affected = typeof report.people_affected === 'object' 
                                    ? parseFloat(report.people_affected.display_value) || 0
                                    : parseFloat(report.people_affected) || 0
                                return sum + affected
                            }, 0).toLocaleString()}
                        </div>
                        <h3 className="feature-title">People Affected</h3>
                        <p className="feature-description">Total count</p>
                    </div>
                </div>
            </div>

            {/* Reports Table */}
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Report #</th>
                            <th>Disaster Type</th>
                            <th>Location</th>
                            <th>Date</th>
                            <th>Severity</th>
                            <th>Status</th>
                            <th>People Affected</th>
                            <th>Houses Damaged</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReports.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center" style={{ padding: '2rem', color: 'var(--text-secondary)' }}>
                                    {reports.length === 0 
                                        ? 'No reports found. Submit the first report to get started.' 
                                        : 'No reports match the current filters.'}
                                </td>
                            </tr>
                        ) : (
                            filteredReports.map((report) => {
                                const reportNumber = typeof report.number === 'object' 
                                    ? report.number.display_value 
                                    : report.number

                                const disasterType = typeof report.disaster_type === 'object' 
                                    ? report.disaster_type.display_value 
                                    : report.disaster_type

                                const region = typeof report.region === 'object' 
                                    ? report.region.display_value 
                                    : report.region

                                // Try both municipality and city_municipality fields
                                const city = typeof report.municipality === 'object' 
                                    ? report.municipality.display_value 
                                    : report.municipality || 
                                      (typeof report.city_municipality === 'object' 
                                        ? report.city_municipality.display_value 
                                        : report.city_municipality)

                                const incidentDate = typeof report.incident_date === 'object' 
                                    ? report.incident_date.display_value 
                                    : report.incident_date

                                const sysId = typeof report.sys_id === 'object' 
                                    ? report.sys_id.value 
                                    : report.sys_id

                                return (
                                    <tr key={sysId}>
                                        <td style={{ fontWeight: '500', color: 'var(--accent-blue)' }}>
                                            {reportNumber || 'N/A'}
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <span>
                                                    {disasterType ? 
                                                        disasterType.charAt(0).toUpperCase() + disasterType.slice(1).replace(/_/g, ' ')
                                                        : 'N/A'}
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <div style={{ fontWeight: '500' }}>{city || 'N/A'}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                                    {region || 'N/A'}
                                                </div>
                                            </div>
                                        </td>
                                        <td>{formatDate(incidentDate)}</td>
                                        <td>{getSeverityBadge(report.severity)}</td>
                                        <td>{getStatusBadge(report.status)}</td>
                                        <td>{formatNumber(report.people_affected)}</td>
                                        <td>{formatNumber(report.houses_damaged)}</td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Refresh Button */}
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <button
                    className="btn btn-primary"
                    onClick={loadReports}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <div className="spinner"></div>
                            Refreshing...
                        </>
                    ) : (
                        <>
                            🔄 Refresh Reports
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}