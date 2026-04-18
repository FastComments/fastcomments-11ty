import { renderContainerWidget } from './render-widget';
import type { ConfigWithRegion } from './util';

export interface FastCommentsRecentDiscussionsConfig extends ConfigWithRegion {
    tenantId: string;
    count?: number;
    hasDarkBackground?: boolean;
    translations?: Record<string, string>;
    apiHost?: string;
}

export function recentDiscussions(config?: FastCommentsRecentDiscussionsConfig): string {
    return renderContainerWidget(
        {
            containerTag: 'div',
            containerIdPrefix: 'fc-recent-discussions',
            scriptPath: '/js/widget-recent-discussions-v2.min.js',
            scriptMarkerAttr: 'data-fc-recent-discussions-v2',
            globalName: 'FastCommentsRecentDiscussionsV2'
        },
        config
    );
}
