var fs = require('fs')
var util = require('util')
var assert = require('assert')
var Json = require('./json')
var Path = require('path')

//config json file base path
var base = ''

/**
config('myconfig')
config('myconfig.json')
config({base: '/home/user/xxx'})
config({base: '/home/user/xxx'})('myconfig')
*/
var config = function(...args) {
  if(util.isString(arguments[0])) {
    return conf({
      path:arguments[0]
    })
  }else if(args.length==1) {
    return conf(Object.assign({}, args[0]))
  }else {
    assert.ok(false, 'arguments area incorrect.')
  }
}


function conf(args) {
  assert.isObject(args)

  //TODO cache

  if(util.isString(args.base)) {
    base = Path.fullpath(args.base.trim())
    var st = fs.stat(base)
    return config;
  }

  var path = util.isString(args.path)?args.path.trim():''
  assert.greaterThan(path.length, 0, 'config file path error: ['+args.path+']')

  if(!path.match(/.+\.json$/i)) {
    path += '.json'
  }
  path = Path.normalize(path)

  //linux or window absolute path
  if(base) {
      path = Path.normalize(base) + Path.sep + path
  }

  //console.debug('config path:', path);
  var st = fs.stat(path)
  if(st && st.isFile()) {
    var buff = fs.readFile(path)
    if(buff) {
      var str = buff.toString('UTF-8')
      if(str && str.length>1) {
        return JSON.parse(Json.minify(str))
      }
    }
    assert.ok(false, "config file error: ["+path+"]")
  }
  assert.ok(false, "config path isn't a file: ["+path+"]")
  
  //TODO callback and update when config file changed
}

module.exports = config
