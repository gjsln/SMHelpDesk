/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {

  build_dir: 'release',

  app_files: {
    js: [ 'dev/**/*.js', '!dev/assets/**/*.js' ],
    html: [ 'dev/index.html' ],
    less: 'dev/less/style.less'
  },
  vendor_files: {
    js: [
      'release/vendor/jquery/jquery-1.11.2.min.js',
      'release/vendor/angular/angular-1-2.js',
      'release/vendor/bootstrap/js/bootstrap.min.js'
    ],
    css: [
      'release/vendor/bootstrap/css/bootstrap.min.css'
    ],
    assets: [
    ]
  },
};
