import type { FastCommentsCommentWidgetConfig } from 'fastcomments-typescript';
import { renderContainerWidget } from './render-widget';

export function fastcomments(config?: FastCommentsCommentWidgetConfig): string {
    return renderContainerWidget(
        {
            containerTag: 'div',
            containerIdPrefix: 'fc',
            scriptPath: '/js/embed-v2.min.js',
            scriptMarkerAttr: 'data-fc-embed',
            globalName: 'FastCommentsUI'
        },
        config
    );
}
