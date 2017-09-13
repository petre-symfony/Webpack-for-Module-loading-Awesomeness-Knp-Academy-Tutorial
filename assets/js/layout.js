'use strict';
const $ = require('jquery');
require('bootstrap-sass');

require('bootstrap-sass/assets/stylesheets/_bootstrap.scss');
require('font-awesome/css/font-awesome.css');
require('../css/main.scss');

// include this on every page to make sure Promise exists
require('babel-polyfill');


$(document).ready(function() {
  $('[data-toggle="tooltip"]').tooltip();
});

