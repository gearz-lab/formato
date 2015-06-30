var gulp = require('gulp');
var rimraf = require('rimraf-promise');
var exec = require('child-process-promise').exec;

gulp.task('build-lib', function () {
    return rimraf('./lib')
        .then(function (error) {
            var babelCli = 'babel --optional es7.objectRestSpread ./src --out-dir ./lib';
            return exec(babelCli).fail(function (error) {
                console.log(colors.red(error));
            });
        });
});

gulp.task('build-dist', function () {
    return rimraf('./dist').then(function (error) {
        var webpackCli = 'webpack';
        return exec(webpackCli).fail(function (error) {
            console.log(error);
        });
    });
});

gulp.task('default', ['build-lib', 'build-dist']);