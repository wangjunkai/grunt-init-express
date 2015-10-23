'use strict';

module.exports = function (grunt) {

    grunt.initConfig({

        //读取package.json
        pkg: grunt.file.readJSON('package.json'),

        //合并js文件
        concat: {
            options: {
                //合并的文件之间用；分割
                separator: ';'
            },
            dist: {
                //指定合并的文件和生成文件的位置
                src: ['cms/javascripts/*.js'/*,1.js,2.js*/],
                dest: 'cms/javascripts/dist/<%= pkg.name %>.js'
            }
        },

        //压缩js文件
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'cms/javascripts/dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },

        //测试运行
        qunit: {
            files: ['cms/javascripts/*.js']
        },

        //提高代码质量
        jshint: {
            files: ['Gruntfile.js', 'cms/javascripts/*.js'],
            options: {
                //这里是覆盖JSHint默认配置的选项
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },

        //监控执行
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'qunit']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('test', ['jshint', 'qunit']);

    grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

};
