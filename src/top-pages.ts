import { renderContainerWidget } from './render-widget';
import type { ConfigWithRegion } from './util';

export interface FastCommentsTopPagesConfig extends ConfigWithRegion {
    tenantId: string;
    hasDarkBackground?: boolean;
    apiHost?: string;
}

export function topPages(config?: FastCommentsTopPagesConfig): string {
    return renderContainerWidget(
        {
            containerTag: 'div',
            containerIdPrefix: 'fc-top-pages',
            scriptPath: '/js/widget-top-pages-v2.min.js',
            scriptMarkerAttr: 'data-fc-top-pages-v2',
            globalName: 'FastCommentsTopPagesV2'
        },
        config
    );
}
