/**
 * 模块注释：
 * 这里用来设置各种缓存，eg：语言包，所有仓库，字典数据；
 * 然后再读取各种缓存数据，转换成json格式
 */
import API from '@/utils/api';

export const lang = localStorage.lang.split('-')[0];
export const renderTime = (date) => {
  var dateee = new Date(date).toJSON();
  return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}

// 设置缓存所有字典数据，初次就要加载
export const set_DICT = () => {
  let DICT = sessionStorage.getItem(`FPX.IRF.DICT_${lang}`);
  if (!DICT) {
    API.getDictionary().then(res => {
      sessionStorage.setItem(`FPX.IRF.DICT_${lang}`, JSON.stringify(res));
    });
  }
}

export const get_DICT = () => {
  let pack: any = sessionStorage.getItem(`FPX.IRF.DICT_${lang}`);
  return JSON.parse(pack);
}

/**
 * 读取字典数据
 * 提供类型，根据code读取对应的name
 * @param type 
 * @param code 
 */
export const convertDictByCode = (type, code) => {
  let json_pack = get_DICT();
  if (!json_pack) {
    return ''
  } else {
    let item = json_pack[type].filter(val => val.code === code);
    return item[0].name;
  }
}

/**
 * 读取字典数据
 * 提供类型，根据type获取对应的数组
 * @param type 
 */
export const convertDictByType = type => {
  let json_pack = get_DICT();
  if (!json_pack) {
    return [];
  } else {
    return json_pack[type];
  }
}

// 设置缓存所有仓库，初次就要加载
export const set_WH_ALL = () => {
  let WH_ALL = sessionStorage.getItem(`ORIGIN.FPX.IRF.WH_${lang}_ALL`);
  if (!WH_ALL) {
    API.getWHAll().then(res => {
      sessionStorage.setItem(`ORIGIN.FPX.IRF.WH_${lang}_ALL`, JSON.stringify(res));
    })
  }
}

// 从缓存中获取所有仓库
export const get_WH_ALL = () => {
  let WH_ALL = sessionStorage.getItem(`ORIGIN.FPX.IRF.WH_${lang}_ALL`);
  if (WH_ALL) {
    let treeData = [{
      label: 'All',
      value: ' ',
      disabled: true,
      selectable: false,
      children: []
    }];
    let temp: any = [];
    let wh = JSON.parse(WH_ALL);
    for (let i = 0; i < wh.length; i++) {
      let item = wh[i];
      item.label = item.name;
      item.value = item.code;
      item.sortnum = item.sortNum;
      delete item.sortNum;
      if (item.warehouses && item.warehouses.length) {
        item.children = [];
        for (let j = 0; j < item.warehouses.length; j++) {
          let val = item.warehouses[j];
          val.label = val.name;
          val.value = val.code;
          val.countrycode = val.countryCode;
          delete val.countryCode;
          item.children.push(val);
        }
      }
      temp.push(item);
    }
    treeData[0].children = temp;
    return treeData;
  } else {
    return []
  }
}

/**
 * 接口获取语言包，然后解析成{key:value}数据结构
 */
export const set_LANG_PACK = () => {
  let settings = {
    async: false,
    cache: true,
    callback: null,
    debug: false,
    encoding: "UTF-8",
    language: lang,
    mode: "map",
    name: "messages",
    namespace: null,
    path: "/i18n/"
  }

  API.getLang().then(res => {
    if (res) {
      let data = parseData(res, settings);
      sessionStorage.setItem(`LANG_PACK_${lang}`, JSON.stringify(data));
      return data;
    } else {
      return []
    }
  });
}

// 从缓存中读取语言包
export const get_LANG_PACK = () => {
  let pack: any = sessionStorage.getItem(`LANG_PACK_${lang}`);
  return JSON.parse(pack);
}

export const parseData = (data, settings) => {
  var lines = data.split(/\n/);
  var regPlaceHolder = /(\{\d+})/g;
  var regRepPlaceHolder = /\{(\d+)}/g;
  var unicodeRE = /(\\u.{4})/gi;
  var lang = {}
  for (var i = 0, j = lines.length; i < j; i++) {
    var line = lines[i];

    line = line.trim();
    if (line.length > 0 && line.match('^#') != '#') {
      // skip comments
      var pair = line.split('=');
      if (pair.length > 0) {
        /** Process key & value */
        var name = decodeURI(pair[0]).trim();
        var value = pair.length == 1 ? '' : pair[1];
        // process multi-line values
        while (value.search(/\\$/) != -1) {
          value = value.substring(0, value.length - 1);
          value += lines[++i].trimRight();
        }
        // Put values with embedded '='s back together
        for (var s = 2; s < pair.length; s++) {
          value += '=' + pair[s];
        }
        value = value.trim();

        /** Mode: bundle keys in a map */
        if (settings.mode == 'map' || settings.mode == 'both') {
          // handle unicode chars possibly left out
          var unicodeMatches = value.match(unicodeRE);
          if (unicodeMatches) {
            unicodeMatches.forEach(function (match) {
              value = value.replace(match, unescapeUnicode(match));
            });
          }
          // add to map
          // if (settings.namespace) {
          //   $.i18n.map[settings.namespace][name] = value;
          // } else {
          //   $.i18n.map[name] = value;
          // }
          lang[name] = value;
        }

        /** Mode: bundle keys as vars/functions */
        if (settings.mode == 'vars' || settings.mode == 'both') {
          value = value.replace(/"/g, '\\"'); // escape quotation mark (")

          // make sure namespaced key exists (eg, 'some.key')
          checkKeyNamespace(name);

          // value with variable substitutions
          if (regPlaceHolder.test(value)) {
            var parts = value.split(regPlaceHolder);
            // process function args
            var first = true;
            var fnArgs = '';
            var usedArgs = [];
            parts.forEach(function (part) {
              if (regPlaceHolder.test(part) && (usedArgs.length === 0 || usedArgs.indexOf(part) == -1)) {
                if (!first) {
                  fnArgs += ',';
                }
                fnArgs += part.replace(regRepPlaceHolder, 'v$1');
                usedArgs.push(part);
                first = false;
              }
            });
            parsed += name + '=function(' + fnArgs + '){';
            // process function body
            var fnExpr = '"' + value.replace(regRepPlaceHolder, '"+v$1+"') + '"';
            parsed += 'return ' + fnExpr + ';' + '};';
            // simple value
          } else {
            parsed += name + '="' + value + '";';
          }
        } // END: Mode: bundle keys as vars/functions
      } // END: if(pair.length > 0)
    } // END: skip comments
  }
  return lang;
}

export const checkKeyNamespace = (key) => {
  var regDot = /\./;
  if (regDot.test(key)) {
    var fullname = '';
    var names = key.split(/\./);
    for (var i = 0, j = names.length; i < j; i++) {
      var name = names[i];
      if (i > 0) {
        fullname += '.';
      }
      fullname += name;
      if (eval('typeof ' + fullname + ' == "undefined"')) {
        eval(fullname + '={};');
      }
    }
  }
}

export const unescapeUnicode = (str) => {
  // unescape unicode codes
  var codes: number[] = [];
  var code = parseInt(str.substr(2), 16);
  if (code >= 0 && code < Math.pow(2, 16)) {
    codes.push(code);
  }
  // convert codes to text
  return codes.reduce(function (acc, val) {
    return acc + String.fromCharCode(val);
  }, '');
}
