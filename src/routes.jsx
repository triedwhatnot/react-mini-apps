import { Route, createRoutesFromElements } from "react-router-dom";
import { ROUTES } from "./constant";

import CountriesSearchBar from './autosuggest-countries/index';
import TextDocAnimation from './text-doc-animation/index';
import CountdownTimer from "./countdown-timer";
import Stopwatch from "./stopwatch";
import ToastNotifcation from "./toast-notification";
import StarRating from "./star-rating";
import TicTacToe from "./tic-tac-toe";

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
            path="/*" 
            element={<div>Not found</div>} 
        />
    </>
)

export default Routes;