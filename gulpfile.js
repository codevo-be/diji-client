const path = require('path')
const gulp = require('gulp')
const svgSprite = require('gulp-svg-sprite')

// Generate sprite
gulp.task('generateSprite', () => {
    return gulp
        .src(path.join(__dirname, 'src/icons/*.svg'))
        .pipe(
            svgSprite({
                mode: {
                    symbol: {
                        dest: '.',
                        sprite: 'sprite.svg',
                        example: false
                    }
                },
                shape: {
                    transform: [
                        {
                            svgo: {
                                plugins: [
                                    { name: 'removeDoctype', active: true },
                                    { name: 'removeComments', active: true },
                                    { name: 'removeMetadata', active: true },
                                    { name: 'removeTitle', active: true },
                                    { name: 'removeDesc', active: true },
                                    { name: 'removeUselessDefs', active: true },
                                    { name: 'removeXMLNS', active: true },
                                    { name: 'removeAttrs', params: { attrs: '(stroke|fill)' } },
                                    { name: 'removeViewBox', active: false }
                                ]
                            }
                        }
                    ]
                }
            })
        )
        .pipe(gulp.dest('public'))
})
