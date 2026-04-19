import '@servicenow/sdk/global'
import { RestApi } from '@servicenow/sdk/core'

RestApi({
    $id: Now.ID['disaster_report_api'],
    name: 'DisasterReportAPI',
    service_id: 'disaster_reports',
    short_description: 'REST API for disaster report management',
    active: true,
    versions: [{
        $id: Now.ID['disaster_report_api_v1'],
        version: 1,
        short_description: 'Version 1 of Disaster Report API'
    }],
    routes: [
        {
            $id: Now.ID['disaster_report_list'],
            version: 1,
            method: 'GET',
            path: '/reports',
            script: Now.include('../../server/disaster-report-api.js'),
            name: 'List Disaster Reports',
            short_description: 'Get all disaster reports with optional filtering'
        }
    ]
})