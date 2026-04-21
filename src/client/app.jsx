import React, { useState, useEffect } from 'react'
import HomePage from './components/HomePage.jsx'
import SubmitReportPage from './components/SubmitReportPage.jsx'
import ReportsPage from './components/ReportsPage.jsx'
import AnalyticsPage from './components/AnalyticsPage.jsx'
import Navbar from './components/Navbar.jsx'
import { ROLES } from './utils/roleSystem.js'
import './app.css'

const ROLE_ALIASES = {
    citizen: ROLES.CITIZEN,
    'x_2002275_unifie_0.citizen': ROLES.CITIZEN,
    lgu_officer: ROLES.LGU_OFFICER,
    'x_2002275_unifie_0.lgu_officer': ROLES.LGU_OFFICER,
    app_admin: ROLES.APP_ADMIN,
    admin: ROLES.APP_ADMIN,
    'x_2002275_unifie_0.app_admin': ROLES.APP_ADMIN,
}

const extractSessionRoles = () => {
    const sessionSources = [
        window.NOW?.user,
        window.g_user,
    ].filter(Boolean)

    for (const source of sessionSources) {
        const rawRoles = source.roles || source.role || source.user_roles || source.userRoles || ''

        if (Array.isArray(rawRoles)) {
            return rawRoles
        }

        if (typeof rawRoles === 'string') {
            return rawRoles.split(/[\s,]+/).filter(Boolean)
        }

        if (rawRoles && typeof rawRoles === 'object') {
            return Object.keys(rawRoles).filter((key) => rawRoles[key])
        }
    }

    return []
}

const resolveRoleFromSession = () => {
    const sessionRoles = extractSessionRoles().map((role) => String(role).trim().toLowerCase())

    for (const role of sessionRoles) {
        if (ROLE_ALIASES[role]) {
            return ROLE_ALIASES[role]
        }
    }

    const localRole = window.localStorage.getItem('uddnrs_role')
    if (localRole && ROLE_ALIASES[String(localRole).toLowerCase()]) {
        return ROLE_ALIASES[String(localRole).toLowerCase()]
    }

    return ROLES.CITIZEN
}

export default function App() {
    const [currentPage, setCurrentPage] = useState('home')
    const [successMessage, setSuccessMessage] = useState('')
    const [userRole, setUserRole] = useState(() => resolveRoleFromSession())

    // Simple hash-based routing
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.slice(1) || 'home'
            setCurrentPage(hash)
        }

        const syncRoleFromSession = () => {
            const detectedRole = resolveRoleFromSession()
            setUserRole(detectedRole)
            window.localStorage.setItem('uddnrs_role', detectedRole)
        }

        const handleVisibilityChange = () => {
            if (!document.hidden) {
                syncRoleFromSession()
            }
        }

        handleHashChange()
        syncRoleFromSession()
        window.addEventListener('hashchange', handleHashChange)
        window.addEventListener('focus', syncRoleFromSession)
        document.addEventListener('visibilitychange', handleVisibilityChange)
        return () => {
            window.removeEventListener('hashchange', handleHashChange)
            window.removeEventListener('focus', syncRoleFromSession)
            document.removeEventListener('visibilitychange', handleVisibilityChange)
        }
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