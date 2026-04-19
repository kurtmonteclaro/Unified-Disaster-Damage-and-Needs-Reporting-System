import React, { useState, useEffect } from 'react'
import { DisasterReportService } from '../services/DisasterReportService.js'

export default function AnalyticsPage() {
    const [reports, setReports] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [analytics, setAnalytics] = useState({
        totalReports: 0,
        byDisasterType: {},
        bySeverity: {},
        byStatus: {},
        byRegion: {},
        totalPeopleAffected: 0,
        totalHousesDamaged: 0,
        totalEstimatedCost: 0
    })

    const service = new DisasterReportService()

    useEffect(() => {
        loadAnalyticsData()
    }, [])

    const loadAnalyticsData = async () => {
        try {
            setLoading(true)
            setError('')
            const data = await service.list()
            setReports(data)
            calculateAnalytics(data)
        } catch (err) {
            console.error('Error loading analytics:', err)
            setError('Failed to load analytics data. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const calculateAnalytics = (reportsData) => {
        const analytics = {
            totalReports: reportsData.length,
            byDisasterType: {},
            bySeverity: {},
            byStatus: {},
            byRegion: {},
            totalPeopleAffected: 0,
            totalHousesDamaged: 0,
            totalEstimatedCost: 0
        }

        reportsData.forEach(report => {
            // Disaster Type
            const disasterType = typeof report.disaster_type === 'object' 
                ? report.disaster_type.display_value 
                : report.disaster_type
            if (disasterType) {
                analytics.byDisasterType[disasterType] = (analytics.byDisasterType[disasterType] || 0) + 1
            }

            // Severity
            const severity = typeof report.severity === 'object' 
                ? report.severity.display_value 
                : report.severity
            if (severity) {
                analytics.bySeverity[severity] = (analytics.bySeverity[severity] || 0) + 1
            }

            // Status
            const status = typeof report.status === 'object' 
                ? report.status.display_value 
                : report.status
            if (status) {
                analytics.byStatus[status] = (analytics.byStatus[status] || 0) + 1
            }

            // Region
            const region = typeof report.region === 'object' 
                ? report.region.display_value 
                : report.region
            if (region) {
                analytics.byRegion[region] = (analytics.byRegion[region] || 0) + 1
            }

            // Numerical totals
            const peopleAffected = parseFloat(
                typeof report.people_affected === 'object' 
                    ? report.people_affected.display_value 
                    : report.people_affected
            ) || 0
            analytics.totalPeopleAffected += peopleAffected

            const housesDamaged = parseFloat(
                typeof report.houses_damaged === 'object' 
                    ? report.houses_damaged.display_value 
                    : report.houses_damaged
            ) || 0
            analytics.totalHousesDamaged += housesDamaged

            const estimatedCost = parseFloat(
                typeof report.estimated_damage_cost === 'object' 
                    ? report.estimated_damage_cost.display_value 
                    : report.estimated_damage_cost
            ) || 0
            analytics.totalEstimatedCost += estimatedCost
        })

        setAnalytics(analytics)
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP'
        }).format(amount)
    }

    const getTopEntries = (data, limit = 5) => {
        return Object.entries(data)
            .sort(([,a], [,b]) => b - a)
            .slice(0, limit)
    }

    if (loading) {
        return (
            <div className="analytics-page fade-in">
                <div className="loading">
                    <div className="spinner"></div>
                    Loading analytics...
                </div>
            </div>
        )
    }

    return (
        <div className="analytics-page fade-in">
            <div className="page-header" style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                    Analytics Dashboard
                </h1>
                <p style={{ color: 'var(--text-secondary)' }}>
                    Comprehensive insights and statistics from disaster reports
                </p>
            </div>

            {error && (
                <div className="error-message">
                    <span>{error}</span>
                    <button onClick={() => setError('')}>×</button>
                </div>
            )}

            {/* Key Metrics */}
            <div className="grid grid-4" style={{ marginBottom: '3rem' }}>
                <div className="card">
                    <div className="card-content text-center">
                        <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--accent-blue)', marginBottom: '0.5rem' }}>
                            {analytics.totalReports.toLocaleString()}
                        </div>
                        <h3 className="feature-title">Total Reports</h3>
                        <p className="feature-description">All disaster reports</p>
                    </div>
                </div>

                <div className="card">
                    <div className="card-content text-center">
                        <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--danger-red)', marginBottom: '0.5rem' }}>
                            {analytics.totalPeopleAffected.toLocaleString()}
                        </div>
                        <h3 className="feature-title">People Affected</h3>
                        <p className="feature-description">Total affected individuals</p>
                    </div>
                </div>

                <div className="card">
                    <div className="card-content text-center">
                        <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--warning-yellow)', marginBottom: '0.5rem' }}>
                            {analytics.totalHousesDamaged.toLocaleString()}
                        </div>
                        <h3 className="feature-title">Houses Damaged</h3>
                        <p className="feature-description">Total damaged structures</p>
                    </div>
                </div>

                <div className="card">
                    <div className="card-content text-center">
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success-green)', marginBottom: '0.5rem' }}>
                            {formatCurrency(analytics.totalEstimatedCost)}
                        </div>
                        <h3 className="feature-title">Estimated Damage</h3>
                        <p className="feature-description">Total estimated cost</p>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-2" style={{ marginBottom: '3rem' }}>
                {/* Reports by Disaster Type */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Reports by Disaster Type</h3>
                        <p className="card-description">Distribution of incidents by type</p>
                    </div>
                    <div className="card-content">
                        <div className="chart-placeholder">
                            <div>
                                <div style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                                    📊 Chart Visualization
                                </div>
                                <div style={{ textAlign: 'left', maxWidth: '300px', margin: '0 auto' }}>
                                    {getTopEntries(analytics.byDisasterType).map(([type, count]) => (
                                        <div key={type} style={{ 
                                            display: 'flex', 
                                            justifyContent: 'space-between', 
                                            marginBottom: '0.5rem',
                                            padding: '0.5rem',
                                            background: 'rgba(59, 130, 246, 0.1)',
                                            borderRadius: '4px'
                                        }}>
                                            <span>{type.charAt(0).toUpperCase() + type.slice(1).replace(/_/g, ' ')}</span>
                                            <strong style={{ color: 'var(--accent-blue)' }}>{count}</strong>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reports by Severity */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Reports by Severity</h3>
                        <p className="card-description">Severity level distribution</p>
                    </div>
                    <div className="card-content">
                        <div className="chart-placeholder">
                            <div>
                                <div style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                                    📈 Chart Visualization
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'end', height: '200px' }}>
                                    {Object.entries(analytics.bySeverity).map(([severity, count]) => {
                                        const maxCount = Math.max(...Object.values(analytics.bySeverity))
                                        const height = (count / maxCount) * 150
                                        let color = 'var(--accent-blue)'
                                        
                                        switch(severity) {
                                            case 'high':
                                                color = 'var(--danger-red)'
                                                break
                                            case 'medium':
                                                color = 'var(--warning-yellow)'
                                                break
                                            case 'low':
                                                color = 'var(--success-green)'
                                                break
                                        }
                                        
                                        return (
                                            <div key={severity} style={{ textAlign: 'center' }}>
                                                <div style={{
                                                    width: '40px',
                                                    height: `${height}px`,
                                                    background: color,
                                                    marginBottom: '0.5rem',
                                                    borderRadius: '4px 4px 0 0'
                                                }}></div>
                                                <div style={{ 
                                                    fontSize: '0.75rem', 
                                                    color: 'var(--text-secondary)',
                                                    textTransform: 'capitalize'
                                                }}>
                                                    {severity}
                                                </div>
                                                <div style={{ fontWeight: 'bold', color }}>{count}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-2" style={{ marginBottom: '3rem' }}>
                {/* Reports by Status */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Reports by Status</h3>
                        <p className="card-description">Current status distribution</p>
                    </div>
                    <div className="card-content">
                        <div className="chart-placeholder">
                            <div>
                                <div style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                                    🔄 Status Overview
                                </div>
                                <div style={{ display: 'grid', gap: '1rem' }}>
                                    {Object.entries(analytics.byStatus).map(([status, count]) => {
                                        const percentage = analytics.totalReports > 0 
                                            ? ((count / analytics.totalReports) * 100).toFixed(1)
                                            : 0
                                        
                                        let color = 'var(--accent-blue)'
                                        switch(status) {
                                            case 'resolved':
                                                color = 'var(--success-green)'
                                                break
                                            case 'ongoing':
                                                color = 'var(--warning-yellow)'
                                                break
                                            case 'reported':
                                                color = 'var(--accent-blue)'
                                                break
                                        }
                                        
                                        return (
                                            <div key={status} style={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                gap: '1rem',
                                                padding: '1rem',
                                                background: 'rgba(255, 255, 255, 0.02)',
                                                borderRadius: '8px'
                                            }}>
                                                <div style={{
                                                    width: '12px',
                                                    height: '12px',
                                                    background: color,
                                                    borderRadius: '50%'
                                                }}></div>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontWeight: '500', textTransform: 'capitalize' }}>
                                                        {status}
                                                    </div>
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                                        {percentage}% of total
                                                    </div>
                                                </div>
                                                <div style={{ fontWeight: 'bold', color }}>{count}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reports by Region */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Reports by Region</h3>
                        <p className="card-description">Geographic distribution</p>
                    </div>
                    <div className="card-content">
                        <div className="chart-placeholder">
                            <div>
                                <div style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                                    🗺️ Regional Distribution
                                </div>
                                <div style={{ textAlign: 'left', maxWidth: '300px', margin: '0 auto', maxHeight: '200px', overflowY: 'auto' }}>
                                    {getTopEntries(analytics.byRegion, 8).map(([region, count]) => {
                                        const percentage = analytics.totalReports > 0 
                                            ? ((count / analytics.totalReports) * 100).toFixed(1)
                                            : 0
                                        
                                        return (
                                            <div key={region} style={{ 
                                                display: 'flex', 
                                                justifyContent: 'space-between', 
                                                alignItems: 'center',
                                                marginBottom: '0.5rem',
                                                padding: '0.5rem',
                                                background: 'rgba(59, 130, 246, 0.05)',
                                                borderRadius: '4px'
                                            }}>
                                                <div>
                                                    <div style={{ fontWeight: '500' }}>{region}</div>
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                                        {percentage}%
                                                    </div>
                                                </div>
                                                <strong style={{ color: 'var(--accent-blue)' }}>{count}</strong>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Trends */}
            <div className="card" style={{ marginBottom: '2rem' }}>
                <div className="card-header">
                    <h3 className="card-title">Recent Trends</h3>
                    <p className="card-description">Key insights from the data</p>
                </div>
                <div className="card-content">
                    <div className="grid grid-3">
                        <div className="text-center">
                            <div style={{ 
                                fontSize: '1.5rem', 
                                fontWeight: 'bold', 
                                color: 'var(--accent-blue)', 
                                marginBottom: '0.5rem' 
                            }}>
                                {analytics.bySeverity.high || 0}
                            </div>
                            <div style={{ fontWeight: '500' }}>High Severity Incidents</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                Requiring immediate attention
                            </div>
                        </div>
                        
                        <div className="text-center">
                            <div style={{ 
                                fontSize: '1.5rem', 
                                fontWeight: 'bold', 
                                color: 'var(--warning-yellow)', 
                                marginBottom: '0.5rem' 
                            }}>
                                {((analytics.byStatus.ongoing || 0) / Math.max(analytics.totalReports, 1) * 100).toFixed(0)}%
                            </div>
                            <div style={{ fontWeight: '500' }}>Active Response Rate</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                Ongoing incident management
                            </div>
                        </div>
                        
                        <div className="text-center">
                            <div style={{ 
                                fontSize: '1.5rem', 
                                fontWeight: 'bold', 
                                color: 'var(--success-green)', 
                                marginBottom: '0.5rem' 
                            }}>
                                {((analytics.byStatus.resolved || 0) / Math.max(analytics.totalReports, 1) * 100).toFixed(0)}%
                            </div>
                            <div style={{ fontWeight: '500' }}>Resolution Rate</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                Successfully resolved cases
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Refresh Button */}
            <div style={{ textAlign: 'center' }}>
                <button
                    className="btn btn-primary"
                    onClick={loadAnalyticsData}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <div className="spinner"></div>
                            Refreshing...
                        </>
                    ) : (
                        <>
                            🔄 Refresh Analytics
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}