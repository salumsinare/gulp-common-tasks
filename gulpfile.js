var gulp=require('gulp');
var sass=require('gulp-sass');
var uglify=require('gulp-uglify');
var concat=require('gulp-concat');
var changed=require('gulp-changed');
var imagemin=require('gulp-imagemin');
var cleanCss=require('gulp-clean-css');
var autoprefixer=require('autoprefixer');
var postcss=require('gulp-postcss');
var rename=require('gulp-rename');
var typescript = require('gulp-typescript');

var assets_src='assets/src';
var assets_des='assets/dist';

var styles_src=assets_src+'/scss';
var styles_des=assets_des+'/css';
var styles_output_name='styles.min.css';

var scripts_src=assets_src+'/ts';
var scripts_des=assets_des+'/js';
var scripts_output_name='scripts.min.js';

var images_src=assets_src+'/images';
var images_des=assets_des+'/images';


gulp.task('scripts',()=>{
  return gulp.src(scripts_src+'/*.ts')
         .pipe(changed(scripts_des))
         .pipe(concat('scripts.ts'))
         .pipe(typescript({out:scripts_output_name}))
         .pipe(uglify())
         .pipe(gulp.dest(scripts_des));
});

gulp.task('styles',()=>{          
  return gulp.src([styles_src+'/*.scss',styles_src+'/!_*.scss'])
         .pipe(changed(styles_des))
         .pipe(concat('styles.scss'))
         .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
         .pipe(postcss([autoprefixer()]))
         .pipe(cleanCss())
         .pipe(rename(styles_output_name))
         .pipe(gulp.dest(styles_des));
});


gulp.task('imageCompress',()=>{
   return gulp.src(images_src+'/*')
          .pipe(changed(images_des))
          .pipe(imagemin())
          .pipe(gulp.dest(images_des));
});

gulp.task('default',['styles','scripts','imageCompress'],()=> {
    gulp.watch(images_src+'/*',['imageCompress']);
    gulp.watch(styles_src+'/*',['styles']);
    gulp.watch(scripts_src+'/*',['scripts']);
});