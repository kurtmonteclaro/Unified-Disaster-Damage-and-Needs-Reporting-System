import React, { useState } from 'react'
import { DisasterReportService } from '../../services/DisasterReportService'
import './DisasterReportList.css'

/**
 * Reusable Disaster Report List Component
 * Displays disaster reports with filtering, sorting, and actions
 * 
 * Props:
 * - reports: Array of disaster reports
 * - onEdit: Function called when edit is clicked
 * - onView: Function called when view is clicked
 * - onVerify: Function called when verify is clicked (for LGU officers)
 * - onRefresh: Function called to refresh the list
 * - loading: Whether the list is loading
 * - config: Configuration object for component behavior
 * - userRole: Current user's role for permission checking
 */
export default function DisasterReportList({ 
    reports = [], 
    onEdit, 
    onView, 
    onVerify, 
    onRefresh, 
    loading = false,
    config = {},
    userRole = 'citizen' 
}) {
    const defaultConfig = {
        showActions: true,
        showFilters: true,
        showPagination: true,
        itemsPerPage: 10,
        allowEdit: false,
        allowVerify: userRole === 'lgu_officer' || userRole === 'app_admin' || userRole === 'admin',
        showLocationDetails: true,
        showStatusBadges: true,
        ...config
    }

    const [filters, setFilters] = useState({
        status: '',
        priority: '',
        damageType: '',
        search: ''
    })
    
    const [sortBy, setSortBy] = useState('reported_at')
    const [sortOrder, setSortOrder] = useState('desc')
    const [currentPage, setCurrentPage] = useState(1)

    // Filter and sort reports
    const filteredReports = reports.filter(report => {
        const matchesStatus = !filters.status || report.verification_status === filters.status
        const matchesPriority = !filters.priority || report.priority_level === filters.priority
        const matchesDamageType = !filters.damageType || report.disaster_type === filters.damageType
        const matchesSearch = !filters.search || 
            (report.reporter_name || '').toLowerCase().includes(filters.search.toLowerCase()) ||
            (report.location_description || '').toLowerCase().includes(filters.search.toLowerCase()) ||
            (report.damage_description || '').toLowerCase().includes(filters.search.toLowerCase())
        
        return matchesStatus && matchesPriority && matchesDamageType && matchesSearch
    }).sort((a, b) => {
        let aValue = a[sortBy]
        let bValue = b[sortBy]
        
        if (sortBy === 'reported_at') {
            aValue = new Date(aValue)
            bValue = new Date(bValue)
        }
        
        if (sortOrder === 'asc') {
            return aValue > bValue ? 1 : -1
        } else {
            return aValue < bValue ? 1 : -1
        }
    })

    // Pagination
    const totalPages = Math.ceil(filteredReports.length / defaultConfig.itemsPerPage)
    const startIndex = (currentPage - 1) * defaultConfig.itemsPerPage
    const paginatedReports = defaultConfig.showPagination 
        ? filteredReports.slice(startIndex, startIndex + defaultConfig.itemsPerPage)
        : filteredReports

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({ ...prev, [filterName]: value }))
        setCurrentPage(1) // Reset to first page when filtering
    }

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(field)
            setSortOrder('desc')
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return '-'
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getStatusBadgeClass = (status) => {
        const classes = {
            pending: 'status-pending',
            verified: 'status-verified',
            rejected: 'status-rejected',
            resolved: 'status-resolved'
        }
        return classes[status] || 'status-default'
    }

    const getPriorityBadgeClass = (priority) => {
        const classes = {
            critical: 'priority-critical',
            high: 'priority-high',
            medium: 'priority-medium',
            low: 'priority-low'
        }
        return classes[priority] || 'priority-default'
    }

    if (loading) {
        return (
            <div className="disaster-report-list">
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <span>Loading disaster reports...</span>
                </div>
            </div>
        )
    }

    return (
        <div className="disaster-report-list">
            {/* Filters */}
            {defaultConfig.showFilters && (
                <div className="report-filters">
                    <div className="filter-row">
                        <div className="filter-group">
                            <input
                                type="text"
                                placeholder="Search reports..."
                                value={filters.search}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                                className="search-input"
                            />
                        </div>
                        
                        <div className="filter-group">
                            <select
                                value={filters.status}
                                onChange={(e) => handleFilterChange('status', e.target.value)}
                                className="filter-select"
                            >
                                <option value="">All Statuses</option>
                                <option value="pending">Pending</option>
                                <option value="verified">Verified</option>
                                <option value="rejected">Rejected</option>
                                <option value="resolved">Resolved</option>
                            </select>
                        </div>
                        
                        <div className="filter-group">
                            <select
                                value={filters.priority}
                                onChange={(e) => handleFilterChange('priority', e.target.value)}
                                className="filter-select"
                            >
                                <option value="">All Priorities</option>
                                <option value="critical">Critical</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                        </div>
                        
                        <div className="filter-group">
                            <select
                                value={filters.damageType}
                                onChange={(e) => handleFilterChange('damageType', e.target.value)}
                                className="filter-select"
                            >
                                <option value="">All Damage Types</option>
                                <option value="flood">Flood</option>
                                <option value="fire">Fire</option>
                                <option value="earthquake">Earthquake</option>
                                <option value="landslide">Landslide</option>
                                <option value="typhoon">Typhoon</option>
                                <option value="volcanic_eruption">Volcanic Eruption</option>
                                <option value="storm_surge">Storm Surge</option>
                                <option value="tornado">Tornado</option>
                                <option value="drought">Drought</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        
                        {onRefresh && (
                            <div className="filter-group">
                                <button onClick={onRefresh} className="refresh-button">
                                    ↻ Refresh
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Results Summary */}
            <div className="results-summary">
                <span>Showing {paginatedReports.length} of {filteredReports.length} reports</span>
            </div>

            {/* Reports List */}
            <div className="reports-container">
                {paginatedReports.length === 0 ? (
                    <div className="empty-state">
                        <h3>No disaster reports found</h3>
                        <p>No reports match your current filters.</p>
                    </div>
                ) : (
                    <div className="reports-grid">
                        {paginatedReports.map(report => (
                            <div key={report.sys_id} className="report-card">
                                <div className="report-header">
                                    <div className="report-number">
                                        {typeof report.number === 'object'
                                            ? report.number.display_value || report.number.value || report.sys_id
                                            : report.number || report.sys_id}
                                    </div>
                                    <div className="report-badges">
                                        {defaultConfig.showStatusBadges && (
                                            <>
                                                <span className={`status-badge ${getStatusBadgeClass(report.verification_status)}`}>
                                                    {report.verification_status}
                                                </span>
                                                {report.priority_level && (
                                                    <span className={`priority-badge ${getPriorityBadgeClass(report.priority_level)}`}>
                                                        {report.priority_level}
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="report-content">
                                    <div className="report-title">
                                        <strong>{report.disaster_type?.replace('_', ' ').toUpperCase()}</strong>
                                        <span className="severity-indicator">
                                            {report.damage_severity} severity
                                        </span>
                                    </div>

                                    <div className="report-description">
                                        {(report.damage_description || '').length > 120 
                                            ? (report.damage_description || '').substring(0, 120) + '...'
                                            : (report.damage_description || '-')
                                        }
                                    </div>

                                    {defaultConfig.showLocationDetails && (
                                        <div className="report-location">
                                            <span className="location-icon">📍</span>
                                            {DisasterReportService.formatLocation(report)}
                                        </div>
                                    )}

                                    <div className="report-meta">
                                        <div className="reporter-info">
                                            <strong>Reporter:</strong> {report.reporter_name}
                                            <span className="reporter-type">({report.reporter_role?.replace('_', ' ')})</span>
                                        </div>
                                        
                                        <div className="report-date">
                                            <strong>Reported:</strong> {formatDate(report.reported_at)}
                                        </div>

                                        {(report.houses_damaged > 0 || report.people_affected > 0) && (
                                            <div className="affected-info">
                                                <strong>Affected:</strong>
                                                {report.houses_damaged > 0 && ` ${report.houses_damaged} households`}
                                                {report.people_affected > 0 && ` ${report.people_affected} individuals`}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {defaultConfig.showActions && (
                                    <div className="report-actions">
                                        {onView && (
                                            <button 
                                                onClick={() => onView(report)} 
                                                className="action-button view-button"
                                            >
                                                View Details
                                            </button>
                                        )}
                                        
                                        {onEdit && defaultConfig.allowEdit && (
                                            <button 
                                                onClick={() => onEdit(report)} 
                                                className="action-button edit-button"
                                            >
                                                Edit
                                            </button>
                                        )}
                                        
                                        {onVerify && defaultConfig.allowVerify && report.verification_status === 'pending' && (
                                            <button 
                                                onClick={() => onVerify(report)} 
                                                className="action-button verify-button"
                                            >
                                                Verify
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Pagination */}
            {defaultConfig.showPagination && totalPages > 1 && (
                <div className="pagination">
                    <button 
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="pagination-button"
                    >
                        Previous
                    </button>
                    
                    <span className="pagination-info">
                        Page {currentPage} of {totalPages}
                    </span>
                    
                    <button 
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="pagination-button"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    )
}