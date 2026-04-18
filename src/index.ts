import { fastcomments } from './fastcomments';
import { commentCount } from './comment-count';
import { liveChat } from './live-chat';
import { collabChat } from './collab-chat';
import { imageChat } from './image-chat';
import { recentComments } from './recent-comments';
import { recentDiscussions } from './recent-discussions';
import { reviewsSummary } from './reviews-summary';
import { topPages } from './top-pages';
import { userActivityFeed } from './user-activity-feed';

export type FastCommentsShortcodeName =
    | 'fastcomments'
    | 'fastcommentsCommentCount'
    | 'fastcommentsLiveChat'
    | 'fastcommentsCollabChat'
    | 'fastcommentsImageChat'
    | 'fastcommentsRecentComments'
    | 'fastcommentsRecentDiscussions'
    | 'fastcommentsReviewsSummary'
    | 'fastcommentsTopPages'
    | 'fastcommentsUserActivityFeed';

type ShortcodeFn = (...args: unknown[]) => string;

const SHORTCODES: Record<FastCommentsShortcodeName, ShortcodeFn> = {
    fastcomments: fastcomments as ShortcodeFn,
    fastcommentsCommentCount: commentCount as ShortcodeFn,
    fastcommentsLiveChat: liveChat as ShortcodeFn,
    fastcommentsCollabChat: collabChat as ShortcodeFn,
    fastcommentsImageChat: imageChat as ShortcodeFn,
    fastcommentsRecentComments: recentComments as ShortcodeFn,
    fastcommentsRecentDiscussions: recentDiscussions as ShortcodeFn,
    fastcommentsReviewsSummary: reviewsSummary as ShortcodeFn,
    fastcommentsTopPages: topPages as ShortcodeFn,
    fastcommentsUserActivityFeed: userActivityFeed as ShortcodeFn
};

export interface FastCommentsPluginOptions {
    /** Limit which shortcodes get registered. Defaults to all. */
    shortcodes?: readonly FastCommentsShortcodeName[];
    /** Optional prefix added to each shortcode name (e.g. `fc` -> `fcFastcomments`). */
    prefix?: string;
}

/**
 * Minimal subset of the Eleventy `eleventyConfig` API that this plugin uses.
 * Typed structurally so we don't need a hard dependency on `@11ty/eleventy`.
 */
export interface EleventyConfigLike {
    addShortcode(name: string, fn: (...args: unknown[]) => string): unknown;
}

function capitalize(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function shortcodeNames(): readonly FastCommentsShortcodeName[] {
    return Object.keys(SHORTCODES) as FastCommentsShortcodeName[];
}

export function fastcommentsPlugin(
    eleventyConfig: EleventyConfigLike,
    options: FastCommentsPluginOptions = {}
): void {
    const include = options.shortcodes;
    const prefix = options.prefix ?? '';
    const allowed: ReadonlySet<FastCommentsShortcodeName> | null = include
        ? new Set(include)
        : null;

    for (const name of shortcodeNames()) {
        if (allowed && !allowed.has(name)) {
            continue;
        }
        const fn = SHORTCODES[name];
        const finalName = prefix ? `${prefix}${capitalize(name)}` : name;
        eleventyConfig.addShortcode(finalName, fn);
    }
}

export {
    fastcomments,
    commentCount,
    liveChat,
    collabChat,
    imageChat,
    recentComments,
    recentDiscussions,
    reviewsSummary,
    topPages,
    userActivityFeed
};

export type { FastCommentsCollabChatShortcodeConfig } from './collab-chat';
export type { FastCommentsImageChatShortcodeConfig } from './image-chat';
export type { FastCommentsRecentCommentsConfig } from './recent-comments';
export type { FastCommentsRecentDiscussionsConfig } from './recent-discussions';
export type { FastCommentsReviewsSummaryConfig } from './reviews-summary';
export type { FastCommentsTopPagesConfig } from './top-pages';
export type { FastCommentsUserActivityFeedConfig } from './user-activity-feed';
export type { FastCommentsRegion } from './util';
