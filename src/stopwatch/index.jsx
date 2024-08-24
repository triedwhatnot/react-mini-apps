import { useEffect, useState } from "react";
import { formatMsToMMSS } from "../utility";

function Stopwatch(){
    const [initialMsLapsed, setInitialMsLapsed] = useState(0);
    const [initialTime, setInitialTime] = useState(0);
    const [timerId, setTimerId] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [btnType, setBtnType] = useState(1);

    useEffect(()=>{
        if(btnType === 2){
            // start has been clicked
            setInitialTime(new Date().getTime());
            setCurrentTime(new Date().getTime());

            let tId = setInterval(()=>{
                setCurrentTime(new Date().getTime());
            }, 10);
            setTimerId(tId);
        }

        return () => {
            clearInterval(timerId);
        };
    },[btnType]);

    const startStopHandler = ()=>{
        if(btnType === 1){
            setBtnType(2);
        }
        else{
            clearInterval(timerId);
            setInitialMsLapsed(initialMsLapsed => initialMsLapsed + (currentTime - initialTime));
            setInitialTime(0);
            setCurrentTime(0);
            setBtnType(1);
        }
    }

    const resetHandler = ()=>{
       clearInterval(timerId);
       setInitialMsLapsed(0);
       setInitialTime(0);
       setCurrentTime(0);
       setBtnType(1);
    }

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-[#f9f8f3]">
            <div className="flex flex-col h-full justify-evenly  items-center">
                <h1 className="text-4xl">Get, set, go...!</h1>
                <div className="text-6xl flex w-[295px]" data-testid="timestampEl">
                    {formatMsToMMSS(initialMsLapsed + (currentTime-initialTime))}
                </div>
                <div>
                    <button className="bg-white border border-black hover:border-black hover:border-1 hover:font-bold  focus:outline-none rounded-[60%] h-[70px] w-[70px] p-[15px] mr-[100px]" onClick={startStopHandler}>{btnType === 1 ? "Start" : "Stop"}</button>
                    <button className="bg-white border border-black hover:border-black hover:border-1 hover:font-bold focus:outline-none rounded-[60%] h-[70px] w-[70px] p-[15px]" onClick={resetHandler}>Reset</button>
                </div>
            </div>
        </div>
    )
}

export default Stopwatch;