import type { FastCommentsCollabChatWidgetConfig } from 'fastcomments-typescript';
import { renderSelectorWidget } from './render-widget';

export interface FastCommentsCollabChatShortcodeConfig extends FastCommentsCollabChatWidgetConfig {
    /** CSS selector for the target element to enable collab chat on (e.g. "#my-content"). */
    target: string;
}

export function collabChat(config: FastCommentsCollabChatShortcodeConfig): string {
    return renderSelectorWidget(
        {
            scriptPath: '/js/embed-collab-chat.min.js',
            scriptMarkerAttr: 'data-fc-collab-chat',
            globalName: 'FastCommentsCollabChat',
            shortcodeName: 'fastcommentsCollabChat'
        },
        config
    );
}
