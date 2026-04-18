'use strict';

const { fastcommentsPlugin } = require('fastcomments-11ty');

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(fastcommentsPlugin);
    eleventyConfig.addPassthroughCopy({ 'src/public': '/' });
    return {
        dir: {
            input: 'src/pages',
            includes: '../includes',
            layouts: '../layouts',
            output: 'dist'
        },
        templateFormats: ['njk', 'md', 'html'],
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        pathPrefix: process.env.BUILD_DEMO === '1' ? '/commenting-system-for-11ty/' : '/'
    };
};
