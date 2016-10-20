var path = require('path');

module.exports = function(grunt) {

    /**
     * Load in our build configuration file.
     */
    var userConfig = require('./config.js');

    var taskConfig = {
        pkg: grunt.file.readJSON('package.json'),
        //		mkdir_build : grunt.file.mkdir('release/build'),
        copy: {
            templates: {
                files: [{
                    expand: true,
                    cwd: 'dev/app',
                    src: ['*.html'],
                    dest: 'release/app'
                }]
            }
        },
        jshint: {
            appPreConcat: ['dev/js/*.js'],
            appPostConcat: ['release/js/script.js'],
        },
        concat: {
            options: {
                separator: '\n\n'
            },
            script: {
                src: ['dev/js/*.js'],
                dest: 'release/js/script.js'
            }
        },
        uglify: {
            script: {
                options: {
                    sourceMap: 'release/js/script.min.js.map'
                },
                files: {
                    'release/js/script.min.js': ['release/js/script.js']
                }
            }
        },
        less: {
            production: {
                options: {
                    paths: ['dev/less'],
                    cleancss: true,
                    sourceMap: true,
                    sourceMapRootpath: 'release/css',
                    sourceMapURL: 'style.min.css.map',
                    sourceMapFilename: 'release/css/style.min.css.map'
                },
                files: {
                    'release/css/style.css': 'dev/less/style.less'
                }
            }
        },
        cssmin: {
            options: {
                advanced: false,
                shorthandCompacting: false,
                agressiveMergin: false,
                compatibility: 'ie8',
                sourceMap: true
            },
            compress: {
                files: {
                    'release/css/style.min.css': ['release/css/style.css']
                }
            }
        },
        express: {
            all: {
                options: {
                    port: 8001,
                    hostname: "0.0.0.0",
                    bases: ['release'],
                    server: path.resolve('./server/main'),
                    livereload: true,
                    open: true
                }
            }
        },
        index: {
            build: {
                dir: 'release',
                src: [
                    '<%= vendor_files.js %>',
                    'release/js/script.js',
                    '<%= vendor_files.css %>',
                    'release/css/style.min.css'
                ]
            }
        },
        watch: {
            scripts: {
                files: ['dev/js/*.js'],
                tasks: ['newer:copy', 'newer:jshint', 'newer:concat', 'newer:uglify', 'index:build'],
                options: {
                    spawn: false,
                }
            },
            templates: {
                files: ['dev/app/*.html'],
                tasks: ['copy:templates'],
                options: {
                    spawn: false,
                }
            },
            css: {
                files: ['dev/less/**/*.less'],
                tasks: ['less', 'newer:cssmin', 'index:build'],
                options: {
                    spawn: false,
                }
            }
        }
    };

    //Grunt task configurations.
    grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

    grunt.log.writeln("Angular Modules:");

    grunt.registerTask('default', ['express', 'watch']);
    grunt.registerTask('csstask', ['less', 'cssmin']);
    grunt.registerTask('build', ['copy', 'jshint', 'concat', 'uglify', 'less', 'cssmin', 'index:build']);

    /**
     * The index.html template includes the stylesheet and javascript sources
     * based on dynamic names calculated in this Gruntfile. This task assembles
     * the list into variables for the template to use and then runs the
     * compilation.
     */
    grunt.registerMultiTask('index', 'Process index.html template', function() {

        var filesToImport = this.filesSrc.map(function(file) {
            return file.replace('release/', '../');
        });

        var htmlFiles = grunt.file.expand(['release/pages/*.html']);

        var task = this;

        grunt.util.recurse(htmlFiles, function(htmlFile) {

            grunt.file.copy(htmlFile, htmlFile, {
                process: function(contents, path) {
                    return grunt.template.process(contents, {
                        data: {
                            scripts: filesToImport.filter(function(file) {
                                return file.match(/\.js$/);
                            }),
                            styles: filesToImport.filter(function(file) {
                                return file.match(/\.css$/);
                            })
                        }
                    });
                }
            });
        });
    });
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-newer');
};