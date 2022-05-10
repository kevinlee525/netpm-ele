export function isValidIP(ip) {
    var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
    return reg.test(ip);
}

export class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age
    }
}

export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
        }
    }
    return fmt
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length)
}
export function getCookie() {
    let reg = /csrftoken=([\w]{60,})[;]?/; //不要加g 参数
    let cookies = document.cookie;
    if (Boolean(cookies) && reg.test(cookies)) {
        return reg.exec(cookies)[1]
    } else {
        return null
    }
}
export function initSeries(info) {
    let series = [];
    for (let subdepartment of info.subdepart) {
        let  base = {
            name: '',
            type: 'bar',
            stack: 'total',
            label: {
                show: true
            },
            emphasis: {
                focus: "series",
            },
            data: [],
        };
        base.name = subdepartment
        base.data = info[subdepartment]
        series.push(base)
    }
    return series
}

export function getMgtIP(hostname){
    return  "10.9.255." + hostname.split(".")[0].split("-").pop()
}