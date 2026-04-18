import type { FastCommentsCommentWidgetConfig } from 'fastcomments-typescript';
import { renderContainerWidget } from './render-widget';

export interface FastCommentsUserActivityFeedConfig extends FastCommentsCommentWidgetConfig {
    /** With SSO: tenantId + ':' + userId. With Simple SSO: tenantId + ':' + userEmail. */
    userId: string;
}

export function userActivityFeed(config: FastCommentsUserActivityFeedConfig): string {
    return renderContainerWidget(
        {
            containerTag: 'div',
            containerIdPrefix: 'fc-activity',
            scriptPath: '/js/embed-user-activity.min.js',
            scriptMarkerAttr: 'data-fc-user-activity',
            globalName: 'FastCommentsUserActivity',
            useCallback: true,
            errorLabel: 'User Activity'
        },
        config
    );
}
