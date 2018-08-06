let $location,
  LocationMode,
  initialUrl,
  appBase,
  hashPrefix = '';

let appBaseNoFile;

let result = {};

appBase = 'http://localhost:8080/';
appBaseNoFile = Url.stripFile(appBase);
initialUrl = 'http://localhost:8080/a/b?c=1#/hello/1/2?a=1&b=2';
$location = new LocationHtml5Url(appBase, appBaseNoFile, '#' + hashPrefix);
$location.$$parseLinkUrl(initialUrl, initialUrl);
result.h5 = {
  path: $location.path(),
  params: $location.search(),
  hash: $location.hash(),
};

initialUrl = 'http://localhost:8080/a/b?c=1#/hello/1/2?a=1&b=2';
$location = new LocationHashbangInHtml5Url(appBase, appBaseNoFile, '#' + hashPrefix);
$location.$$parseLinkUrl(initialUrl, initialUrl);
result.h5hash = {
  path: $location.path(),
  params: $location.search(),
  hash: $location.hash(),
};

initialUrl = 'http://localhost:8080/#/hello/1/2?a=1&b=2';
$location = new LocationHashbangUrl(appBase, appBaseNoFile, '#' + hashPrefix);
$location.$$parseLinkUrl(initialUrl, initialUrl);
result.hash = {
  path: $location.path(),
  params: $location.search(),
  hash: $location.hash(),
};

let href = 'http://localhost:8080/c/d.html?e=1#/hello/1/2?a=1&b=2';

let _baseUrl = Url.getBaseUrl();
let _baseHref = Url.baseHref(href);
let _serverBase = Url.serverBase(href);
let _stripHash = Url.stripHash(href);
let _stripFile = Url.stripFile(href);
