"use strict";
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt){


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bwr: grunt.file.readJSON('bower.json'),

        clean: {
            build: {
                src: ['dist']
            }
        },


        less: {
            dev: {
                files: {
                    'app/css/<%= pkg.name %>.css': 'app/css/less/bootstrap.less'
                }
            },
            prod: {
                files: {
                    'app/css/<%= pkg.name %>.css': 'app/css/less/bootstrap.less'
                }
            }
        },
        watch: {

            less: {
                files: ['<%= bwr.appPath %>/css/less/{,*/}*.less'],
                tasks: ['less']
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= bwr.appPath %>/{,*/}*.html',
                    '<%= bwr.appPath %>/js/{,*/}*.js',
                    '<%= bwr.appPath %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        connect: {
            options: {
                port: '8080',
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function(connect){
                        return [
                            lrSnippet,
                            mountFolder(connect, "app")
                        ]
                    }
                }
            },
            server: {
                options: {
                    base: '<%= bwr.appPath %>',
                    open: true,
                    keepalive: true
                }
            },
            dist: {
                options: {
                    base: '<%= bwr.distPath %>',
                    open: 'http://localhost:<%= connect.options.port %>/',
                    keepalive: true
                }
            }
        },

        open: {
            server: {
                url: 'http://localhost:<%= connect.options.port %>'
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= bwr.appPath %>',
                    dest: '<%= bwr.distPath %>',
                    src: [
                        'img/**/*.{gif,webp,png,jpg,jpeg}',
                        'css/*.css',
                        'js/*.js',
                        '*.html'
                    ]
                }]
            },
            distFull:{
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= bwr.appPath %>',
                    dest: '<%= bwr.distPath %>',
                    src: [
                        'img/**/*.{gif,webp,png,jpg,jpeg}',
                        'css/*.css',
                        'js/*.js',
                        '*.html'
                    ]
                }]
            }
        },
        useminPrepare: {
            html: '<%= bwr.appPath %>/index.html',
            options: {
                dest: 'dist'
            }

        }

    });


    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-open');


    grunt.registerTask('server', function(target){

        if (target === 'dist') {
            return grunt.task.run(['build:dist', 'connect:dist']);
        } else if (target === 'distFull') {
            return grunt.task.run(['build:distFull', 'connect:dist'])
        }

        grunt.task.run([
            'connect:livereload',
            'open',
            'watch'

        ]);

    });

    grunt.registerTask('build', function(target){
        if (target === 'distFull') {
            console.log("build:distFull");
            return grunt.task.run(['clean', 'less', 'copy:distFull']);
        }

        console.log("build:dist");

        grunt.task.run([
            'clean',
            'less',
            'useminPrepare',
            //'concat',
            'copy:dist',
            //'htmlmin',
            //'cdnify',
            //'ngmin',
            //'cssmin',
            //'rev',
            //'usemin',
            //'uglify'
        ]);
    });

};