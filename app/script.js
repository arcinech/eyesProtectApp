import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

const App = () => {
  const [time, setTime] = useState(1200);
  const [status, setStatus] = useState('off');

  const playBell = () => {
   const audio = new Audio('./sounds/bell.wav');
   audio.play();
  };

  useEffect(()=> {
    let timer;
    if (status !== 'off') {
      if(time <= 0 && status === 'work') {
        playBell();
        clearInterval(timer);
        setTime(20);
        setStatus('rest')
      } else if (time<= 0 && status === 'rest') {
        playBell();
        clearInterval(timer);
        setTime(1200);
        setStatus('work');
      } else {
        timer = (setInterval(()=> setTime(prev => prev - 1), 1000));
      }
      return () => clearInterval(timer);
    }
  },[time, status]);

  const timeFormat = time => {
    const seconds = Math.floor((time)%60);
    const minutes = Math.floor((time/60)%60);
    return (minutes < 10 ? `0${minutes}` : minutes) + ':' + (seconds < 10 ? `0${seconds}` : seconds); 
  };

  const handleStart = e => {
    e.preventDefault();
    setStatus('work');
  }

  const handleStop = e => {
    e.preventDefault();
    setStatus('off');
    setTime(1200);
  }

  const closeApp = e => {
    e.preventDefault();
    window.close();
  }


    return (
      <div>
        <h1>Protect your eyes</h1>
        {status === 'off' && (
        <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>)}
        {status === 'work' && <img src="./images/work.png" />}
        {status === 'rest' && <img src="./images/rest.png" />}
        {status !== 'off' && <div className="timer">
          {timeFormat(time)}
        </div>}
        {status === 'off' && <button onClick={handleStart} className="btn">Start</button>}
        {status !== 'off' && <button onClick={handleStop} className="btn">Stop</button>}
        <button onClick={closeApp} className="btn btn-close">X</button>
      </div>
    )

};

render(<App />, document.querySelector('#app'));
