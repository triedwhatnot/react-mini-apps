import { useEffect, useState } from "react"

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

    const onCountryChange = (e)=>{
        setInputVal(e.target.value);
    }

    useEffect(()=>{
        let isValid = true;
        let timerId = setTimeout(()=>{
            if(inputVal){
                getCountries(inputVal)
                .then(res => isValid && setCountriesArr(res.countries));
            }
            else setCountriesArr(null);
        },500);

        return ()=>{
            clearTimeout(timerId);
            isValid = false;
        }
    }, [inputVal])

    return (
        <>
            <input name="countries-search-bar" type="text" value={inputVal} onChange={onCountryChange} />
            {   
                countriesArr?.length ?
                <div>
                    {
                        countriesArr.map(name => <div key={name}>{name}</div>)
                    }
                </div> 
                : <></>
            }
        </>
    )
}

export default CountriesSearchBar;