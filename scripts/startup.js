'use strict';

var connect = require('connect'),
  http = require('http'),
  path = require('path'),
  fs = require('fs'),
  util = require('util'),
  methodOverride = require('method-override'),
  morgan = require('morgan'),
  favicon = require('serve-favicon'),
  compress = require('compression'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  cookieSession = require('cookie-session'),
  express = require('express'),
  exphbs = require('express-handlebars'),
  serveStatic = require('serve-static'),
  errorHandler = require('errorhandler'),
  getopts = require('getopts'),
  httpProxy = require('http-proxy-middleware'),
  rfs = require('rotating-file-stream'),
  chalk = require('chalk'),
  Properties = require('./utils/Properties'),
  Json = require('./utils/Json');

var cwd = process.cwd();
var rootPath = path.join(path.dirname(__filename), '../');
var packageConfig = path.join(rootPath, 'package.json');

if (!fs.existsSync(packageConfig)) {
  console.log(chalk.red('Not found package.json .'));
  process.exit(1);
}

var props = Properties.load();

var settings = Json(path.relative(cwd, packageConfig));

debugger;
util._extend(settings, props);

var target = process.NODE_ENV || 'development';

var argvs = getopts(process.argv.slice(2));

var ip = argvs.ip;
var port = argvs.port;
var domain = argvs.domain;

if (ip) {
  settings.ip = ip;
}
if (port) {
  settings.port = port;
  settings.PORT = port;
}
if (domain) {
  settings.domain = domain;
}
settings.target = target;

/**
 * create an express server
 */
var app = express();

app.set('ip', settings.ip || '127.0.0.1');
app.set('port', settings.port || settings.PORT || '8080');
app.set('domain', settings.domain || 'localhost');

/**
 * compress
 */
app.use(compress());

/**
 * error handler
 */
if (settings.debug || settings.DEBUG) {
  app.use(errorHandler());
}

/**
 * morgan
 */
if (settings.debug || settings.DEBUG) {
  app.use(
    morgan('dev', {
      stream: fs.createWriteStream(path.join(__dirname, 'access.log'), {
        flags: 'a',
      }),
    }),
  );
} else {
  var logDirectory = path.join(__dirname, 'logs');

  // ensure log directory exists
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

  // setup the logger
  app.use(
    morgan('common', {
      stream: rfs('access.log', {
        interval: '7d', // rotate daily
        path: logDirectory,
      }),
    }),
  );
}

/**
 * views
 */
app.set('views', __dirname);

/**
 * view engine: express-handlebars
 */
app.engine(
  'html',
  exphbs({
    extname: '.html',
  }),
);
app.set('view engine', 'html');

/**
 * May not need to use favicon if using nginx for serving
 * static assets. Just comment it out below.
 */
app.use(favicon(path.join(__dirname, '../build/favicon.ico')));

/**
 * May not need to use serveStatic if using nginx for serving
 * static assets. Just comment it out below.
 */
app.use('/favicon.ico', serveStatic(path.join(__dirname, '../build/favicon.ico')));
app.use('/manifest.json', serveStatic(path.join(__dirname, '../build/manifest.json')));
app.use('/static', serveStatic(path.join(__dirname, '../build/static')));

/**
 * cookie parser, cookie session
 */
app.use(cookieParser('your secret here'));
app.use(
  cookieSession({
    name: 'surface-session',
    keys: ['open', 'source'],
  }),
);

app.get('/', function(req, res) {
  return res.render('../build/index', settings);
});

/**
 *  Allow-Origin
 */
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
  );
  next();
});

/**
 * body parser
 */
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());

/**
 * method override
 */
app.use(methodOverride());

var args = [app],
  ssl = null;

if (settings.HTTPS) {
  http = require('spdy');
  ssl = {
    key: fs.readFileSync(plugin.https.key, 'utf8'),
    cert: fs.readFileSync(plugin.https.cert, 'utf8'),
  };
  args.unshift(ssl);
}

for (var url in settings.proxy) {
  var proxy = settings.proxy[url];
  /**
   *  http-proxy
   */
  app.use(
    httpProxy(url, {
      target: proxy.target,
      changeOrigin: proxy.changeOrigin,
      proxyTimeout: proxy.proxyTimeout,
      ssl: proxy.ssl,
      ws: proxy.ws,
      onProxyReq: function(proxyReq, req, res) {
        if (proxy.key && proxy.token) {
          proxyReq.setHeader(proxy.key, proxy.token);
        }
      },
    }),
  );
}

http.createServer.apply(http, args).listen(app.get('port'), function createServerCb() {
  console.log(chalk.green(`Express server listening on port ${app.get('port')}`));
  console.log(
    chalk.green(`\nhttp${args.length >= 2 ? 's' : ''}://${app.get('domain')}:${app.get('port')}\n`),
  );
});
