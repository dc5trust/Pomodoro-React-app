
import React, {useEffect, useRef} from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';


const Timer = ({currentTime, setCurrentTime, activeTimer, setActiveTimer, intervalStatus, setIntervalStatus, pausedTime, setPausedTime, settingsBtnRef, modalBoxRef, pomodoro, setPomodoro, longBreak, shortBreak, time, cycle, setCycle, setTime, studySessionRef, shortSessionRef, longSessionRef, timeColorRef, percentage, setPercentage, mainColor, setMainColor, setOriginalTime, demoStatus, setDemoStatus, infoModalRef})=>{
    
  // time variable 
  let startTime, minutes, seconds, totalTime, originalTime;
  let percent = 0;

  const startTimer = ()=>{
    if(pausedTime){
      time = pausedTime;
    }
    if(activeTimer === true){
      totalTime = time - (((Date.now() - startTime) / 1000) | 0);
      console.log('running..');
      if(totalTime === 0){
        setCurrentTime('0:00');
        pauseTimer();
        setActiveTimer(activeTimer = false);
        setIntervalStatus(intervalStatus = clearInterval(intervalStatus));
        calculatePercentage(totalTime);
        
        const Delay = setTimeout(()=>{setPercentage(100);
          pomodoroCycle();
           }, 1000);
        return 
      }else{
        setPausedTime(totalTime);
        setCurrentTime(()=>formatNumbers(totalTime));
        calculatePercentage (totalTime);
      }
    }
  };

  const startInterval = ()=>{
    //original time is used to keep track of the intial time or adjusted time, because this is changed when the user pauses the application, and this affects the total percent of the circlebar progress. 
    originalTime = time;
    if (activeTimer === false){
      startTime = Date.now();
      setActiveTimer(activeTimer = true);
      setIntervalStatus(intervalStatus = setInterval((startTimer), 1000));
    }else if(activeTimer === true){
      pauseTimer();
    }
  }

  function pauseTimer (){
    console.log('...paused')
    setActiveTimer(activeTimer = false);
    setIntervalStatus(intervalStatus = clearInterval(intervalStatus));
  };

  function formatNumbers (input){
    minutes = Math.floor(input / 60);
    seconds = (input % 60);
    if(seconds < 10 && minutes < 10){
      return '0'+ minutes + ':'+ '0'+ seconds;
    }else if (minutes < 10){
      return '0'+ minutes + ':' + seconds;
    }else if(minutes >= 10 && seconds < 10){
      return minutes + ':' + '0'+seconds;
    }else if(minutes >= 10){
      return minutes + ':' + seconds;
    }
  }

  const userModalHandler = ()=>{
    modalBoxRef.current.style.display = 'flex';
  }

 
  function pomodoroCycle (){
    //increase cycle by one but beginning at 2 
    setCycle((prev)=> prev+1);
    console.log('cycle',cycle);
    console.log('pausedTime',pausedTime);
    setPausedTime(0);
    //if cycle equals 3 return a long break
    if(cycle % 2 === 1){
      console.log('running regular study session');
      setCurrentTime(formatNumbers(pomodoro));
      setTime(()=>pomodoro);
      longSessionRef.current.style.backgroundColor = 'transparent';
      studySessionRef.current.style.backgroundColor = `${mainColor}`;
      shortSessionRef.current.style.backgroundColor = 'transparent';
      //box shadow 
      longSessionRef.current.style.boxShadow = 'none';
      studySessionRef.current.style.boxShadow = '0 20px 30px rgba(0, 0, 0, 0.1), 0 4px 4px 0 rgba(0, 0, 0, 0.15)';
      shortSessionRef.current.style.boxShadow = 'none';
      timeColorRef.current.style.color = 'white';
    }else if(cycle % 2 === 0){
      if(cycle % 6 === 0){
        setTime(()=>longBreak);
        setCurrentTime(formatNumbers(longBreak));
        console.log('long break is running');
        longSessionRef.current.style.backgroundColor = `${mainColor}`;
        studySessionRef.current.style.backgroundColor = 'transparent';
        shortSessionRef.current.style.backgroundColor = 'transparent';
        //box shadow 
        longSessionRef.current.style.boxShadow = '0 20px 30px rgba(0, 0, 0, 0.1), 0 4px 4px 0 rgba(0, 0, 0, 0.15)';
        studySessionRef.current.style.boxShadow = 'none';
        shortSessionRef.current.style.boxShadow = 'none';
        timeColorRef.current.style.color = 'white';
        
      }else{
        setTime(()=>shortBreak);
        setCurrentTime(formatNumbers(shortBreak));
        console.log('short break is running...');
        longSessionRef.current.style.backgroundColor = 'transparent';
        studySessionRef.current.style.backgroundColor = 'transparent';
        shortSessionRef.current.style.backgroundColor = `${mainColor}`;
        console.log(mainColor);
        //box shadow
        longSessionRef.current.style.boxShadow = 'none';
        studySessionRef.current.style.boxShadow = 'none';
        shortSessionRef.current.style.boxShadow = '0 20px 30px rgba(0, 0, 0, 0.1), 0 4px 4px 0 rgba(0, 0, 0, 0.15)';
        timeColorRef.current.style.color = 'white';
      }
    }
  }

  function calculatePercentage (totalTime) {
    if(originalTime !== NaN && totalTime !== undefined){
      percent = 100 * (totalTime/originalTime)
      setPercentage(Math.floor(percent));
    }
  }
  
  function studyModeHandler (e){
    

    if(e.target.classList.value === 'study-session'){
      setPausedTime('');
      setTime(pomodoro);
      setOriginalTime(pomodoro);
      setCurrentTime(()=>formatNumbers(pomodoro));
      setCycle(2);
      setPercentage(100);
      //change Study mode/session 
      longSessionRef.current.style.backgroundColor = 'transparent';
      studySessionRef.current.style.backgroundColor = `${mainColor}`;
      shortSessionRef.current.style.backgroundColor = 'transparent';
      //box shadow 
      longSessionRef.current.style.boxShadow = 'none';
      studySessionRef.current.style.boxShadow = '0 20px 30px rgba(0, 0, 0, 0.1), 0 4px 4px 0 rgba(0, 0, 0, 0.15)';
      shortSessionRef.current.style.boxShadow = 'none';
    }else if (e.target.classList.value === 'short-break-session'){
      setPausedTime('');
      setTime(shortBreak);
      setOriginalTime(shortBreak);
      setCurrentTime(()=>formatNumbers(shortBreak));
      setCycle(3);
      setPercentage(100);
      longSessionRef.current.style.backgroundColor = 'transparent';
      studySessionRef.current.style.backgroundColor = 'transparent';
      shortSessionRef.current.style.backgroundColor = `${mainColor}`;
      console.log(mainColor);
      //box shadow
      longSessionRef.current.style.boxShadow = 'none';
      studySessionRef.current.style.boxShadow = 'none';
      shortSessionRef.current.style.boxShadow = '0 20px 30px rgba(0, 0, 0, 0.1), 0 4px 4px 0 rgba(0, 0, 0, 0.15)';
    }else if (e.target.classList.value === 'long-break-session'){
      setPausedTime('');
      setTime(longBreak);
      setOriginalTime(longBreak);
      setCurrentTime(()=>formatNumbers(longBreak));
      setCycle(6);
      setPercentage(100);
      longSessionRef.current.style.backgroundColor = `${mainColor}`;
      studySessionRef.current.style.backgroundColor = 'transparent';
      shortSessionRef.current.style.backgroundColor = 'transparent';
      //box shadow 
      longSessionRef.current.style.boxShadow = '0 20px 30px rgba(0, 0, 0, 0.1), 0 4px 4px 0 rgba(0, 0, 0, 0.15)';
      studySessionRef.current.style.boxShadow = 'none';
      shortSessionRef.current.style.boxShadow = 'none';
    }
  }

  function infoHandler (){
    infoModalRef.current.style.display = 'flex';
  }

  function acceptBtnInfo (){
    infoModalRef.current.style.display = 'none';
  }

    return(
        <div className="pomodoro-container">
        <h1 className='pomodoro-title'>Pomodoro</h1>
       
          <div className="title-container" onClick={studyModeHandler}>
            <div ref={studySessionRef} className="study-session" >Pomodoro</div>
            <div ref={shortSessionRef} className="short-break-session">Short Break</div>
            <div ref={longSessionRef} className="long-break-session">Long Break</div>
          </div>
       
       <div className="info-background" ref={infoModalRef}>
         <div className="modal-box">
          <i className="fas fa-info-circle" onClick={infoHandler}></i>
          <h1 className='demo-title'>Demo</h1>
           
          <p className='demo-info'>
              Pomodoro:  <span className='demo-time-span'>10 Seconds </span>
              <br/>
              Short Break:  <span className='demo-time-span'>5 Seconds </span>
              <br/>
              Long Break:  <span className='demo-time-span'>7 Seconds </span>
              <br/>
              <br/>
              <span className='disable-span'>Disable by changing Settings</span>
          </p>
          <button className='accept-btn' onClick={acceptBtnInfo}>Sounds Good!</button>
         </div>
       </div>
       <div className="info-container">
       Demo 
      <i className="fas fa-info-circle" onClick={infoHandler}></i>
      
       </div>
      
        {/* <div><h2>study Sessions:{pomodoro} short Break: {shortBreak} longBreak : {longBreak}</h2></div> */}
        
        <div className="timer-outer-container">
        
          <div className="timer-container">
            
              <CircularProgressbarWithChildren value={percentage} minValue={0} maxValue={100} styles={buildStyles({
                textColor: "red",
                pathColor: `${mainColor}`,
                trailColor: `white`
              })}  strokeWidth={5}>
                <h1 ref={timeColorRef} className='timer-current-time'>{currentTime}</h1>
                <div className="timer-btn-container">
                  <i onClick={startInterval} className={`far ${activeTimer ? 'fa-pause-circle' : 'fa-play-circle'}`}></i>
                </div>
              </CircularProgressbarWithChildren>
              
          </div>
        </div>
        <div className="setting-container">
          <i ref={settingsBtnRef} className="fas fa-user-cog" onClick={userModalHandler}></i>
        </div>
        
      </div>
    );
}


export default Timer;