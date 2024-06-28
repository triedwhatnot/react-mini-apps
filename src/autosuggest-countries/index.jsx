import { useEffect, useState } from "react";
import SearchLogo from "../assets/magnifying-glass.svg";
import ThreeDotLoader from "../ThreeDotLoader";

async function getCountries(query){
    try{
        if(!query) return;
        const API_URL = "https://algochurn-server.onrender.com/practice/countries/";

        const res = await fetch(API_URL + query);
        const res_json = await res.json();
        return res_json;
    }
    catch(err){
        console.log("error occurred in getCountries: ", err);
    }
}

function CountriesSearchBar(){
    const [inputVal, setInputVal] = useState("");
    const [countriesArr, setCountriesArr] = useState(null);
    const [areSuggestionsVisible, setAreSuggestionsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onCountryChange = (e)=>{
        setInputVal(e.target.value);
    }

    const onInputBlur = ()=>{
        setAreSuggestionsVisible(false);
    }

    const onInputFocus = ()=>{
        if(inputVal) setAreSuggestionsVisible(true);
    }

    useEffect(() => {
        let isValid = true;
        let timerId = setTimeout(()=>{
            if(inputVal){
                setIsLoading(true);
                setAreSuggestionsVisible(true);
                getCountries(inputVal)
                .then(res => {
                    if(isValid) {
                        setCountriesArr(res.countries);
                        setIsLoading(false);
                    }
                });
            }
            else {
                setCountriesArr(null);
                setAreSuggestionsVisible(false);
            }
        },500);

        return () => {
            clearTimeout(timerId);
            isValid = false;
        }
    }, [inputVal])

    return (
        <div className="h-screen w-screen flex flex-col justify-evenly items-center bg-[#f9f8f3]">
            <div className="text-center pl-[25px] pr-[25px] md:p-0">
                <h1 className="text-4xl md:text-5xl">Where do you wanna go next ?</h1>
                <p className="mt-[15px]">We autosuggest countries that start with your input. Just start typing...</p>
            </div>
            <div className="w-2/3 md:w-1/2 h-1/2 relative">
                <input 
                    name="countries-search-bar" 
                    type="text" 
                    value={inputVal} 
                    onChange={onCountryChange} 
                    onBlur={onInputBlur}
                    onFocus={onInputFocus}
                    autoComplete="off"
                    className="outline-none border border-gray-600 w-full h-[35px] pl-[50px] rounded shadow-md"
                />
                <img 
                    src={SearchLogo} 
                    alt="magnifying-glass" 
                    className="absolute top-0.5 left-[10px] pointer-events-none h-[30px]" 
                />
                {   
                    areSuggestionsVisible ?
                    
                        isLoading ?

                        <div className="overflow-auto h-[200px] md:h-[300px] rounded flex justify-center items-center bg-[#eee] shadow-md">
                            <ThreeDotLoader />
                        </div>

                        : 

                        countriesArr?.length ?
                        <div className="overflow-auto h-[200px] md:h-[300px] rounded shadow-md bg-[#eee]">
                            {
                                countriesArr.map(name => (
                                    <div 
                                        key={name}
                                        className="p-2 pl-[50px] relative"   
                                    >
                                        <img 
                                            src={SearchLogo} 
                                            alt="magnifying-glass" 
                                            className="absolute top-2.5 left-[15px] pointer-events-none h-[20px]" 
                                        />
                                        {name}
                                    </div>
                                ))
                            }
                        </div> 
                        : 
                        <div className="w-full h-[200px] md:h-[300px] rounded flex justify-center items-center bg-[#eee] shadow-md">
                            Oops, no countries found!
                        </div>

                    : ""
                }
            </div>
        </div>
    )
}

export default CountriesSearchBar;