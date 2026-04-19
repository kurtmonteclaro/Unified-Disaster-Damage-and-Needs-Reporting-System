import '@servicenow/sdk/global'

// Import all Fluent metadata definitions

// Tables
import './tables/disaster-report.now.ts'

// Roles and Security
import './roles/uddnrs-roles.now.ts'
import './acls/disaster-report-acls.now.ts'

// Business Logic
import './business-rules/disaster-report-business-rules.now.ts'

// UI Components
import './ui-pages/incident-manager.now.ts'
import './menus/uddnrs-menus.now.ts'

// Configuration
import './properties/uddnrs-config.now.ts'