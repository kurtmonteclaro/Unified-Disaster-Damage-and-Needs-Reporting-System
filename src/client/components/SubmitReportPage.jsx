import React, { useState } from 'react'
import { DisasterReportService } from '../services/DisasterReportService.js'
import { ROLES } from '../utils/roleSystem.js'

const getReporterRoleFromUserRole = (userRole) => {
    if (userRole === ROLES.LGU_OFFICER) return 'lgu_officer'
    if (userRole === ROLES.NATIONAL_AGENCY) return 'national_agency'
    if (userRole === ROLES.APP_ADMIN) return 'app_admin'
    return 'citizen'
}

export default function SubmitReportPage({ userRole = ROLES.CITIZEN, onSuccess }) {
    const defaultReporterRole = getReporterRoleFromUserRole(userRole)
    const [formData, setFormData] = useState({
        reporter_name: '',
        reporter_role: defaultReporterRole,
        contact_number: '',
        disaster_type: '',
        incident_date: '',
        damage_severity: 'moderate',
        status: 'reported',
        region: '',
        province: '',
        city: '',
        barangay: '',
        has_multimedia: false,
        people_affected: 0,
        houses_damaged: 0,
        immediate_needs: '',
        description: '',
        estimated_damage_cost: 0
    })
    const [selectedFiles, setSelectedFiles] = useState([])
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const service = new DisasterReportService()

    const regions = [
        'NCR', 'CAR', 'Region I', 'Region II', 'Region III', 'Region IV-A', 
        'Region IV-B', 'Region V', 'Region VI', 'Region VII', 'Region VIII',
        'Region IX', 'Region X', 'Region XI', 'Region XII', 'CARAGA', 'BARMM'
    ]

    const disasterTypes = [
        'Typhoon', 'Flood', 'Earthquake', 'Landslide', 'Fire', 'Drought',
        'Volcanic Eruption', 'Storm Surge', 'Tornado', 'Other'
    ]

    const handleInputChange = (e) => {
        const { name, value, type } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) || 0 : value
        }))
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files || [])
        setSelectedFiles(files)
        setFormData(prev => ({
            ...prev,
            has_multimedia: files.length > 0
        }))

        if (errors.multimedia) {
            setErrors(prev => ({
                ...prev,
                multimedia: ''
            }))
        }
    }

    const validateForm = () => {
        const newErrors = {}
        
        if (!formData.reporter_name.trim()) {
            newErrors.reporter_name = 'Reporter name is required'
        }
        
        if (!formData.contact_number.trim()) {
            newErrors.contact_number = 'Contact number is required'
        }
        
        if (!formData.disaster_type) {
            newErrors.disaster_type = 'Disaster type is required'
        }
        
        if (!formData.incident_date) {
            newErrors.incident_date = 'Incident date is required'
        }
        
        if (!formData.region) {
            newErrors.region = 'Region is required'
        }
        
        if (!formData.province.trim()) {
            newErrors.province = 'Province is required'
        }
        
        if (!formData.city.trim()) {
            newErrors.city = 'City/Municipality is required'
        }

        if (!formData.barangay.trim()) {
            newErrors.barangay = 'Barangay is required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!validateForm()) {
            return
        }

        setLoading(true)
        
        try {
            await service.create(formData, selectedFiles)
            
            // Reset form
            setFormData({
                reporter_name: '',
                reporter_role: defaultReporterRole,
                contact_number: '',
                disaster_type: '',
                incident_date: '',
                damage_severity: 'moderate',
                status: 'reported',
                region: '',
                province: '',
                city: '',
                barangay: '',
                has_multimedia: false,
                people_affected: 0,
                houses_damaged: 0,
                immediate_needs: '',
                description: '',
                estimated_damage_cost: 0
            })
            setSelectedFiles([])
            
            onSuccess('Disaster report submitted successfully! Report will be reviewed by local authorities.')
            
        } catch (error) {
            console.error('Error submitting report:', error)
            setErrors({ submit: 'Failed to submit report. Please try again.' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="submit-report-page fade-in">
            <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div className="card-header">
                    <h1 className="card-title">Submit Disaster Report</h1>
                    <p className="card-description">
                        Provide accurate information about the disaster incident. All fields marked with * are required.
                    </p>
                </div>
                
                <div className="card-content">
                    {errors.submit && (
                        <div className="error-message">
                            <span>{errors.submit}</span>
                            <button onClick={() => setErrors(prev => ({ ...prev, submit: '' }))}>×</button>
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit}>
                        {/* Reporter Information */}
                        <div className="form-section">
                            <h3 style={{ marginBottom: '1rem', color: 'var(--accent-blue)' }}>Reporter Information</h3>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="reporter_name">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="reporter_name"
                                        name="reporter_name"
                                        className="form-input"
                                        value={formData.reporter_name}
                                        onChange={handleInputChange}
                                        placeholder="Enter your full name"
                                        required
                                    />
                                    {errors.reporter_name && (
                                        <div style={{ color: 'var(--danger-red)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                            {errors.reporter_name}
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label" htmlFor="contact_number">
                                    Contact Number *
                                </label>
                                <input
                                    type="tel"
                                    id="contact_number"
                                    name="contact_number"
                                    className="form-input"
                                    value={formData.contact_number}
                                    onChange={handleInputChange}
                                    placeholder="e.g. +63 912 345 6789"
                                    required
                                />
                                {errors.contact_number && (
                                    <div style={{ color: 'var(--danger-red)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                        {errors.contact_number}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Incident Details */}
                        <div className="form-section" style={{ marginTop: '2rem' }}>
                            <h3 style={{ marginBottom: '1rem', color: 'var(--accent-blue)' }}>Incident Details</h3>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="disaster_type">
                                        Disaster Type *
                                    </label>
                                    <select
                                        id="disaster_type"
                                        name="disaster_type"
                                        className="form-select"
                                        value={formData.disaster_type}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select disaster type</option>
                                        {disasterTypes.map(type => (
                                            <option key={type} value={type.toLowerCase().replace(/ /g, '_')}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.disaster_type && (
                                        <div style={{ color: 'var(--danger-red)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                            {errors.disaster_type}
                                        </div>
                                    )}
                                </div>
                                
                                <div className="form-group">
                                    <label className="form-label" htmlFor="incident_date">
                                        Incident Date *
                                    </label>
                                    <input
                                        type="date"
                                        id="incident_date"
                                        name="incident_date"
                                        className="form-input"
                                        value={formData.incident_date}
                                        onChange={handleInputChange}
                                        max={new Date().toISOString().split('T')[0]}
                                        required
                                    />
                                    {errors.incident_date && (
                                        <div style={{ color: 'var(--danger-red)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                            {errors.incident_date}
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="damage_severity">
                                        Severity Level
                                    </label>
                                    <select
                                        id="damage_severity"
                                        name="damage_severity"
                                        className="form-select"
                                        value={formData.damage_severity}
                                        onChange={handleInputChange}
                                    >
                                        <option value="minimal">Minimal - Limited damage</option>
                                        <option value="moderate">Moderate - Noticeable damage</option>
                                        <option value="severe">Severe - Major damage</option>
                                        <option value="catastrophic">Catastrophic - Extreme damage</option>
                                    </select>
                                </div>
                                
                                <div className="form-group">
                                    <label className="form-label" htmlFor="status">
                                        Status
                                    </label>
                                    <select
                                        id="status"
                                        name="status"
                                        className="form-select"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                    >
                                        <option value="reported">Reported</option>
                                        <option value="ongoing">Ongoing</option>
                                        <option value="resolved">Resolved</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Location Information */}
                        <div className="form-section" style={{ marginTop: '2rem' }}>
                            <h3 style={{ marginBottom: '1rem', color: 'var(--accent-blue)' }}>Location</h3>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="region">
                                        Region *
                                    </label>
                                    <select
                                        id="region"
                                        name="region"
                                        className="form-select"
                                        value={formData.region}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select region</option>
                                        {regions.map(region => (
                                            <option key={region} value={region}>
                                                {region}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.region && (
                                        <div style={{ color: 'var(--danger-red)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                            {errors.region}
                                        </div>
                                    )}
                                </div>
                                
                                <div className="form-group">
                                    <label className="form-label" htmlFor="province">
                                        Province *
                                    </label>
                                    <input
                                        type="text"
                                        id="province"
                                        name="province"
                                        className="form-input"
                                        value={formData.province}
                                        onChange={handleInputChange}
                                        placeholder="Enter province name"
                                        required
                                    />
                                    {errors.province && (
                                        <div style={{ color: 'var(--danger-red)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                            {errors.province}
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label" htmlFor="city">
                                    City/Municipality *
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    className="form-input"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    placeholder="Enter city or municipality name"
                                    required
                                />
                                {errors.city && (
                                    <div style={{ color: 'var(--danger-red)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                        {errors.city}
                                    </div>
                                )}
                            </div>

                            <div className="form-group" style={{ marginTop: '1rem' }}>
                                <label className="form-label" htmlFor="barangay">
                                    Barangay *
                                </label>
                                <input
                                    type="text"
                                    id="barangay"
                                    name="barangay"
                                    className="form-input"
                                    value={formData.barangay}
                                    onChange={handleInputChange}
                                    placeholder="Enter barangay"
                                    required
                                />
                                {errors.barangay && (
                                    <div style={{ color: 'var(--danger-red)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                        {errors.barangay}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Impact Assessment */}
                        <div className="form-section" style={{ marginTop: '2rem' }}>
                            <h3 style={{ marginBottom: '1rem', color: 'var(--accent-blue)' }}>Impact Assessment</h3>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="people_affected">
                                        People Affected
                                    </label>
                                    <input
                                        type="number"
                                        id="people_affected"
                                        name="people_affected"
                                        className="form-input"
                                        value={formData.people_affected}
                                        onChange={handleInputChange}
                                        min="0"
                                        placeholder="Number of people affected"
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label className="form-label" htmlFor="houses_damaged">
                                        Houses Damaged
                                    </label>
                                    <input
                                        type="number"
                                        id="houses_damaged"
                                        name="houses_damaged"
                                        className="form-input"
                                        value={formData.houses_damaged}
                                        onChange={handleInputChange}
                                        min="0"
                                        placeholder="Number of houses damaged"
                                    />
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label" htmlFor="estimated_damage_cost">
                                    Estimated Damage Cost (PHP)
                                </label>
                                <input
                                    type="number"
                                    id="estimated_damage_cost"
                                    name="estimated_damage_cost"
                                    className="form-input"
                                    value={formData.estimated_damage_cost}
                                    onChange={handleInputChange}
                                    min="0"
                                    step="0.01"
                                    placeholder="Estimated cost of damages"
                                />
                            </div>

                            <div className="form-group" style={{ marginTop: '1rem' }}>
                                <label className="form-label" htmlFor="immediate_needs">
                                    Immediate Needs
                                </label>
                                <textarea
                                    id="immediate_needs"
                                    name="immediate_needs"
                                    className="form-textarea"
                                    value={formData.immediate_needs}
                                    onChange={handleInputChange}
                                    rows="3"
                                    placeholder="List urgent needs (e.g., food packs, clean water, medicines, temporary shelter)"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="form-section" style={{ marginTop: '2rem' }}>
                            <h3 style={{ marginBottom: '1rem', color: 'var(--accent-blue)' }}>Additional Details</h3>
                            
                            <div className="form-group">
                                <label className="form-label" htmlFor="description">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    className="form-textarea"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="4"
                                    placeholder="Provide additional details about the incident, damage assessment, immediate needs, etc."
                                />
                            </div>

                            <div className="form-group" style={{ marginTop: '1rem' }}>
                                <label className="form-label" htmlFor="multimedia_files">
                                    Upload Images / Videos
                                </label>
                                <input
                                    id="multimedia_files"
                                    type="file"
                                    className="form-input"
                                    accept="image/*,video/*"
                                    multiple
                                    onChange={handleFileChange}
                                />
                                <small style={{ display: 'block', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                                    Optional. You can upload one or more images or videos with the report.
                                </small>
                                {selectedFiles.length > 0 && (
                                    <div style={{ marginTop: '0.75rem', fontSize: '0.9rem' }}>
                                        <strong>Selected files:</strong>
                                        <ul style={{ marginTop: '0.35rem' }}>
                                            {selectedFiles.map(file => (
                                                <li key={file.name}>{file.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
                            <button
                                type="submit"
                                className="btn btn-success btn-lg"
                                disabled={loading}
                                style={{ width: '100%' }}
                            >
                                {loading ? (
                                    <>
                                        <div className="spinner"></div>
                                        Submitting Report...
                                    </>
                                ) : (
                                    <>
                                        Submit Disaster Report
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}