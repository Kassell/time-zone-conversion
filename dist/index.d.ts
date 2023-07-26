/**
 * 格式化时间
 * 调用formatDate(strDate, 'yyyy-MM-dd');
 * @param strDate（中国标准时间、时间戳等）
 * @param strFormat（返回格式）
 */
export declare const formatDate: (strDate: any, strFormat?: any) => any;
/**
 * 日期时间的时区转换
 * @param {string|number|Date} dateTime   日期时间
 * @param {string} [sourceZone="GMT+0"] sourceZone  待转换时间的时区，仅支持GMT(默认东八区)
 * @param {string} [targetZone="GMT+0"] targetZone  目标时区，仅支持GMT(默认零时区)
 * @param {string} [strFormat="YYYY-MM-DD hh:mm:ss"] strFormat 返回值序列化格式
 * @returns {string}
 */
declare const timeZoneParse: (dateTime: Date, sourceZone: string, targetZone?: string, strFormat?: string) => string;
export default timeZoneParse;
