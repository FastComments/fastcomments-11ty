import type { FastCommentsLiveChatWidgetConfig } from 'fastcomments-typescript';
import { renderContainerWidget } from './render-widget';

export function liveChat(config?: FastCommentsLiveChatWidgetConfig): string {
    return renderContainerWidget(
        {
            containerTag: 'div',
            containerIdPrefix: 'fc-live-chat',
            scriptPath: '/js/embed-live-chat.min.js',
            scriptMarkerAttr: 'data-fc-live-chat',
            globalName: 'FastCommentsLiveChat'
        },
        config
    );
}
