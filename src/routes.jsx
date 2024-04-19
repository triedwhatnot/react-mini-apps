import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { ROUTES } from "./constant";

import CountriesSearchBar from './countries-search';
import TextDocAnimation from './text-doc-animation/index';
import App from "./App";
import CountdownTimer from "./countdown-timer";
import Stopwatch from "./stopwatch";
import ToastNotifcation from "./toast-notification";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route 
                path={ROUTES.BASE_PATH} 
                element={<App />}
                // handle={{
                //     crumb: () => "All albums",
                // }} 
            >
                {/* <Route 
                    element={<div><Outlet /></div>}> */}
                    <Route 
                        path={ROUTES.TEXT_DOC_ANIMATION}
                        element={<TextDocAnimation />}
                        // handle={{
                        //     crumb: () => "Albums Images",
                        // }} 
                    />
                    <Route 
                        path={ROUTES.DEBOUNCED_SEARCH} 
                        element={<CountriesSearchBar />}
                        // handle={{
                        //     crumb: () => "All Images",
                        // }} 
                    />
                    <Route 
                        path={ROUTES.COUNTDOWN_TIMER}
                        element={<CountdownTimer />}
                        // handle={{
                        //     crumb: () => "All Images",
                        // }} 
                    />
                    <Route 
                        path={ROUTES.STOPWATCH} 
                        element={<Stopwatch />}
                        // handle={{
                        //     crumb: () => "All Images",
                        // }} 
                    />
                    <Route 
                        path={ROUTES.TOAST_NOTIFICATION} 
                        element={<ToastNotifcation />}
                        // handle={{
                        //     crumb: () => "All Images",
                        // }} 
                    />
                {/* </Route> */}
                {/* <Route 
                    index
                    element={<AlbumLayout />}
                /> */}
            </Route>
            <Route 
                path="/*" 
                element={<div>Not found</div>} 
            />
        </>
));

export default router;