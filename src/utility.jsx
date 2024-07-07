export function formatMsToMMSS(ms){
    if(typeof ms !== "number" || isNaN(ms)) ms = 0;

    let mins = Math.floor(ms/(60*1000));
    let secs = Math.floor((ms%(60*1000))/1000);
    let milliSecs = (ms%(60*1000))%1000;

    let formattedMins = mins < 10 ? `0${mins}` : mins;
    let formattedSecs = secs < 10 ? `0${secs}` : secs;
    let formattedMilliSecs = milliSecs < 100 ? (milliSecs < 10 ? `00${milliSecs}` : `0${milliSecs}`) : milliSecs;
    return `${formattedMins}:${formattedSecs}:${formattedMilliSecs}`;
}

export function formatTimeToHHMMSS(value){
    if(typeof value !== "number" || isNaN(value)) value = 0;

    let hrs = Math.floor(value/3600);
    let balance = value%3600;
    let mins = Math.floor(balance/60);
    let secs = balance%60;

    let hrsStr = hrs < 10 ? `0${hrs}` : hrs;
    let minsStr = mins < 10 ? `0${mins}` : mins;
    let secsStr = secs < 10 ? `0${secs}` : secs;
    return `${hrsStr}:${minsStr}:${secsStr}`;
}