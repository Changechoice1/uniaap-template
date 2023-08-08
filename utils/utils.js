//时间戳位数：1619751776  获得单前时间时间戳：Math.round(new Date() / 1000)
const utils = {
    //调用父组件的方法
    //this.Utils.handleParent(this.$parent, 方法名, 参数);
    handleParent(parent,name,...args){
        while (!parent[name]) {
            //无限套娃
            parent = parent['$parent']
        }
        return parent[name](...args)
    },
    //路由调整
    // 无参数
    // this.Utils.router('/pages/empty/index');
    // 带参数
    // this.Utils.router('/pages/empty/index?id=2');
    //页面获取参数
    // onLoad(params) {
    //     console.log(params.id)
    // },
    router(url){
        uni.$u.route(url)
    },
    // 时间戳转换成时间，
    /*
        1: 年 2017
        2: 月 2017-08
        3: 日 2017-08-23
        4: 年月日时分秒  2021-04-01 12:36:16
        5:年月 202301

    */
    timeDate(timeStamp, num = 1) {
        let date = timeStamp13(timeStamp);
        let year = date.getFullYear();
        let month = dateFormat(date, 1);
        let day = dateFormat(date, 2);
        let hours = dateFormat(date, 3);
        let minutes = dateFormat(date, 4);
        let seconds = dateFormat(date, 5);
        switch (num) {
            case 1:
                return year;
            case 2:
                return year + '-' + month;
            case 3:
                return year + '-' + month + '-' + day;
            case 4:
                return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
            case 5:
                return year+''+month
        }

    },

    //二个时间戳计算差多少天和小时等
    // 1 是天时
    // 2 是天时
    // 3 天时分秒
    // 4 天时分
    // 5 月
    intervalTime(autoTime, num = 1) {
        let date1 = autoTime[0];//计算当前时间戳
        let date2 = autoTime[1]; //自动收货的时间戳 （字符串转时间戳）
        let date3 = date2 - date1; //时间差的毫秒数
        //计算出月
        let month = Math.floor(date3 / (24 * 3600 * 1000 * 30));
        //计算出相差天数
        let days = Math.floor(date3 / (24 * 3600 * 1000));
        //计算出小时数
        let leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
        let hours = Math.floor(leave1 / (3600 * 1000));
        //计算相差分钟数
        let leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
        let minutes = Math.floor(leave2 / (60 * 1000));
        //计算相差秒数
        let leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
        let seconds = Math.round(leave3 / 1000);
        switch (num) {
            case 1:
                return days + "天"
            case 2:
                return days + "天" + hours + "小时 "
            case 3:
                return days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒"
            case 4:
                return days + "天 " + hours + "小时 " + minutes + " 分钟"
            case 5:
                return month + "月"
        }

    },

    //日期转换成时间戳 2015-05-10 14:25:55 转成10位数时间戳
    stampData(time) {
        let date = new Date(time.replace(/-/g, '/'));
        return date.getTime() / 1000;
    },

    //日期转换成时间戳 202301转成13位数时间戳 1是年月  2 是时间戳
    stampData2(time, num=1) {
        time = time.toString();
        let time1 = time.substring(0, 4);
        let time2 = time.substring(4, 6);
        let time3 = `${time1}-${time2}-01 00:00:00`
        if (num === 1) {
            return `${time1}-${time2}`;
        }
        if(num===2){
            let date = new Date(time3.replace(/-/g, '/'));
            return date.getTime();
        }
    },

    //日期转换成时间戳 2015-05-10 14:25:55 转成13位数时间戳
    stampData13(time) {
        let date = new Date(time.replace(/-/g, '/'));
        return date.getTime();
    },

    /*过去当前日期和过去的日期*/
    // getDay(0) 当前日期
    // getDay(-7) 前七天
    // 返回 2021-05-13
    getDay(num) {
        let date = new Date();
        let targetDayMilliseconds = date.getTime() + 1000 * 60 * 60 * 24 * num; // 将目标日转换成毫秒
        date.setTime(targetDayMilliseconds);
        let year = date.getFullYear();
        let month = dateFormat(date, 1);
        let day = dateFormat(date, 2);
        return year + "-" + month + "-" + day;
    },

    /*过去当前日期和过去的日期 当前0*/
    // 返回 2021-05-13 10:49:48
    getDaySecond(num) {
        let date = new Date();
        let targetDayMilliseconds = date.getTime() + 1000 * 60 * 60 * 24 * num;
        date.setTime(targetDayMilliseconds);
        let year = date.getFullYear();
        let month = dateFormat(date, 1);
        let day = dateFormat(date, 2);
        let hours = dateFormat(date, 3);
        let minutes = dateFormat(date, 4);
        let seconds = dateFormat(date, 5);
        return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    },

    //2021-10-25T08:53:53.000Z成日期  {{Utils.dateChangeFormat('YYYY-mm-dd HH:MM:SS',scope.row[item.field])}}
    dateChangeFormat(format, date) {
        date = new Date(date);
        const dataItem = {
            'Y+': date.getFullYear().toString(),
            'm+': (date.getMonth() + 1).toString(),
            'd+': date.getDate().toString(),
            'H+': date.getHours().toString(),
            'M+': date.getMinutes().toString(),
            'S+': date.getSeconds().toString(),
        };
        Object.keys(dataItem).forEach((item) => {
            const ret = new RegExp(`(${item})`).exec(format);
            if (ret) {
                format = format.replace(ret[1], ret[1].length === 1 ? dataItem[item] : dataItem[item].padStart(ret[1].length, '0'));
            }
        });
        return format;
    },

    //实时时间
    //1 2021-05-13 10:49:48 星期4
    //2 2021年05月13日 星期4
    //3 2021-05-13 10:49:48
    getNowDate(type) {
        let date = new Date();
        let sign1 = "-";
        let sign2 = ":";
        let year = date.getFullYear() // 年
        let month = date.getMonth() + 1; // 月
        let day = date.getDate(); // 日
        let hour = date.getHours(); // 时
        let minutes = date.getMinutes(); // 分
        let seconds = date.getSeconds() //秒
        let weekArr = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        let week = weekArr[date.getDay()];
        // 给一位数数据前面加 “0”
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (day >= 0 && day <= 9) {
            day = "0" + day;
        }
        if (hour >= 0 && hour <= 9) {
            hour = "0" + hour;
        }
        if (minutes >= 0 && minutes <= 9) {
            minutes = "0" + minutes;
        }
        if (seconds >= 0 && seconds <= 9) {
            seconds = "0" + seconds;
        }
        let currentdate = null;
        switch (type) {
            case 1:
                currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds + " " + week;
                break;
            case 2:
                currentdate = year + "年" + month + "月" + day + "日 " + week;
                break;
            case 3:
                currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds + " ";
                break;
        }
        return currentdate;
    },

    // 指定日期后加几年  传入13位时间戳  加后几年 得到 2015-15-12
    getYearTime(timeStamp, numYear) {
        let date = timeStamp13(timeStamp, 2);
        let year = date.getFullYear() + numYear;
        let month = dateFormat(date, 1);
        let day = dateFormat(date, 2);
        return year + '-' + month + '-' + day;
    },

    //数字转化成大写 123转化成 壹百贰拾叁元整
    moneyToCapital(n) {
        if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) {
            return "数据非法";  //判断数据是否大于0
        }
        let unit = "千百拾亿千百拾万千百拾元角分", str = "";
        n += "00";
        let indexpoint = n.indexOf('.');  // 如果是小数，截取小数点前面的位数
        if (indexpoint >= 0) {
            n = n.substring(0, indexpoint) + n.substr(indexpoint + 1, 2);   // 若为小数，截取需要使用的unit单位
        }
        unit = unit.substr(unit.length - n.length);  // 若为整数，截取需要使用的unit单位
        for (let i = 0; i < n.length; i++) {
            str += "零壹贰叁肆伍陆柒捌玖".charAt(n.charAt(i)) + unit.charAt(i);  //遍历转化为大写的数字
        }
        return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整"); // 替换掉数字里面的零字符，得到结果
    },

    //二数组是否包含，2数组包含1数组的任何一个值返回 true
    arrayContain(array1, array2) {
        for (let i = 0; i < array1.length; i++) {
            if (array2.includes(array1[i])) {
                return true
            }
        }
        return false
    },

    //汉子模糊搜索 search='我'  searchList='你是我的谁'
    fuzzySearch(search, searchList) {
        return searchList.includes(search);
    },

    //图片放大 使用
    /*
    数据格式 aa:[{a:'',b:''},{a:'',b:''}]
    传入arrayMoveOne(aa[0].b,aa,b)
        当前的值，整个数组，字段名

     */
    arrayMoveOne(val, array, field, env) {
        let imgArray = [];
        for (let i = 0; i < array.length; i++) {
            imgArray.push(env + '/' + array[i][field]);

        }
        for (let i = 0; i < imgArray.length; i++) {
            if (val === imgArray[i]) {
                imgArray.splice(i, 1);
                imgArray.unshift(val);
                return imgArray
            }
        }
        return imgArray;
    },

    //过滤器 val 在array里面 返回label
    filterArray(val, array) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].value === val) {
                return array[i].label
            }
        }
        return ''
    },
    //tabs是否显示和顺序
    tabsShowOrder(val, array) {
        let seeShow = false;
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[i].option.length; j++) {
                if (val === array[i].option[j].label) {
                    seeShow = true
                    let json = {
                        checkbox: array[i].option[j].checkbox,
                        order: array[i].option[j].order
                    }
                    return json
                }
            }
        }
        if (!seeShow) {
            let json = {
                checkbox: false,
                // order: array[i].option[j].order
            }
            return json
        }
    },
    //table fixed 和显示
    tableShowFixed(val, array) {
        let seeShow = false;
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[i].option.length; j++) {
                if (val === array[i].option[j].label) {
                    seeShow = true
                    let json = {
                        checkbox: array[i].option[j].checkbox,
                        fixed: array[i].option[j].fixed
                    }
                    return json
                }
            }
        }
        if (!seeShow) {
            let json = {
                checkbox: false,
                // fixed: array[i].option[j].fixed
            }
            return json
        }
    },

    //后台返回文件流 下载
    windowOpen(url, fileName) {
        var xhr = new XMLHttpRequest();
        // var fileName = window.fileName + typeName; // 文件名称
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.setRequestHeader('token', window.sessionStorage.getItem('token'));
        xhr.onload = function () {
            if (this.status === 200) {
                var type = xhr.getResponseHeader('Content-Type');
                var blob = new Blob([this.response], {type: type});
                if (typeof window.navigator.msSaveBlob !== 'undefined') {
                    /*
                     * For IE
                     * >=IE10
                     */
                    window.navigator.msSaveBlob(blob, fileName);
                } else {
                    /*
                     * For Non-IE (chrome, firefox)
                     */
                    var URL = window.URL || window.webkitURL;
                    var objectUrl = URL.createObjectURL(blob);
                    if (fileName) {
                        var a = document.createElement('a');
                        if (typeof a.download === 'undefined') {
                            window.location = objectUrl;
                        } else {
                            a.href = objectUrl;
                            a.download = fileName;
                            document.body.appendChild(a);
                            a.click();
                            a.remove();
                        }
                    } else {
                        window.location = objectUrl;
                    }
                }
            }
        }
        xhr.send();
    },


    //树形遍历 arrs 需要遍历的数据 that 赋值的值
    // traversalTree(arrs, that) {
    //     arrs.map((item, index) => {
    //         that.push({
    //             id: item.id,
    //             a1: item.name,//资产名称
    //             children: [],
    //         })
    //         if (item.children) {
    //             this.traversalTree(item.children, that[index].children)
    //         }
    //     })
    // },


}

//根据项目来定，  num 1 十位数时间戳 2 十三位时间戳
function timeStamp13(timeStamp, num = 2) {
    let stamp
    switch (num) {
        case 1:
            stamp = timeStamp * 1000;//这个是把十位的时间戳转换成13位时间戳
            break
        case 2:
            stamp = timeStamp;//这个可以根据该默认值来执行
    }
    return new Date(stamp);
}

//处理完后输出
function process(params) {
    return params < 10 ? ('0' + params) : params;
}

//月 小于10，显示的时候前面加个0   num 1:月 2:日 3:时 4:分 5:秒
function dateFormat(date, num) {
    switch (num) {
        case 1:
            return process(date.getMonth() + 1);
        case 2:
            return process(date.getDate());
        case 3:
            return process(date.getHours());
        case 4:
            return process(date.getMinutes());
        case 5:
            return process(date.getSeconds());
    }
}

module.exports = utils


