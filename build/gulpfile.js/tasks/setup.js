var config = require('../config');

if (!config.tasks.css) return;

var gulp    = require('gulp');
var chalk	= require('chalk');
var plugins	= require('gulp-load-plugins')();
var path = require('path');

var setupTask = function() {

	console.log('['+chalk.green('SETUP')+']'+chalk.magenta('Creating Foundation settings file in scss/global folder'));
	gulp.src('node_modules/foundation-sites/scss/settings/_settings.scss')
    	.pipe(gulp.dest(path.join(config.root.src, config.tasks.css.src,'global')))
		.pipe(plugins.expectFile(path.join(config.root.src, config.tasks.css.src,'global/_settings.scss')));


	var setup = `@charset 'utf-8';

  @import 'global/settings';
  @import 'foundation';
  // @import 'motion-ui';

  // Global styles
  @include foundation-global-styles;
  @include foundation-forms;
  @include foundation-typography;

  // Grids (choose one)
  @include foundation-xy-grid-classes;
  // @include foundation-grid;
  // @include foundation-flex-grid;

  // Generic components
  // @include foundation-button;
  // @include foundation-button-group;
  // @include foundation-close-button;
  // @include foundation-label;
  // @include foundation-progress-bar;
  // @include foundation-slider;
  // @include foundation-switch;
  // @include foundation-table;

  // Basic components
  // @include foundation-badge;
  // @include foundation-breadcrumbs;
  // @include foundation-callout;
  // @include foundation-card;
  // @include foundation-dropdown;
  // @include foundation-pagination;
  // @include foundation-tooltip;

  // Containers
  @include foundation-accordion;
  // @include foundation-media-object;
  // @include foundation-orbit;
  // @include foundation-responsive-embed;
  // @include foundation-tabs;
  // @include foundation-thumbnail;

  // Menu-based containers
  // @include foundation-menu;
  // @include foundation-menu-icon;
  // @include foundation-accordion-menu;
  // @include foundation-drilldown-menu;
  // @include foundation-dropdown-menu;

  // Layout components
  // @include foundation-off-canvas;
  // @include foundation-reveal;
  // @include foundation-sticky;
  // @include foundation-title-bar;
  // @include foundation-top-bar;

  // Helpers
  @include foundation-float-classes;
  @include foundation-flex-classes;
  @include foundation-visibility-classes;
  // @include foundation-prototype-classes;

  // Motion UI
  // @include motion-ui-transitions;
  // @include motion-ui-animations;


/** APP SASS PARTIAL IMPORTS **/

/* GLOBAL MODULES */

// Mixins
@import "global/mixin-vars";

// Helper Classes
@import "global/helpers";

// Base Styles
@import "global/base";

// Print Styles
@import "global/print";


/* SECTIONS AND WIDGETS */

// Header
@import "sections/headers/site-header";

// Footer
@import "sections/footers/site-footer";`;

	console.log('['+chalk.green('SETUP')+']'+chalk.magenta('Creating app.scss file in scss folder'));
	plugins.file('app.scss',setup, { src: true })
		.pipe(gulp.dest(path.join(config.root.src, config.tasks.css.src)))
		.pipe(plugins.expectFile(path.join(config.root.src, config.tasks.css.src,'/app.scss')));

};

gulp.task('setup', setupTask);
module.exports = setupTask;
