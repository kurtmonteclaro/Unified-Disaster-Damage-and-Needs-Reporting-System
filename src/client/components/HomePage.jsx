import React from 'react'

export default function HomePage() {
    const navigateToPage = (page) => {
        window.location.hash = page
    }

    const features = [
        {
            icon: '📊',
            title: 'Standardized Data',
            description: 'Consistent reporting format across all regions and agencies for better coordination.'
        },
        {
            icon: '⚡',
            title: 'Fast Validation',
            description: 'Real-time validation and automated workflows to speed up response times.'
        },
        {
            icon: '🎯',
            title: 'Automated Severity',
            description: 'AI-powered severity assessment based on damage reports and location data.'
        },
        {
            icon: '📈',
            title: 'Analytics Dashboard',
            description: 'Comprehensive analytics and insights for informed decision-making.'
        }
    ]

    const steps = [
        {
            number: 1,
            title: 'Report Incident',
            description: 'Citizens and officials submit standardized disaster reports with location and damage details.'
        },
        {
            number: 2,
            title: 'LGU Verification',
            description: 'Local government units verify and validate submitted reports for accuracy.'
        },
        {
            number: 3,
            title: 'Data Aggregation',
            description: 'System automatically aggregates verified data into standardized national indicators.'
        },
        {
            number: 4,
            title: 'Response Planning',
            description: 'Agencies use real-time analytics to deploy resources and plan recovery efforts.'
        }
    ]

    return (
        <div className="home-page fade-in">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Disaster Reporting Made Fast and Reliable
                    </h1>
                    <p className="hero-subtitle">
                        Standardized reporting for LGUs and national agencies. 
                        Streamline disaster response with unified data collection and real-time analytics.
                    </p>
                    <div className="hero-actions">
                        <button 
                            className="btn btn-primary btn-lg"
                            onClick={() => navigateToPage('submit')}
                        >
                            Submit Report
                        </button>
                        <button 
                            className="btn btn-secondary btn-lg"
                            onClick={() => navigateToPage('reports')}
                        >
                            View Reports
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="grid grid-4">
                    {features.map((feature, index) => (
                        <div key={index} className="card feature-card slide-up">
                            <div className="feature-icon">{feature.icon}</div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works">
                <h2 className="section-title">How It Works</h2>
                <div className="steps">
                    {steps.map((step, index) => (
                        <div key={index} className="step slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="step-number">{step.number}</div>
                            <h3 className="step-title">{step.title}</h3>
                            <p className="step-description">{step.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="grid grid-3">
                    <div className="card text-center">
                        <div className="card-content">
                            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-blue)', marginBottom: '0.5rem' }}>
                                24/7
                            </div>
                            <h3 className="feature-title">Always Available</h3>
                            <p className="feature-description">Round-the-clock disaster reporting and monitoring system</p>
                        </div>
                    </div>
                    
                    <div className="card text-center">
                        <div className="card-content">
                            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--success-green)', marginBottom: '0.5rem' }}>
                                &lt; 5min
                            </div>
                            <h3 className="feature-title">Rapid Response</h3>
                            <p className="feature-description">Average report processing time for critical incidents</p>
                        </div>
                    </div>
                    
                    <div className="card text-center">
                        <div className="card-content">
                            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--warning-yellow)', marginBottom: '0.5rem' }}>
                                100%
                            </div>
                            <h3 className="feature-title">Data Standardized</h3>
                            <p className="feature-description">All reports follow unified national standards</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="cta-section" style={{ textAlign: 'center', margin: '4rem 0' }}>
                <div className="card" style={{ padding: '3rem', maxWidth: '600px', margin: '0 auto' }}>
                    <h2 style={{ marginBottom: '1rem', fontSize: '1.75rem' }}>Ready to Get Started?</h2>
                    <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                        Join thousands of LGUs and agencies using UDDNRS for effective disaster management.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button 
                            className="btn btn-primary btn-lg"
                            onClick={() => navigateToPage('submit')}
                        >
                            Start Reporting
                        </button>
                        <button 
                            className="btn btn-secondary btn-lg"
                            onClick={() => navigateToPage('analytics')}
                        >
                            View Analytics
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}