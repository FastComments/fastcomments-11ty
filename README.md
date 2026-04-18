# fastcomments-11ty

A fast, full-featured live commenting widget for [Eleventy](https://www.11ty.dev) (11ty), powered by [FastComments](https://fastcomments.com).

## Live Demo

Try every widget live at <https://fastcomments.com/commenting-system-for-11ty>.

## Live Showcase

To see every shortcode and flow running locally against the public `demo` tenant, clone the repo and run:

```bash
cd example
npm install
npm start
```

Each component has its own page under `example/src/pages/` that you can copy straight into your own Eleventy site.

## Install

```bash
npm install fastcomments-11ty
```

## Quick Start

Register the plugin in your Eleventy config (`.eleventy.js` or `eleventy.config.js`):

```js
const { fastcommentsPlugin } = require('fastcomments-11ty');

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(fastcommentsPlugin);
};
```

Or with ESM:

```js
import { fastcommentsPlugin } from 'fastcomments-11ty';

export default function(eleventyConfig) {
    eleventyConfig.addPlugin(fastcommentsPlugin);
}
```

Then use the shortcodes in your templates. In Nunjucks (`.njk`):

```njk
{% fastcomments { tenantId: "demo" } %}
```

In Liquid (`.liquid`):

```liquid
{% fastcomments tenantId: "demo" %}
```

Replace `"demo"` with your FastComments tenant ID.

## Shortcodes

| Shortcode | Description |
| --- | --- |
| `fastcomments` | Commenting widget with replies, voting, and more |
| `fastcommentsCommentCount` | Displays comment count for a page |
| `fastcommentsImageChat` | Image annotation comments |
| `fastcommentsLiveChat` | Live chat widget |
| `fastcommentsCollabChat` | Collaborative inline commenting |
| `fastcommentsRecentComments` | Recent comments across the site |
| `fastcommentsRecentDiscussions` | Recently active discussion threads |
| `fastcommentsReviewsSummary` | Star-rating reviews summary |
| `fastcommentsTopPages` | Most-discussed pages |
| `fastcommentsUserActivityFeed` | User activity feed |

### Examples

```njk
{# Comment count inline with text #}
This page has {% fastcommentsCommentCount { tenantId: "demo" } %} comments.

{# Live chat #}
{% fastcommentsLiveChat { tenantId: "demo" } %}

{# Collab chat — target a content element by CSS selector #}
<article id="post-body">
  <p>Highlight me to leave a comment.</p>
</article>
{% fastcommentsCollabChat { tenantId: "demo", target: "#post-body" } %}

{# Image chat — target an image element by CSS selector #}
<img id="hero" src="/hero.jpg" alt="Hero image" />
{% fastcommentsImageChat { tenantId: "demo", target: "#hero" } %}

{# Reviews summary #}
{% fastcommentsReviewsSummary { tenantId: "demo" } %}

{# User activity feed #}
{% fastcommentsUserActivityFeed { tenantId: "demo", userId: "demo:demo-user" } %}
```

## Plugin Options

```js
eleventyConfig.addPlugin(fastcommentsPlugin, {
    // Only register a subset of the shortcodes:
    shortcodes: ['fastcomments', 'fastcommentsCommentCount'],
    // Add a prefix to every registered shortcode name (e.g. "fc" -> "fcFastcomments"):
    prefix: 'fc'
});
```

## Manual Usage (without the plugin)

Each shortcode is also exported as a standalone function that returns the HTML string:

```js
const { fastcomments, commentCount } = require('fastcomments-11ty');

eleventyConfig.addShortcode('comments', fastcomments);
eleventyConfig.addShortcode('commentCount', commentCount);
```

## Example Project

A working demo is included in the `example/` directory:

```bash
cd example && npm install && npm start
```

## Links

- [FastComments Documentation](https://docs.fastcomments.com)
- [Customization & Configuration](https://docs.fastcomments.com/guide-customizations-and-configuration.html)
- [Eleventy Documentation](https://www.11ty.dev/docs/)

## License

MIT

## Maintenance Status

These components are wrappers around our core VanillaJS components. We can automatically update these components (fix bugs, add features) without publishing this library, so while it may not be published for a while that does not mean FastComments is not under active development! Feel free to check [our blog](https://blog.fastcomments.com/) for updates. Breaking API changes or features will never be shipped to the underlying core library without a version bump in this library.
