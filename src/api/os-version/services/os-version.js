'use strict';

/**
 * os-version service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::os-version.os-version');
