const path = require('path');
const isDev = think.env === 'development';
const jwt = require('koa-jwt');

module.exports = [
  {
    handle: 'meta',
    options: {
      logRequest: isDev,
      sendResponseTime: isDev
    }
  },
  {
    handle: 'resource',
    enable: true,
    options: {
      root: path.join(think.ROOT_PATH, 'www'),
      publicPath: /^\/(static|favicon\.ico)/
    }
  },
  {
    handle: 'trace',
    enable: !think.isCli,
    options: {
      debug: isDev
    }
  },
  {
    handle: 'payload',
    options: {
      keepExtensions: true,
      limit: '5mb'
    }
  },
  {
    handle: 'router',
    options: {}
  },
  {
	handle: jwt,
	options: {
		sercet:think.config('jwt')['secret'],
		cookie:think.config('jwt')['cookie'],
		passthrough:true
	}  
  },
  'logic',
  'controller'
];
