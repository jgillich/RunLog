module.exports = function (grunt) {

    grunt.config.init({
        browserify: {
            app: {
                files: {
                    'build/app.js': ['lib/app.js']
                },
                options: {
                    bundleOptions: {
                        debug: true
                    },
                    transform: ['es6ify']
                }
            }
        },
        watch: {
            lib: {
                files: ['lib/**/*.js'],
                tasks: ['browserify:app'],
                options: {
                    livereload: true
                }
            }
        },

        rework: {
            app: {
                files: {
                    'build/app.css': 'app.css'
                },
                options: {
                    use: [
                        require('rework-import')(),
                        require('myth')(),
                        require('rework-plugin-url')(function (url) {
                            return url.replace('../fonts/ratchicons', './fonts/ratchicons');
                        })
                    ]
                }
            }
        },

        copy: {
            index: {
                files: {
                    'build/index.html': 'index.html'
                }
            },
            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: 'vendor/ratchet/fonts/',
                        src: '*',
                        dest: 'build/fonts/'
                    }
                ]
            }
        },

        clean: {
            build: ['build/'],
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-rework');

    grunt.registerTask('build', ['clean:build', 'browserify:app', 'rework:app', 'copy:index', 'copy:fonts']);
    grunt.registerTask('dev', ['build', 'watch']);

};
