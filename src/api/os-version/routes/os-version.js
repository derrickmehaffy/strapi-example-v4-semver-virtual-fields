'use strict';

/**
 * os-version router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::os-version.os-version');
