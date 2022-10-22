import { ConfigIniParser } from "config-ini-parser"

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * 获取相对时间
 * @param {number|string|Date} time 
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  time = new Date(time);
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  // 距离现在相差的秒数
  const diff = (now - d.getTime()) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 30) {
    return Math.ceil(diff / (3600 * 24)) + '天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

export function isNullOrEmpty(val) {
  return val === null || val === undefined || val.trim() == '';
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * remove an element from the arr
 * @param arr a list that an element to be deleted
 * @param cb remove condition
 * @returns arr
 */
export function removeEle<T>(arr: T[], cb: (value: T, index: number, obj: T[]) => unknown) {
  var index = arr.findIndex(cb);
  if (index != -1) {
    arr.splice(index, 1);
  }

  return arr;
}

/**
 * update an element from the arr
 * @param arr a list that an element to be updated
 * @param value update value
 * @param cb update condition
 * @returns updated arr
 */
export function updateEle<T>(arr: T[], value: T, cb: (value: T, index: number, obj: T[]) => unknown) {
  var index = arr.findIndex(cb);
  if (index != -1) {
    if (typeof (value) === 'object') {
      arr[index] = { ...value };
    } else {
      arr[index] = value;
    }
  };
  arr.sort()
  return arr
}

// 以下来源form-generator/utils/index.js
/**
 * num 小于0，左缩进num*2个空格； 大于0，右缩进num*2个空格。
 * @param {string} str 代码
 * @param {number} num 缩进次数
 * @param {number} len 【可选】缩进单位，空格数
 */
export function indent(str, num, len = 2) {
  if (num === 0) return str
  const isLeft = num < 0; const result = []; let reg; let
    spaces = ''
  if (isLeft) {
    num *= -1
    reg = new RegExp(`(^\\s{0,${num * len}})`, 'g')
  } else {
    for (let i = 0; i < num * len; i++) spaces += ' '
  }

  str.split('\n').forEach(line => {
    line = isLeft ? line.replace(reg, '') : spaces + line
    result.push(line)
  })
  return result.join('\n')
}

// 首字母大小
export function titleCase(str) {
  return str.replace(/( |^)[a-z]/g, L => L.toUpperCase())
}

// 下划转驼峰
export function camelCase(str) {
  return str.replace(/-[a-z]/g, str1 => str1.substr(-1).toUpperCase())
}

export function isNumberStr(str) {
  return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(str)
}

function stringify(obj) {
  return JSON.stringify(obj, (key, val) => {
    if (typeof val === 'function') {
      return `${val}`
    }
    return val
  })
}

function parse(str) {
  JSON.parse(str, (k, v) => {
    if (v.indexOf && v.indexOf('function') > -1) {
      return eval(`(${v})`)
    }
    return v
  })
}

export function jsonClone(obj) {
  return parse(stringify(obj))
}

// 深拷贝对象
export function deepClone(obj) {
  const _toString = Object.prototype.toString

  // null, undefined, non-object, function
  if (!obj || typeof obj !== 'object') {
    return obj
  }

  // DOM Node
  if (obj.nodeType && 'cloneNode' in obj) {
    return obj.cloneNode(true)
  }

  // Date
  if (_toString.call(obj) === '[object Date]') {
    return new Date(obj.getTime())
  }

  // RegExp
  if (_toString.call(obj) === '[object RegExp]') {
    const flags = []
    if (obj.global) { flags.push('g') }
    if (obj.multiline) { flags.push('m') }
    if (obj.ignoreCase) { flags.push('i') }

    return new RegExp(obj.source, flags.join(''))
  }

  const result = Array.isArray(obj) ? [] : obj.constructor ? new obj.constructor() : {}

  for (const key in obj) {
    result[key] = deepClone(obj[key])
  }

  return result
}

/**
 * 将对象转为ini配置字符串
 */
export function Obj2INIString(obj: object): string {
  console.log(obj)
  // true false 会转为 0 1
  let parserConfigValue = (value: any) => {
    if (typeof value === 'boolean') {
      value = value ? 1 : 0
    } else if (value === null) {
      value = ''
    }
    return value;
  }


  let configParser = new ConfigIniParser('\r\n');
  for (const key in obj) {
    let value = obj[key];
    if (typeof value === 'object' && value !== null) {
      configParser.addSection(key);
      for (const subKey in value) {
        configParser.set(key, subKey, parserConfigValue(value[subKey]));
      }
    } else {
      configParser.set(null, key, parserConfigValue(obj[key]));
    }
  }
  return configParser.stringify();
}
/**
 * ini配置字符串转为对象
 */
export function INIString2Obj(config: string): any {
  let configParser = new ConfigIniParser();
  configParser.parse(config);
  let result = {}

  // ini的值转为正确的form item中的值
  let iniValue2FormValue = (v: any) => {
    v = v.toString();
    if (v === '1') {
      return true;
    } else if (v === '0') {
      return false;
    }
    else {
      return v;
    }
  }

  // 从默认的setion设置key value
  for (const option of configParser.options(null)) {
    let configValue = configParser.get(null, option);
    configValue = iniValue2FormValue(configValue);
    configValue = configValue ? configValue : null;
    result[option] = configValue;
  }

  for (const section of configParser.sections()) {
    let sectionConfig = {}
    for (const option of configParser.options(section)) {
      let configValue = configParser.get(section, option);
      configValue = iniValue2FormValue(configValue);
      configValue = configValue ? configValue : null;
      sectionConfig[option] = configValue;
    }
    result[section] = sectionConfig
  }
  return result;

}

export function objectIsEqual(obj1: any, obj2: any) {
  for (const key in obj1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}

const toStr = Function.prototype.call.bind(Object.prototype.toString)
export function isObjectObject(t) {
  return toStr(t) === '[object Object]'
}
export function isObjectArray(t) {
  return toStr(t) === '[object Array]'
}
export function isObjectNull(t) {
  return toStr(t) === '[object Null]'
}
export function isObjectUnde(t) {
  return toStr(t) === '[object Undefined]'
}