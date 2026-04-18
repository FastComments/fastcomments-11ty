import type { FastCommentsImageChatWidgetConfig } from 'fastcomments-typescript';
import { renderSelectorWidget } from './render-widget';

export interface FastCommentsImageChatShortcodeConfig extends FastCommentsImageChatWidgetConfig {
    /** CSS selector for the target image element (e.g. "#my-image"). */
    target: string;
}

export function imageChat(config: FastCommentsImageChatShortcodeConfig): string {
    return renderSelectorWidget(
        {
            scriptPath: '/js/embed-image-chat.min.js',
            scriptMarkerAttr: 'data-fc-image-chat',
            globalName: 'FastCommentsImageChat',
            shortcodeName: 'fastcommentsImageChat'
        },
        config
    );
}
