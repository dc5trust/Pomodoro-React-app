
import React, {useEffect} from 'react';


const Timer = ({currentTime, setCurrentTime, activeTimer, setActiveTimer, intervalStatus, setIntervalStatus, pausedTime, setPausedTime})=>{


    let totalTime 
    let duration = 100;
    let startTime, minutes, seconds;

    const startTimer = ()=>{
      if(pausedTime){
        duration = pausedTime;
      }
      if(activeTimer === true){
        totalTime = duration - (((Date.now() - startTime) / 1000) | 0);
        console.log('running..')
        if(totalTime === 0){
          setCurrentTime('0:00');
          pauseTimer();
          setActiveTimer(activeTimer = false);
          return
        }else{
          setPausedTime(totalTime);
          setCurrentTime(()=>formatNumbers(totalTime));
        }
      }
    };

    const startInterval = ()=>{
       if (activeTimer === false){
        startTime = Date.now();
        setActiveTimer(activeTimer = true);
        console.log(activeTimer)
        setIntervalStatus(intervalStatus = setInterval((startTimer), 1000));
      }else if(activeTimer === true){
        pauseTimer();
      }
      
    }

    function pauseTimer (){
      setActiveTimer(activeTimer = false);
      setIntervalStatus(intervalStatus = clearInterval(intervalStatus));
    };

    function formatNumbers (seconds){
      minutes = Math.floor(seconds / 60);
      seconds = (seconds % 60);
      if(seconds < 10 && minutes < 10){
        return '0'+ minutes + ':'+ '0'+ seconds;
      }else if (minutes < 10){
        return '0'+ minutes + ':' + seconds;
      }
    }


    return(
        <div className="pomodoro-container">
        <h1 className='pomodoro-title'>Pomodoro</h1>
        <div className="title-btn-container">
          <button className="study-btn">Study</button>
          <button className="short-break-btn">short Break</button>
          <button className="long-break-btn">Long Break</button>
        </div>
        
        <div className="timer-container progress-bar">
          <h1 className='timer-current-time'>{currentTime}</h1>
          <div className="timer-btn-container">
            <i onClick={startInterval} className={`far ${activeTimer ? 'fa-pause-circle' : 'fa-play-circle'}`}></i>
          </div>
        </div>
        
        <div className="setting-container">
        <i className="fas fa-user-cog"></i>
        </div>
        
      </div>
    );
}

export default Timer;