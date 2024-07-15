/* v8 ignore start */
import React from 'react'
import { Link } from 'react-router-dom';
import { ROUTES } from './constant';

const Home = () => {
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center decoration-none'>
        {/* <h1 class="text-3xl mb-3">Choose any</h1> */}
        <Link to={ROUTES.STOPWATCH}>Stopwatch</Link>
        <Link to={ROUTES.COUNTDOWN_TIMER}>Timer</Link>
        <Link to={ROUTES.TIC_TAC_TOE}>Tic-Tac-Toe</Link>
        <Link to={ROUTES.TEXT_DOC_ANIMATION}>Notepad</Link>
        <Link to={ROUTES.DEBOUNCED_SEARCH}>Auto-complete countries</Link>
    </div>
  )
}

export default Home;
/* v8 ignore stop */