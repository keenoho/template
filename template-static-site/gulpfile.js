const fs = require('fs');
const path = require('path');
const glob = require('glob');
const { parallel, series, watch, src, dest } = require('gulp');
const gulpAutoprefixer = require('gulp-autoprefixer');
const gulpLess = require('gulp-less');
const gulpClean = require('gulp-clean');
const gulpBabel = require('gulp-babel');
const glupRename = require('gulp-rename');
const gulpCssMin = require('gulp-cssmin');
const gulpPx2rem = require('gulp-px2rem');
const gulpUglify = require('gulp-uglify');
const gulpEjs = require('gulp-ejs');
const through = require('through2');

const env = process.env.NODE_ENV || 'production';
const configFilePath = env === 'production' ? 'config.json' : `config.${env}.json`;
const configJson = require('./' + configFilePath);
const globalJson = (configJson.globalData && require('./data/' + configJson.globalData)) || {};
const { output } = configJson;

function readJsonFile(filePath) {
  const str = fs.readFileSync(filePath, {
    encoding: 'utf-8',
  });
  return JSON.parse(str);
}

function processTemplateDataAndDest(file) {
  const filePath = file.path;
  const targetPage = configJson.pages.find((p) => {
    return filePath.indexOf(p.path) > -1;
  });

  if (!targetPage) {
    return;
  }
  const targetPageJsonPath = path.resolve(__dirname, 'data', targetPage.data || '').replace(/(\\)+/g, '/');
  const matchPaths = glob.sync(targetPageJsonPath);
  if (!matchPaths || !matchPaths.length) {
    return;
  }

  const subData = [];
  if (targetPage.subData) {
    const subDataJsonPath = path.resolve(__dirname, 'data', targetPage.subData || '').replace(/(\\)+/g, '/');
    const subDataMatchPaths = glob.sync(subDataJsonPath);
    if (subDataMatchPaths && subDataMatchPaths.length) {
      for (let p of subDataMatchPaths) {
        const dataJson = readJsonFile(p);
        const id = path.basename(p).replace(path.extname(p), '');
        const splitStr = p.split('/');
        const dirName = splitStr[splitStr.length - 2];
        subData.push({
          _id: id,
          _dirName: dirName,
          ...dataJson,
        });
      }
    }
  }

  if (targetPage.type === 'normal') {
    const dataJson = readJsonFile(matchPaths[0]);
    return src(filePath)
      .pipe(
        gulpEjs({
          _: configJson,
          $global: globalJson,
          data: dataJson,
          subData,
        })
      )
      .pipe(
        glupRename({
          extname: '.html',
        })
      )
      .pipe(dest(output));
  } else if (targetPage.type === 'series') {
    for (let p of matchPaths) {
      const dataJson = readJsonFile(p);
      const id = path.basename(p).replace(path.extname(p), '');
      const splitStr = p.split('/');
      const dirName = splitStr[splitStr.length - 2];
      return src(filePath)
        .pipe(
          gulpEjs({
            _: configJson,
            $global: globalJson,
            data: dataJson,
            subData,
          })
        )
        .pipe(
          glupRename({
            basename: id,
            extname: '.html',
          })
        )
        .pipe(dest(output + '/' + dirName));
    }
    return;
  }
}

function gulpEjsTemplateDataPlugin() {
  const s = through.obj(function (file, encoding, cb) {
    if (file.isNull()) {
      cb(null, file);
    } else if (file.isBuffer() || file.isStream()) {
      cb(null, null);
      processTemplateDataAndDest(file);
    } else {
      cb(null, file);
    }
  });
  return s;
}

function html() {
  let data = {};
  return src(
    configJson.pages.map((p) => 'src/' + p.path),
    {
      allowEmpty: true,
    }
  ).pipe(gulpEjsTemplateDataPlugin());
}

function less() {
  return src('src/*.less')
    .pipe(gulpLess({}))
    .pipe(
      gulpPx2rem({
        rootValue: 100,
        exclude: /(node_modules)/i,
        selectorBlackList: ['html', 'body', 'keep-px'],
      })
    )
    .pipe(gulpAutoprefixer({}))
    .pipe(gulpCssMin())
    .pipe(
      glupRename({
        extname: '.css',
      })
    )
    .pipe(dest(output));
}

function js() {
  return src('src/*.js')
    .pipe(
      gulpBabel({
        presets: [
          [
            '@babel/preset-env',
            {
              targets: '> 2%, last 2 versions, ie >= 10, iOS >= 8, Android >= 4',
            },
          ],
        ],
      })
    )
    .pipe(gulpUglify())
    .pipe(dest(output));
}

function copy() {
  return src('public/**/*.*').pipe(dest(output));
}

function configFile() {
  return src(configFilePath)
    .pipe(
      glupRename({
        basename: 'config',
      })
    )
    .pipe(dest(output));
}

function clean() {
  return src(output + '/*', { read: false }).pipe(gulpClean({ force: true }));
}

function watchAll() {
  watch(['template/**/*.ejs', 'data/**/*.json', 'src/**/*.ejs'], html);
  watch(['src/**/*.less'], less);
  watch(['src/**/*.js'], js);
  watch(['public/**/*.*'], copy);
}

const complie = parallel(html, less, js, copy, configFile);
exports.dev = series(clean, complie, watchAll);
exports.build = series(clean, complie);
