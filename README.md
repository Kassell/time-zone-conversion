# time-zone-conversion

## Install

```
$ npm i time-zone-conversion
```

## Usage

```javascript
import timeZoneParse from "time-zone-conversion";

// timeZoneParse(dateTime,sourceZone,targetZone?="GMT+0",strFormat?="YYYY-MM-DD hh:mm:ss")

const nowDate = new Date(); // => 2023/07/26 08:00:00

const targetDateTime0 = timeZoneParse(nowDate, "GMT+8");
// => 2023-07-26 00:00:00

const targetDateTime2 = timeZoneParse(nowDate, "GMT+6", "GMT+1", "YYYY/MM/DD hh:mm:ss");
// => 2023/07/26 03:00:00

const targetDateTime3 = timeZoneParse("2023/07/26 08:00:00", "GMT+6");
// => 2023-07-26 02:00:00

const targetDateTime4 = timeZoneParse("2023/07/26 08:00:00", "GMT+8", "GMT+0", "YYYY-MM-DD hh:mm:ss");
// => 2023-07-26 00:00:00
```

## License

[MIT](http://opensource.org/licenses/MIT)
