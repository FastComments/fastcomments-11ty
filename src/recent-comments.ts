import { renderContainerWidget } from './render-widget';
import type { ConfigWithRegion } from './util';

export interface FastCommentsRecentCommentsConfig extends ConfigWithRegion {
    tenantId: string;
    urlId?: string;
    count?: number;
    hasDarkBackground?: boolean;
    translations?: Record<string, string>;
    apiHost?: string;
}

export function recentComments(config?: FastCommentsRecentCommentsConfig): string {
    return renderContainerWidget(
        {
            containerTag: 'div',
            containerIdPrefix: 'fc-recent-comments',
            scriptPath: '/js/widget-recent-comments-v2.min.js',
            scriptMarkerAttr: 'data-fc-recent-comments-v2',
            globalName: 'FastCommentsRecentCommentsV2'
        },
        config
    );
}
