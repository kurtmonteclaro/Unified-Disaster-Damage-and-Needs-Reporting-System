import React, { useState, useEffect } from 'react'
import { DisasterReportService } from '../services/DisasterReportService.js'

export default function PublicUpdatesPage() {
    const [updates, setUpdates] = useState([])
    const [stats, setStats] = useState({
        activeIncidents: 0,
        resolvedToday: 0,
        totalReports: 0,
        criticalAlerts: 0
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const service = new DisasterReportService()

    useEffect(() => {
        loadPublicData()
    }, [])

    const loadPublicData = async () => {
        try {
            setLoading(true)
            setError(null)
            
            // In a real app, this would be a separate public API endpoint
            const reports = await service.list()
            
            // Process public updates (only show resolved/public information)
            const publicUpdates = processPublicUpdates(reports)
            const publicStats = calculatePublicStats(reports)
            
            setUpdates(publicUpdates)
            setStats(publicStats)
            
        } catch (err) {
            setError('Failed to load public updates: ' + (err.message || 'Unknown error'))
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const processPublicUpdates = (reports) => {
        // Only show resolved reports or general updates for public consumption
        const publicReports = reports
            .filter(report => {
                const status = report.status?.value || report.status
                return status === 'resolved' || status === 'closed'
            })
            .slice(0, 10)
            .map(report => ({
                id: report.sys_id?.value || Math.random(),
                title: `${getDisplayValue(report.disaster_type)} in ${getDisplayValue(report.municipality || report.city_municipality)}`,
                description: 'Incident has been resolved. Recovery efforts completed.',
                location: getDisplayValue(report.region),
                date: report.incident_date?.value || report.incident_date,
                severity: report.severity?.value || report.severity,
                type: report.disaster_type?.value || report.disaster_type,
                status: 'resolved'
            }))

        // Add some public announcements
        const announcements = [
            {
                id: 'announce_1',
                title: 'Typhoon Season Preparedness Guidelines',
                description: 'The National Disaster Risk Reduction and Management Council (NDRRMC) reminds all citizens to prepare for the upcoming typhoon season. Ensure emergency kits are ready and evacuation plans are in place.',
                location: 'National',
                date: new Date().toISOString(),
                type: 'announcement',
                status: 'active'
            },
            {
                id: 'announce_2', 
                title: 'Flood Warning System Upgraded',
                description: 'New early warning systems have been installed in flood-prone areas. Citizens will now receive SMS alerts 2-4 hours before potential flooding.',
                location: 'Metro Manila',
                date: new Date(Date.now() - 86400000).toISOString(),
                type: 'announcement',
                status: 'active'
            }
        ]

        return [...announcements, ...publicReports].sort((a, b) => new Date(b.date) - new Date(a.date))
    }

    const calculatePublicStats = (reports) => {
        const activeIncidents = reports.filter(r => {
            const status = r.status?.value || r.status
            return status === 'new' || status === 'in_progress'
        }).length

        const today = new Date().toDateString()
        const resolvedToday = reports.filter(r => {
            const status = r.status?.value || r.status
            const date = new Date(r.incident_date?.value || r.incident_date).toDateString()
            return status === 'resolved' && date === today
        }).length

        const criticalAlerts = reports.filter(r => {
            const severity = r.severity?.value || r.severity
            const status = r.status?.value || r.status
            return severity === 'high' && (status === 'new' || status === 'in_progress')
        }).length

        return {
            activeIncidents,
            resolvedToday,
            totalReports: reports.length,
            criticalAlerts
        }
    }

    const getDisplayValue = (field) => {
        return field?.display_value || field?.value || field || 'Unknown'
    }

    const formatDate = (date) => {
        if (!date) return 'Unknown'
        try {
            return new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        } catch {
            return 'Invalid Date'
        }
    }

    const getStatusBadge = (status, type) => {
        if (type === 'announcement') {
            return <span className="badge badge-info">Public Notice</span>
        }
        
        if (status === 'resolved') {
            return <span className="badge badge-success">Resolved</span>
        }
        
        return <span className="badge badge-neutral">Update</span>
    }

    if (loading) {
        return (
            <div className="fade-in">
                <div className="card-header" style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
                    <h1 className="card-title">Public Updates</h1>
                    <p className="card-description">Loading latest disaster updates and announcements...</p>
                </div>
                
                <div className="stats-grid">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="card" style={{ padding: 'var(--space-lg)' }}>
                            <div className="skeleton" style={{ height: '40px', marginBottom: 'var(--space-sm)' }}></div>
                            <div className="skeleton" style={{ height: '20px', width: '60%' }}></div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="fade-in">
                <div className="alert alert-error">
                    <strong>Error:</strong> {error}
                    <button 
                        className="btn btn-secondary btn-sm"
                        onClick={loadPublicData}
                        style={{ marginLeft: 'var(--space-md)' }}
                    >
                        Retry
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="fade-in">
            <div className="card-header" style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
                <h1 className="card-title">Public Updates & Announcements</h1>
                <p className="card-description">
                    Stay informed about disaster incidents, recovery efforts, and emergency announcements
                </p>
            </div>

            {/* Public Statistics */}
            <section className="stats-grid" style={{ marginBottom: 'var(--space-xl)' }}>
                <div className="card" style={{ 
                    padding: 'var(--space-lg)',
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, transparent 100%)',
                    border: '1px solid rgba(239, 68, 68, 0.2)'
                }}>
                    <div style={{ 
                        fontSize: '2rem',
                        fontWeight: '800',
                        color: '#ef4444',
                        marginBottom: 'var(--space-xs)'
                    }}>
                        {stats.activeIncidents}
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>
                        Active Incidents
                    </div>
                </div>

                <div className="card" style={{ 
                    padding: 'var(--space-lg)',
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, transparent 100%)',
                    border: '1px solid rgba(16, 185, 129, 0.2)'
                }}>
                    <div style={{ 
                        fontSize: '2rem',
                        fontWeight: '800',
                        color: '#10b981',
                        marginBottom: 'var(--space-xs)'
                    }}>
                        {stats.resolvedToday}
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>
                        Resolved Today
                    </div>
                </div>

                <div className="card" style={{ 
                    padding: 'var(--space-lg)',
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, transparent 100%)',
                    border: '1px solid rgba(59, 130, 246, 0.2)'
                }}>
                    <div style={{ 
                        fontSize: '2rem',
                        fontWeight: '800',
                        color: '#3b82f6',
                        marginBottom: 'var(--space-xs)'
                    }}>
                        {stats.totalReports}
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>
                        Total Reports
                    </div>
                </div>

                <div className="card" style={{ 
                    padding: 'var(--space-lg)',
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, transparent 100%)',
                    border: '1px solid rgba(245, 158, 11, 0.2)'
                }}>
                    <div style={{ 
                        fontSize: '2rem',
                        fontWeight: '800',
                        color: '#f59e0b',
                        marginBottom: 'var(--space-xs)'
                    }}>
                        {stats.criticalAlerts}
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>
                        Critical Alerts
                    </div>
                </div>
            </section>

            {/* Updates Feed */}
            <section>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: 'var(--space-lg)'
                }}>
                    <h2 style={{ margin: 0 }}>Recent Updates</h2>
                    <button 
                        className="btn btn-primary btn-sm"
                        onClick={loadPublicData}
                    >
                        Refresh
                    </button>
                </div>

                {updates.length === 0 ? (
                    <div className="empty-state">
                        <h3>No Updates Available</h3>
                        <p>Check back later for disaster updates and public announcements.</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                        {updates.map(update => (
                            <div key={update.id} className="card">
                                <div className="card-content" style={{ padding: 'var(--space-lg)' }}>
                                    <div style={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        alignItems: 'flex-start',
                                        marginBottom: 'var(--space-md)'
                                    }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                gap: 'var(--space-sm)',
                                                marginBottom: 'var(--space-sm)'
                                            }}>
                                                <h3 style={{ 
                                                    margin: 0,
                                                    color: 'var(--text-primary)',
                                                    fontSize: '1.125rem'
                                                }}>
                                                    {update.title}
                                                </h3>
                                                {getStatusBadge(update.status, update.type)}
                                            </div>
                                            
                                            <p style={{ 
                                                color: 'var(--text-secondary)',
                                                lineHeight: '1.6',
                                                marginBottom: 'var(--space-sm)'
                                            }}>
                                                {update.description}
                                            </p>
                                            
                                            <div style={{ 
                                                display: 'flex',
                                                gap: 'var(--space-lg)',
                                                fontSize: '0.875rem',
                                                color: 'var(--text-muted)'
                                            }}>
                                                <span>{update.location}</span>
                                                <span>{formatDate(update.date)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Emergency Contacts */}
            <section style={{ marginTop: 'var(--space-2xl)' }}>
                <div className="card" style={{ 
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
                    border: '1px solid rgba(59, 130, 246, 0.2)'
                }}>
                    <div className="card-header">
                        <h3 className="card-title">Emergency Contacts</h3>
                        <p className="card-description">Important numbers for emergency situations</p>
                    </div>
                    <div className="card-content">
                        <div className="grid grid-cols-2">
                            <div style={{ 
                                padding: 'var(--space-md)',
                                background: 'rgba(239, 68, 68, 0.1)',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid rgba(239, 68, 68, 0.2)'
                            }}>
                                <div style={{ fontWeight: '600', marginBottom: 'var(--space-xs)' }}>
                                    Emergency Hotline
                                </div>
                                <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--danger-red)' }}>
                                    911
                                </div>
                            </div>
                            
                            <div style={{ 
                                padding: 'var(--space-md)',
                                background: 'rgba(59, 130, 246, 0.1)',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid rgba(59, 130, 246, 0.2)'
                            }}>
                                <div style={{ fontWeight: '600', marginBottom: 'var(--space-xs)' }}>
                                    NDRRMC Hotline
                                </div>
                                <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--accent-blue)' }}>
                                    (02) 8911-1406
                                </div>
                            </div>
                            
                            <div style={{ 
                                padding: 'var(--space-md)',
                                background: 'rgba(16, 185, 129, 0.1)',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid rgba(16, 185, 129, 0.2)'
                            }}>
                                <div style={{ fontWeight: '600', marginBottom: 'var(--space-xs)' }}>
                                    Red Cross Emergency
                                </div>
                                <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--success-green)' }}>
                                    143
                                </div>
                            </div>
                            
                            <div style={{ 
                                padding: 'var(--space-md)',
                                background: 'rgba(245, 158, 11, 0.1)',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid rgba(245, 158, 11, 0.2)'
                            }}>
                                <div style={{ fontWeight: '600', marginBottom: 'var(--space-xs)' }}>
                                    Citizen's Complaint
                                </div>
                                <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--warning-yellow)' }}>
                                    8888
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}