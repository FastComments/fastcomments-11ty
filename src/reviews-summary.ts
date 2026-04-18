import { renderContainerWidget } from './render-widget';
import type { FastCommentsRegion } from './util';

export interface FastCommentsReviewsSummaryConfig {
    /** Id that represents you as a customer. */
    tenantId: string;
    /** Id that represents the page, if you don't want to tie comments to the page url. */
    urlId?: string;
    /** The region your account is in. EU customers should set to 'eu'. */
    region?: FastCommentsRegion;
}

export function reviewsSummary(config: FastCommentsReviewsSummaryConfig): string {
    return renderContainerWidget(
        {
            containerTag: 'div',
            containerIdPrefix: 'fc-rs',
            scriptPath: '/js/embed-reviews-summary.min.js',
            scriptMarkerAttr: 'data-fc-reviews-summary',
            globalName: 'FastCommentsReviewsSummaryWidget',
            useCallback: true,
            errorLabel: 'Reviews Summary'
        },
        config
    );
}
