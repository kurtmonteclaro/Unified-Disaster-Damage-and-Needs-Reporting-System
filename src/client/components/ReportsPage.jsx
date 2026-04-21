import React, { useState, useEffect } from 'react'
import { DisasterReportService } from '../services/DisasterReportService.js'
import { ROLES } from '../utils/roleSystem.js'

export default function ReportsPage({ userRole = ROLES.CITIZEN }) {
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
    const canApproveReports = userRole === ROLES.LGU_OFFICER || userRole === ROLES.APP_ADMIN

    useEffect(() => {
        loadReports()
    }, [userRole])

    useEffect(() => {
        applyFilters()
    }, [reports, filters])

    const getChoiceKey = (field) => {
        const raw = typeof field === 'object'
            ? (field.value ?? field.display_value ?? '')
            : field

        return String(raw || '').trim().toLowerCase().replace(/\s+/g, '_')
    }

    const getDisplayText = (field) => {
        if (typeof field === 'object') {
            return field.display_value || field.value || ''
        }

        return field || ''
    }

    const loadReports = async () => {
        try {
            setLoading(true)
            setError('')
            const currentUserName = getCurrentSessionUserName()
            const shouldRestrictToOwnReports = userRole === ROLES.CITIZEN

            if (shouldRestrictToOwnReports && !currentUserName) {
                setReports([])
                setError('Unable to identify your account in this session. Please refresh and try again.')
                return
            }

            const data = await service.list({
                createdBy: shouldRestrictToOwnReports ? currentUserName : '',
            })
            setReports(data)
        } catch (err) {
            console.error('Error loading reports:', err)
            setError('Failed to load reports. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const getCurrentSessionUserName = () => {
        const nowUser = window.NOW?.user || {}
        const gUser = window.g_user || {}

        const candidates = [
            nowUser.user_name,
            nowUser.userName,
            nowUser.name,
            typeof gUser.getUserName === 'function' ? gUser.getUserName() : '',
            gUser.user_name,
            gUser.userName,
            gUser.name,
        ]

        const match = candidates.find((candidate) => typeof candidate === 'string' && candidate.trim())
        return (match || '').trim()
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
                return getChoiceKey(report.severity) === filters.severity
            })
        }

        if (filters.status) {
            filtered = filtered.filter(report => {
                return getChoiceKey(report.status) === filters.status
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

    const handleVerificationAction = async (report, verificationStatus) => {
        try {
            await service.setVerificationStatus(report.sys_id, verificationStatus)
            await loadReports()
        } catch (err) {
            console.error('Error updating verification status:', err)
            setError(`Failed to ${verificationStatus === 'verified' ? 'approve' : 'reject'} report. Please try again.`)
        }
    }

    const getSeverityBadge = (severity) => {
        const sev = getChoiceKey(severity)

        switch (sev) {
            case 'minimal':
                return <span className="badge badge-success">Minimal</span>
            case 'moderate':
                return <span className="badge badge-warning">Moderate</span>
            case 'severe':
                return <span className="badge badge-danger">Severe</span>
            case 'catastrophic':
                return <span className="badge" style={{ backgroundColor: '#8B0000', color: 'white' }}>Catastrophic</span>
            default:
                return <span className="badge badge-primary">{getDisplayText(severity) || 'Unknown'}</span>
        }
    }

    const getStatusBadge = (status) => {
        const stat = getChoiceKey(status)

        switch (stat) {
            case 'pending':
                return <span className="badge badge-primary">Pending Verification</span>
            case 'verified':
                return <span className="badge badge-success">Verified</span>
            case 'rejected':
                return <span className="badge badge-danger">Rejected</span>
            case 'resolved':
                return <span className="badge badge-success">Resolved</span>
            default:
                return <span className="badge badge-primary">{getDisplayText(status) || 'Unknown'}</span>
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
                        <option value="minimal">Minimal</option>
                        <option value="moderate">Moderate</option>
                        <option value="severe">Severe</option>
                        <option value="catastrophic">Catastrophic</option>
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
                        <option value="pending">Pending Verification</option>
                        <option value="verified">Verified</option>
                        <option value="rejected">Rejected</option>
                        <option value="resolved">Resolved</option>
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
                                const sev = getChoiceKey(r.severity)
                                return sev === 'severe' || sev === 'catastrophic'
                            }).length}
                        </div>
                        <h3 className="feature-title">Severe Severity</h3>
                        <p className="feature-description">Severe and catastrophic incidents</p>
                    </div>
                </div>

                <div className="card">
                    <div className="card-content text-center">
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--warning-yellow)', marginBottom: '0.5rem' }}>
                            {filteredReports.filter(r => {
                                return getChoiceKey(r.status) === 'verified'
                            }).length}
                        </div>
                        <h3 className="feature-title">Verified Reports</h3>
                        <p className="feature-description">Under investigation</p>
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
                            <th>Priority</th>
                            <th>Status</th>
                            <th>AI Summary</th>
                            <th>People Affected</th>
                            <th>Houses Damaged</th>
                            {canApproveReports && <th>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReports.length === 0 ? (
                            <tr>
                                <td colSpan={canApproveReports ? 11 : 10} className="text-center" style={{ padding: '2rem', color: 'var(--text-secondary)' }}>
                                    {reports.length === 0 
                                        ? 'No reports found. Submit the first report to get started.' 
                                        : 'No reports match the current filters.'}
                                </td>
                            </tr>
                        ) : (
                            filteredReports.map((report) => {
                                const reportNumber = typeof report.number === 'object' 
                                    ? report.number.display_value || report.number.value
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

                                const priorityLevel = getDisplayText(report.priority_level)
                                const aiSummary = getDisplayText(report.ai_summary)

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
                                        <td>
                                            <span className="badge badge-primary">{priorityLevel || 'N/A'}</span>
                                        </td>
                                        <td>{getStatusBadge(report.status)}</td>
                                        <td style={{ maxWidth: '280px' }}>
                                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                                {aiSummary || 'N/A'}
                                            </span>
                                        </td>
                                        <td>{formatNumber(report.people_affected)}</td>
                                        <td>{formatNumber(report.houses_damaged)}</td>
                                        {canApproveReports && (
                                            <td style={{ whiteSpace: 'nowrap' }}>
                                                {getChoiceKey(report.status) === 'pending' ? (
                                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                        <button
                                                            className="btn btn-success btn-sm"
                                                            onClick={() => handleVerificationAction(report, 'verified')}
                                                        >
                                                            Verified
                                                        </button>
                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => handleVerificationAction(report, 'rejected')}
                                                        >
                                                            Rejected
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Finalized</span>
                                                )}
                                            </td>
                                        )}
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
                            Refresh Reports
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}