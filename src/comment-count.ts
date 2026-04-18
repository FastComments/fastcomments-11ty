import type { FastCommentsCommentCountConfig } from 'fastcomments-typescript';
import { renderContainerWidget } from './render-widget';

export function commentCount(config?: FastCommentsCommentCountConfig): string {
    return renderContainerWidget(
        {
            containerTag: 'span',
            containerIdPrefix: 'fc-count',
            scriptPath: '/js/widget-comment-count.min.js',
            scriptMarkerAttr: 'data-fc-count',
            globalName: 'FastCommentsCommentCount'
        },
        config
    );
}
