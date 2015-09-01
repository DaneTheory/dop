module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        copy: {
            main: { 
                files: [{
                    src: 'src/util/stringify.js',
                    dest: '../browser/src/util/stringify.js',
                },{
                    src: 'src/util/parse.js',
                    dest: '../browser/src/util/parse.js',
                },{
                    src: 'src/util/typeof.js',
                    dest: '../browser/src/util/typeof.js',
                },{
                    src: 'src/util/promise.js',
                    dest: '../browser/src/util/promise.js',
                },{
                    src: 'src/util/path.js',
                    dest: '../browser/src/util/path.js',
                },{
                    src: 'src/util/merge.js',
                    dest: '../browser/src/util/merge.js',
                },{
                    src: 'src/core/protocol.js',
                    dest: '../browser/src/core/protocol.js',
                },{
                    src: 'src/core/errorserver.js',
                    dest: '../browser/src/core/errorserver.js',
                },{
                    src: 'src/core/on.js',
                    dest: '../browser/src/core/on.js',
                },{
                    src: 'src/core/observe.js',
                    dest: '../browser/src/core/observe.js',
                },{
                    src: 'src/create/observe.js',
                    dest: '../browser/src/create/observe.js',
                },{
                    src: 'src/create/request.js',
                    dest: '../browser/src/create/request.js',
                }],
            }
        },

        // symlink: {
        //     expanded: {
        //         files: [{
        //             src: 'src/core/protocol.js',
        //             dest: '../browser/src/core/protocol.js'
        //         }, {
        //             src: 'src/util/typeof.js',
        //             dest: '../browser/src/core/typeof.js'
        //         }],
        //     }
        // },


        concat: {
            options: {
                process: function(src, filepath) {
                    return '\n\n\n\n//////////  ' + filepath + '\n' + src;
                }
            },
            dist: {
                src: [
                    'src/syncio.js',
                    'src/core/*',
                    'src/create/*',
                    'src/util/*',
                    'src/connector/*'
                ],
                dest: 'lib/<%= pkg.name %>.js'
            }
        }
    });



    // grunt.loadNpmTasks('grunt-contrib-symlink');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');

    //grunt.registerTask('default', ['symlink', 'concat', 'uglify', 'jshint', 'watch']);
    grunt.registerTask('default', ['copy','concat']);



};
