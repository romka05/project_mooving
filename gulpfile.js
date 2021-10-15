let gulp = require("gulp"),
  sass = require("gulp-sass")(require("sass")),
  rename = require("gulp-rename"),
  browserSync = require("browser-sync"),
  autoprefixer = require("gulp-autoprefixer"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify"),
  cssmin = require("gulp-cssmin"),
  del = require("del");

// удаление папки dist
gulp.task("clean", async function () {
  del.sync("dist");
});

// препроцессор конвертирует код в обычный css и минифицированый
gulp.task("sass", function () {
  return (
    gulp
      .src("app/scss/style.scss")
      .pipe(sass({ outputStyle: "expanded" }))
      .pipe(autoprefixer({ overrideBrowserslist: ["last 15 version"] }))
      .pipe(gulp.dest("app/css"))
      .pipe(browserSync.reload({ stream: true })),
    gulp
      .src("app/scss/style.scss")
      .pipe(sass({ outputStyle: "compressed" }))
      .pipe(rename({ suffix: ".min" }))
      .pipe(autoprefixer({ overrideBrowserslist: ["last 15 version"] }))
      .pipe(gulp.dest("app/css"))
      .pipe(browserSync.reload({ stream: true }))
  );
});

// обьеднияем выкачаные библиотеки css в nodemodules в один файл
gulp.task("style", function () {
  return gulp
    .src([
      "node_modules/normalize.css/normalize.css",
      "node_modules/slick-carousel/slick/slick.css",
      "node_modules/wow.js/css/libs/animate.css",
      "app/css/jquery.rateyo.css",
    ])
    .pipe(concat("libs.min.css"))
    .pipe(cssmin())
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.reload({ stream: true }));
});

// обьеднияем выкачаные библиотеки js в nodemodules в один файл
gulp.task("script", function () {
  return (
    gulp
      .src([
        "node_modules/slick-carousel/slick/slick.js",
        "node_modules/wow.js/dist/wow.js",
        "app/js/jquery.rateyo.js",
      ])
      .pipe(concat("libs.min.js"))
      .pipe(uglify())
      .pipe(gulp.dest("app/js"))
      .pipe(browserSync.reload({ stream: true })),
    gulp
      .src(["app/js/main.js"])
      .pipe(uglify())
      .pipe(rename({ suffix: ".min" }))
      .pipe(gulp.dest("app/js"))
      .pipe(browserSync.reload({ stream: true }))
  );
});

// обновление браузерсинком файлов html и js
gulp.task("html", function () {
  return gulp.src("app/*.html").pipe(browserSync.reload({ stream: true }));
});
gulp.task("js", function () {
  return gulp.src("app/js/*.js").pipe(browserSync.reload({ stream: true }));
});

// браузерсинк следит за изменениями в папке app и обновляет
gulp.task("browser-sync", function () {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
  });
});

//  таск на экспортировку файлов в dist папку
gulp.task("export", function () {
  let buildHtml = gulp.src("app/**/*.html").pipe(gulp.dest("dist"));

  let BuildCss = gulp.src("app/css/**/*.min.css").pipe(gulp.dest("dist/css"));

  let BuildJs = gulp.src("app/js/**/*.js").pipe(gulp.dest("dist/js"));

  let BuildFonts = gulp.src("app/fonts/**/*.*").pipe(gulp.dest("dist/fonts"));

  let BuildImg = gulp.src("app/img/**/*.*").pipe(gulp.dest("dist/img"));
});

// наблюдения за инзмениями
gulp.task("watch", function () {
  gulp.watch("app/scss/**/*.scss", gulp.parallel("sass"));
  gulp.watch("app/*.html", gulp.parallel("html"));
  gulp.watch("app/js/**/*.js", gulp.parallel("js"));
});

// запуск по дефолту паралелей тасков: препроцессор потом слежка за обновлением потом обновление браузерсинком
gulp.task(
  "default",
  gulp.parallel("style", "script", "sass", "watch", "browser-sync")
);

// экспорт финал файлов  build
gulp.task("build", gulp.series("clean", "export"));
