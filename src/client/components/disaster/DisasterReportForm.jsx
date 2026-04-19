import React, { useState, useEffect } from 'react'
import './DisasterReportForm.css'

/**
 * Reusable Disaster Report Form Component
 * Configurable form for submitting disaster reports with validation
 * 
 * Props:
 * - onSubmit: Function called when form is submitted
 * - onCancel: Function called when form is cancelled
 * - initialData: Initial form data for editing
 * - config: Configuration object for form behavior
 * - locations: Array of location options
 * - readOnly: Whether form should be read-only
 */
export default function DisasterReportForm({ 
    onSubmit, 
    onCancel, 
    initialData = {}, 
    config = {}, 
    locations = {},
    readOnly = false 
}) {
    const defaultConfig = {
        enableGeoLocation: true,
        requireGeoLocation: false,
        enableMultimedia: true,
        autoDetectLocation: false,
        maxFileSize: 10, // MB
        allowedFileTypes: ['image/*', 'video/*'],
        ...config
    }

    const [formData, setFormData] = useState({
        reporter_name: '',
        reporter_type: 'citizen',
        reporter_contact: '',
        location_description: '',
        region: locations.defaultRegion || '',
        province: '',
        municipality: '',
        barangay: '',
        damage_type: '',
        damage_severity: '',
        damage_description: '',
        affected_households: '',
        affected_individuals: '',
        immediate_needs: '',
        latitude: '',
        longitude: '',
        has_multimedia: false,
        ...initialData
    })

    const [errors, setErrors] = useState({})
    const [geoLocationStatus, setGeoLocationStatus] = useState('idle') // idle, loading, success, error
    const [selectedFiles, setSelectedFiles] = useState([])

    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setFormData(prev => ({ ...prev, ...initialData }))
        }
    }, [initialData])

    // Auto-detect location if enabled
    useEffect(() => {
        if (defaultConfig.autoDetectLocation && defaultConfig.enableGeoLocation && !formData.latitude) {
            getCurrentLocation()
        }
    }, [defaultConfig.autoDetectLocation])

    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            setGeoLocationStatus('error')
            return
        }

        setGeoLocationStatus('loading')
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setFormData(prev => ({
                    ...prev,
                    latitude: position.coords.latitude.toFixed(6),
                    longitude: position.coords.longitude.toFixed(6)
                }))
                setGeoLocationStatus('success')
            },
            (error) => {
                console.error('Geolocation error:', error)
                setGeoLocationStatus('error')
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000
            }
        )
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files)
        const validFiles = files.filter(file => {
            const sizeMB = file.size / (1024 * 1024)
            return sizeMB <= defaultConfig.maxFileSize
        })

        setSelectedFiles(validFiles)
        setFormData(prev => ({
            ...prev,
            has_multimedia: validFiles.length > 0
        }))
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.reporter_name.trim()) {
            newErrors.reporter_name = 'Reporter name is required'
        }

        if (!formData.reporter_contact.trim()) {
            newErrors.reporter_contact = 'Contact information is required'
        }

        if (!formData.location_description.trim()) {
            newErrors.location_description = 'Location description is required'
        }

        if (!formData.region.trim()) {
            newErrors.region = 'Region is required'
        }

        if (!formData.province.trim()) {
            newErrors.province = 'Province is required'
        }

        if (!formData.municipality.trim()) {
            newErrors.municipality = 'Municipality/City is required'
        }

        if (!formData.barangay.trim()) {
            newErrors.barangay = 'Barangay is required'
        }

        if (!formData.damage_type) {
            newErrors.damage_type = 'Damage type is required'
        }

        if (!formData.damage_severity) {
            newErrors.damage_severity = 'Damage severity is required'
        }

        if (!formData.damage_description.trim()) {
            newErrors.damage_description = 'Damage description is required'
        }

        if (defaultConfig.requireGeoLocation && (!formData.latitude || !formData.longitude)) {
            newErrors.location = 'GPS coordinates are required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (readOnly) return

        if (validateForm()) {
            const submitData = {
                ...formData,
                affected_households: parseInt(formData.affected_households) || 0,
                affected_individuals: parseInt(formData.affected_individuals) || 0,
                latitude: parseFloat(formData.latitude) || null,
                longitude: parseFloat(formData.longitude) || null
            }

            onSubmit(submitData, selectedFiles)
        }
    }

    const damageTypes = [
        { value: 'structural', label: 'Structural Damage' },
        { value: 'infrastructure', label: 'Infrastructure Damage' },
        { value: 'agricultural', label: 'Agricultural Damage' },
        { value: 'environmental', label: 'Environmental Damage' },
        { value: 'livelihood', label: 'Livelihood Impact' },
        { value: 'casualties', label: 'Casualties' },
        { value: 'displacement', label: 'Population Displacement' }
    ]

    const severityLevels = [
        { value: 'minimal', label: 'Minimal' },
        { value: 'moderate', label: 'Moderate' },
        { value: 'severe', label: 'Severe' },
        { value: 'catastrophic', label: 'Catastrophic' }
    ]

    const reporterTypes = [
        { value: 'citizen', label: 'Citizen' },
        { value: 'lgu_officer', label: 'LGU Officer' },
        { value: 'national_agency', label: 'National Agency Representative' }
    ]

    return (
        <div className="disaster-report-form-overlay">
            <div className="disaster-report-form-container">
                <div className="form-header">
                    <h2>
                        {readOnly ? 'View Disaster Report' : 
                         initialData.sys_id ? 'Edit Disaster Report' : 
                         'Submit Disaster Report'}
                    </h2>
                    {!readOnly && (
                        <button type="button" className="close-button" onClick={onCancel}>
                            ×
                        </button>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="disaster-report-form">
                    {/* Reporter Information Section */}
                    <div className="form-section">
                        <h3>Reporter Information</h3>
                        
                        <div className="form-group">
                            <label htmlFor="reporter_name">Name *</label>
                            <input
                                type="text"
                                id="reporter_name"
                                name="reporter_name"
                                value={formData.reporter_name}
                                onChange={handleInputChange}
                                className={errors.reporter_name ? 'error' : ''}
                                readOnly={readOnly}
                                required
                            />
                            {errors.reporter_name && <span className="error-text">{errors.reporter_name}</span>}
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="reporter_type">Reporter Type *</label>
                                <select
                                    id="reporter_type"
                                    name="reporter_type"
                                    value={formData.reporter_type}
                                    onChange={handleInputChange}
                                    disabled={readOnly}
                                    required
                                >
                                    {reporterTypes.map(type => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="reporter_contact">Contact Information *</label>
                                <input
                                    type="text"
                                    id="reporter_contact"
                                    name="reporter_contact"
                                    value={formData.reporter_contact}
                                    onChange={handleInputChange}
                                    className={errors.reporter_contact ? 'error' : ''}
                                    placeholder="Email / Phone"
                                    readOnly={readOnly}
                                    required
                                />
                                {errors.reporter_contact && <span className="error-text">{errors.reporter_contact}</span>}
                            </div>
                        </div>
                    </div>

                    {/* Location Information Section */}
                    <div className="form-section">
                        <h3>Location Information</h3>
                        
                        <div className="form-group">
                            <label htmlFor="location_description">Location Description *</label>
                            <input
                                type="text"
                                id="location_description"
                                name="location_description"
                                value={formData.location_description}
                                onChange={handleInputChange}
                                className={errors.location_description ? 'error' : ''}
                                placeholder="Describe the specific location"
                                readOnly={readOnly}
                                required
                            />
                            {errors.location_description && <span className="error-text">{errors.location_description}</span>}
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="region">Region *</label>
                                <input
                                    type="text"
                                    id="region"
                                    name="region"
                                    value={formData.region}
                                    onChange={handleInputChange}
                                    className={errors.region ? 'error' : ''}
                                    readOnly={readOnly}
                                    required
                                />
                                {errors.region && <span className="error-text">{errors.region}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="province">Province *</label>
                                <input
                                    type="text"
                                    id="province"
                                    name="province"
                                    value={formData.province}
                                    onChange={handleInputChange}
                                    className={errors.province ? 'error' : ''}
                                    readOnly={readOnly}
                                    required
                                />
                                {errors.province && <span className="error-text">{errors.province}</span>}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="municipality">Municipality/City *</label>
                                <input
                                    type="text"
                                    id="municipality"
                                    name="municipality"
                                    value={formData.municipality}
                                    onChange={handleInputChange}
                                    className={errors.municipality ? 'error' : ''}
                                    readOnly={readOnly}
                                    required
                                />
                                {errors.municipality && <span className="error-text">{errors.municipality}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="barangay">Barangay *</label>
                                <input
                                    type="text"
                                    id="barangay"
                                    name="barangay"
                                    value={formData.barangay}
                                    onChange={handleInputChange}
                                    className={errors.barangay ? 'error' : ''}
                                    readOnly={readOnly}
                                    required
                                />
                                {errors.barangay && <span className="error-text">{errors.barangay}</span>}
                            </div>
                        </div>

                        {/* GPS Coordinates */}
                        {defaultConfig.enableGeoLocation && (
                            <div className="form-group">
                                <label>GPS Coordinates</label>
                                <div className="gps-section">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <input
                                                type="number"
                                                name="latitude"
                                                value={formData.latitude}
                                                onChange={handleInputChange}
                                                placeholder="Latitude"
                                                step="any"
                                                readOnly={readOnly}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="number"
                                                name="longitude"
                                                value={formData.longitude}
                                                onChange={handleInputChange}
                                                placeholder="Longitude"
                                                step="any"
                                                readOnly={readOnly}
                                            />
                                        </div>
                                        {!readOnly && (
                                            <button
                                                type="button"
                                                onClick={getCurrentLocation}
                                                disabled={geoLocationStatus === 'loading'}
                                                className="gps-button"
                                            >
                                                {geoLocationStatus === 'loading' ? 'Getting Location...' : 'Get GPS'}
                                            </button>
                                        )}
                                    </div>
                                    {errors.location && <span className="error-text">{errors.location}</span>}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Damage Information Section */}
                    <div className="form-section">
                        <h3>Damage Information</h3>
                        
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="damage_type">Damage Type *</label>
                                <select
                                    id="damage_type"
                                    name="damage_type"
                                    value={formData.damage_type}
                                    onChange={handleInputChange}
                                    className={errors.damage_type ? 'error' : ''}
                                    disabled={readOnly}
                                    required
                                >
                                    <option value="">Select damage type</option>
                                    {damageTypes.map(type => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.damage_type && <span className="error-text">{errors.damage_type}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="damage_severity">Severity Level *</label>
                                <select
                                    id="damage_severity"
                                    name="damage_severity"
                                    value={formData.damage_severity}
                                    onChange={handleInputChange}
                                    className={errors.damage_severity ? 'error' : ''}
                                    disabled={readOnly}
                                    required
                                >
                                    <option value="">Select severity</option>
                                    {severityLevels.map(level => (
                                        <option key={level.value} value={level.value}>
                                            {level.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.damage_severity && <span className="error-text">{errors.damage_severity}</span>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="damage_description">Damage Description *</label>
                            <textarea
                                id="damage_description"
                                name="damage_description"
                                value={formData.damage_description}
                                onChange={handleInputChange}
                                className={errors.damage_description ? 'error' : ''}
                                rows={4}
                                placeholder="Provide detailed description of the damage"
                                readOnly={readOnly}
                                required
                            />
                            {errors.damage_description && <span className="error-text">{errors.damage_description}</span>}
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="affected_households">Affected Households</label>
                                <input
                                    type="number"
                                    id="affected_households"
                                    name="affected_households"
                                    value={formData.affected_households}
                                    onChange={handleInputChange}
                                    min="0"
                                    readOnly={readOnly}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="affected_individuals">Affected Individuals</label>
                                <input
                                    type="number"
                                    id="affected_individuals"
                                    name="affected_individuals"
                                    value={formData.affected_individuals}
                                    onChange={handleInputChange}
                                    min="0"
                                    readOnly={readOnly}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="immediate_needs">Immediate Needs</label>
                            <textarea
                                id="immediate_needs"
                                name="immediate_needs"
                                value={formData.immediate_needs}
                                onChange={handleInputChange}
                                rows={3}
                                placeholder="Describe immediate needs and required assistance"
                                readOnly={readOnly}
                            />
                        </div>
                    </div>

                    {/* Multimedia Section */}
                    {defaultConfig.enableMultimedia && !readOnly && (
                        <div className="form-section">
                            <h3>Multimedia Evidence</h3>
                            <div className="form-group">
                                <label htmlFor="multimedia_files">Upload Photos/Videos</label>
                                <input
                                    type="file"
                                    id="multimedia_files"
                                    multiple
                                    accept={defaultConfig.allowedFileTypes.join(',')}
                                    onChange={handleFileChange}
                                    disabled={readOnly}
                                />
                                <small className="form-help">
                                    Maximum file size: {defaultConfig.maxFileSize}MB per file
                                </small>
                                {selectedFiles.length > 0 && (
                                    <div className="selected-files">
                                        <strong>Selected files:</strong>
                                        <ul>
                                            {selectedFiles.map((file, index) => (
                                                <li key={index}>{file.name} ({(file.size / (1024 * 1024)).toFixed(1)}MB)</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Form Actions */}
                    {!readOnly && (
                        <div className="form-actions">
                            <button type="button" className="cancel-button" onClick={onCancel}>
                                Cancel
                            </button>
                            <button type="submit" className="submit-button">
                                {initialData.sys_id ? 'Update Report' : 'Submit Report'}
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}