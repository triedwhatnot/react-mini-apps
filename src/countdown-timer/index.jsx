import { useEffect, useState } from "react";
import "./style.css";

function formatTimeToHHMMSS(value){
    let hrs = Math.floor(value/3600);
    let balance = value%3600;
    let mins = Math.floor(balance/60);
    let secs = balance%60;

    let hrsStr = hrs < 10 ? `0${hrs}` : hrs;
    let minsStr = mins < 10 ? `0${mins}` : mins;
    let secsStr = secs < 10 ? `0${secs}` : secs;
    return `${hrsStr}:${minsStr}:${secsStr}`;
}

function CountdownTimer(){
    const [inputMins, setInputMins] = useState(0);
    const [timerId, setTimerId] = useState(null);
    const [btnState, setBtnState] = useState(1);
    const [timeInSecs, setTimeInSecs] = useState(0);
    const [countdownOver, setCountdownOver] = useState(false);

    useEffect(()=>{
        if(countdownOver){
            alert("Time's up!");
            setInputMins(0);
        }
    }, [countdownOver])

    const startPauseHandler = ()=>{
        if(btnState === 1){
            if(inputMins <= 0) return;
    
            if(timeInSecs === 0) {
                setTimeInSecs(inputMins*60);
                setCountdownOver(false);
            }

            let timerId = setInterval(()=>{
                setTimeInSecs(timeInSecs => {
                    if(timeInSecs === 1) {
                        clearInterval(timerId);
                        setBtnState(1);
                        setCountdownOver(true);
                    }
                    return (timeInSecs - 1);
                });
            },1000);

            setTimerId(timerId);  
            setBtnState(2);
        }
        else{
            // pause
            clearInterval(timerId);
            setBtnState(1);
        }
    }

    const resetHandler = ()=>{
        clearInterval(timerId);
        setTimeInSecs(inputMins*60);
        setBtnState(1);
        setCountdownOver(false);
    }

    const inputChangeHandler = (e)=>{
        setInputMins(e.target.value);
        resetHandler();
        setTimeInSecs(+e.target.value * 60);   
    }

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-[#f9f8f3]">
            <div className="flex flex-col h-full justify-evenly  items-center">
                <div className="text-center">
                    <div className="mb-[10px]">Enter time in min(s)</div>
                    <input 
                        type="number" 
                        value={inputMins} 
                        onChange={inputChangeHandler}
                        className="p-[10px] outline-none"
                    />
                </div>
                <div className="text-5xl">{formatTimeToHHMMSS(timeInSecs)}</div>
                <div>
                    <button className="bg-white border border-black hover:border-black hover:border-1 hover:font-bold focus:outline-none rounded-[60%] h-[70px] w-[70px] p-[15px] mr-[100px]" onClick={startPauseHandler}>{btnState === 1 ? "Start" : "Pause"}</button>
                    <button className="bg-white border border-black hover:border-black hover:border-1 hover:font-bold focus:outline-none rounded-[60%] h-[70px] w-[70px] p-[15px]" onClick={resetHandler}>Reset</button>
                </div>
            </div>
        </div>
    )
}

export default CountdownTimer;