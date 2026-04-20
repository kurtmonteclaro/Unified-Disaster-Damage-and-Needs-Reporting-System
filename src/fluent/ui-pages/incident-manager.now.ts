import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import uddnrsPage from '../../client/index.html'

export const uddnrs_portal = UiPage({
    $id: Now.ID['uddnrs-portal'],
    endpoint: 'x_2002275_unifie_0_uddnrs_portal.do',
    description: 'Modern Unified Disaster Damage and Needs Reporting System Portal',
    category: 'general',
    html: uddnrsPage,
    direct: true,
})
