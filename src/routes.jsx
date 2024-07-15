import { Route, createRoutesFromElements } from "react-router-dom";
import { ROUTES } from "./constant";

import CountriesSearchBar from './autosuggest-countries/index';
import TextDocAnimation from './text-doc-animation/index';
import CountdownTimer from "./countdown-timer";
import Stopwatch from "./stopwatch";
import ToastNotifcation from "./toast-notification";
import StarRating from "./star-rating";
import TicTacToe from "./tic-tac-toe";
import Home from "./home";

const Routes = createRoutesFromElements(
    <>
        <Route 
            path={ROUTES.TEXT_DOC_ANIMATION}
            element={<TextDocAnimation />}
        />
        <Route 
            path={ROUTES.DEBOUNCED_SEARCH} 
            element={<CountriesSearchBar />}
        />
        <Route 
            path={ROUTES.COUNTDOWN_TIMER}
            element={<CountdownTimer />}
        />
        <Route 
            path={ROUTES.STOPWATCH} 
            element={<Stopwatch />}
        />
        <Route 
            path={ROUTES.TOAST_NOTIFICATION} 
            element={<ToastNotifcation />}
        />
        <Route 
            path={ROUTES.STAR_RATING} 
            element={<StarRating />}
        />
        <Route 
            path={ROUTES.TIC_TAC_TOE} 
            element={<TicTacToe />}
        />
        <Route 
            path={ROUTES.BASE_PATH} 
            element={<Home />}
        />
        <Route 
            path="/*" 
            element={
            <div className="h-screen w-screen flex justify-center items-center">
                <div className="h-[50px] w-[100px] border border-black shadow-md flex justify-center items-center">Not found</div>
            </div>
            } 
        />
    </>
)

export default Routes;