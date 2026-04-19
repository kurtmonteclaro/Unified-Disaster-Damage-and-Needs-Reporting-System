import React from 'react'

export default function Navbar({ currentPage }) {
    const navigateToPage = (page) => {
        window.location.hash = page
    }

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="logo" onClick={() => navigateToPage('home')}>
                    <div className="logo-icon">U</div>
                    <span>UDDNRS</span>
                </div>
                
                <ul className="nav-links">
                    <li>
                        <span 
                            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
                            onClick={() => navigateToPage('home')}
                        >
                            Home
                        </span>
                    </li>
                    <li>
                        <span 
                            className={`nav-link ${currentPage === 'submit' ? 'active' : ''}`}
                            onClick={() => navigateToPage('submit')}
                        >
                            Submit Report
                        </span>
                    </li>
                    <li>
                        <span 
                            className={`nav-link ${currentPage === 'reports' ? 'active' : ''}`}
                            onClick={() => navigateToPage('reports')}
                        >
                            View Reports
                        </span>
                    </li>
                    <li>
                        <span 
                            className={`nav-link ${currentPage === 'analytics' ? 'active' : ''}`}
                            onClick={() => navigateToPage('analytics')}
                        >
                            Analytics
                        </span>
                    </li>
                </ul>
            </div>
        </nav>
    )
}