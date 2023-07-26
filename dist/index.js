"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
/**
 * @param dateTime
 * @returns
 */
var dateTimeFormatter = function (dateTime) {
    var _dateTime;
    // 由于浏览器之间的差异与不一致性，强烈不推荐使用Date构造函数来解析日期字符串 (或使用与其等价的Date.parse)
    if (typeof dateTime === "string") {
        var regexFormats = [
            /^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}$/,
            /^\d{4}\/\d{2}\/\d{2}\s+\d{2}:\d{2}:\d{2}$/,
            /^\d{2}-\d{2}-\d{4}\s+\d{2}:\d{2}:\d{2}$/,
            /^\d{2}\/\d{2}\/\d{4}\s+\d{2}:\d{2}:\d{2}$/,
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/,
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/, // ISO 8601 with milliseconds: YYYY-MM-DDThh:mm:ss.sssZ
        ];
        var index = regexFormats.findIndex(function (regex) { return regex.exec(dateTime) !== null; });
        if (index > -1) {
            var _a = regexFormats[index].exec(dateTime), year = _a[0], month = _a[1], day = _a[2], hours = _a[3], minutes = _a[4], seconds = _a[5];
            if (index <= 3) {
                _dateTime = new Date(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes), Number(seconds));
            }
            else {
                _dateTime = new Date(Date.parse(dateTime));
            }
        }
        else {
            throw new Error("Invalid date format");
        }
    }
    else if (typeof dateTime === "number") {
        _dateTime = new Date(dateTime);
    }
    else {
        _dateTime = dateTime;
    }
    return _dateTime;
};
/**
 * 格式化时间
 * 调用formatDate(strDate, 'yyyy-MM-dd');
 * @param strDate（中国标准时间、时间戳等）
 * @param strFormat（返回格式）
 */
var formatDate = function (strDate, strFormat) {
    if (!strDate) {
        return;
    }
    if (!strFormat) {
        strFormat = "yyyy-MM-dd";
    }
    switch (typeof strDate) {
        case "string":
            strDate = new Date(strDate.replace(/-/, "/"));
            break;
        case "number":
            strDate = new Date(strDate);
            break;
    }
    if (strDate instanceof Date) {
        var dict_1 = {
            yyyy: strDate.getFullYear(),
            M: strDate.getMonth() + 1,
            d: strDate.getDate(),
            H: strDate.getHours(),
            m: strDate.getMinutes(),
            s: strDate.getSeconds(),
            MM: ("" + (strDate.getMonth() + 101)).substr(1),
            dd: ("" + (strDate.getDate() + 100)).substr(1),
            HH: ("" + (strDate.getHours() + 100)).substr(1),
            mm: ("" + (strDate.getMinutes() + 100)).substr(1),
            ss: ("" + (strDate.getSeconds() + 100)).substr(1),
        };
        return strFormat.replace(/(yyyy|MM?|dd?|HH?|mm?|ss?)/g, function () {
            return dict_1[arguments[0]];
        });
    }
};
exports.formatDate = formatDate;
/**
 * 日期时间的时区转换
 * @param {string|number|Date} dateTime   日期时间
 * @param {string} [sourceZone="GMT+0"] sourceZone  待转换时间的时区，仅支持GMT(默认东八区)
 * @param {string} [targetZone="GMT+0"] targetZone  目标时区，仅支持GMT(默认零时区)
 * @param {string} [strFormat="YYYY-MM-DD hh:mm:ss"] strFormat 返回值序列化格式
 * @returns {string}
 */
var timeZoneParse = function (dateTime, sourceZone, targetZone, strFormat) {
    if (targetZone === void 0) { targetZone = "GMT+0"; }
    if (strFormat === void 0) { strFormat = "YYYY-MM-DD hh:mm:ss"; }
    if (!sourceZone.includes("GMT") || !targetZone.includes("GMT")) {
        throw new Error("SourceZone or targetZone only the GMT time zone format is supported, example 'GMT+8'");
    }
    var _dateTime = dateTimeFormatter(dateTime);
    var sourceOffset = parseInt(sourceZone.replace("GMT", "")) * 60;
    var targetOffset = parseInt(targetZone.replace("GMT", "")) * 60;
    // 根据源时区偏移量调整时间
    var sourceTime = new Date(_dateTime.getTime() + sourceOffset * 60000);
    // 根据目标时区偏移量调整时间
    var targetTime = new Date(sourceTime.getTime() - targetOffset * 60000);
    return (0, exports.formatDate)(targetTime, strFormat);
};
exports.default = timeZoneParse;
//# sourceMappingURL=index.js.map