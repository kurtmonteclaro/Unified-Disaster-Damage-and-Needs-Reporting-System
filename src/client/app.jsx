import React, { useState, useEffect } from 'react'
import HomePage from './components/HomePage.jsx'
import SubmitReportPage from './components/SubmitReportPage.jsx'
import ReportsPage from './components/ReportsPage.jsx'
import AnalyticsPage from './components/AnalyticsPage.jsx'
import Navbar from './components/Navbar.jsx'
import { ROLES } from './utils/roleSystem.js'
import './app.css'

export default function App() {
    const [currentPage, setCurrentPage] = useState('home')
    const [successMessage, setSuccessMessage] = useState('')
    const [userRole] = useState(() => window.localStorage.getItem('uddnrs_role') || ROLES.CITIZEN)

    // Simple hash-based routing
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.slice(1) || 'home'
            setCurrentPage(hash)
        }

        handleHashChange()
        window.addEventListener('hashchange', handleHashChange)
        return () => window.removeEventListener('hashchange', handleHashChange)
    }, [])

    const showSuccessMessage = (message) => {
        setSuccessMessage(message)
        setTimeout(() => setSuccessMessage(''), 5000)
    }

    const renderPage = () => {
        switch (currentPage) {
            case 'submit':
                return <SubmitReportPage onSuccess={showSuccessMessage} />
            case 'reports':
                return <ReportsPage userRole={userRole} />
            case 'analytics':
                return <AnalyticsPage />
            default:
                return <HomePage />
        }
    }

    return (
        <div className="uddnrs-app fade-in">
            <Navbar currentPage={currentPage} />
            
            {successMessage && (
                <div className="success-message">
                    <span>{successMessage}</span>
                    <button onClick={() => setSuccessMessage('')}>×</button>
                </div>
            )}
            
            <main className="main-content">
                {renderPage()}
            </main>
        </div>
    )
}