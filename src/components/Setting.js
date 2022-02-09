import React, {useState, useRef, useEffect} from 'react';

const Setting = ({settingsBtnRef, modalBoxRef, pomodoro, setPomodoro, shortBreak, setShortBreak, longBreak, setLongBreak, pomodoroRef, shortBreakRef, longBreakRef, time, setTime, currentTime, setCurrentTime, setPausedTime, pauseTime, setIntervalStatus, intervalStatus, setActiveTimer, activeTimer, fontOneRef, fontTwoRef, fontThreeRef, colorOneRef, colorTwoRef, colorThreeRef, applyBtnRef, mainColor, setMainColor, longSessionRef, studySessionRef, shortSessionRef, timeColorRef, setPercentage, cycle, mainFont, setMainFont, setCycle, setOriginalTime, originalTime, setDemoStatus, demoStatus})=>{

    let pomodoroSeconds, shortBreakTemp, longBreakTemp, minutes, seconds, prev;

    const closeModalHandler = ()=>{
        modalBoxRef.current.style.display = 'none';
    }    

    const applyBtnHandler =()=>{
        modalBoxRef.current.style.display = 'none';
        applyBtnRef.current.style.backgroundColor = `${mainColor}`;
        document.body.style.fontFamily = `${mainFont}`;
        applyBtnRef.current.style.fontFamily = `${mainFont}`;
        setDemoStatus(false);
        //check if pomodoro has value
        
        if(pomodoroRef.current.value){
            pomodoroSeconds = 60 * pomodoroRef.current.value;
            setPomodoro(pomodoroSeconds);
            prev = pomodoroRef.current.value;
            console.log(prev);
        }
        if(shortBreakRef.current.value){
            //multiply by 60
            shortBreakTemp = 60 * shortBreakRef.current.value;
            console.log(shortBreakTemp);
            setShortBreak(shortBreakTemp);
        }
        if(longBreakRef.current.value){
            //multiply by 60
            longBreakTemp = 60 * longBreakRef.current.value;
            console.log(longBreakTemp)
            setLongBreak(longBreakTemp);
        }
        
        //update colors upon clicking 'APPLY' within settings 
        if(activeTimer){
            setActiveTimer(activeTimer = false);
            setIntervalStatus(intervalStatus = clearInterval(intervalStatus));
        }
        
        if(studySessionRef.current.style.backgroundColor !== 'transparent'){
            studySessionRef.current.style.backgroundColor = `${mainColor}`;
            if(pomodoroSeconds){
                setPausedTime('');
                setTime(pomodoroSeconds);
                setOriginalTime(pomodoroSeconds);
                setCurrentTime(()=>formatNumbers(pomodoroSeconds));
                setCycle(2);
                setPercentage(100);
                console.log('studysession hello')
            }else return 
            
        }else if(shortSessionRef.current.style.backgroundColor !== 'transparent'){
            shortSessionRef.current.style.backgroundColor = `${mainColor}`;
            if(shortBreakTemp){
                setPausedTime('');
                setTime(shortBreakTemp);
                setOriginalTime(shortBreakTemp);
                setCurrentTime(()=>formatNumbers(shortBreakTemp));
                setCycle(3);
                setPercentage(100);
            }else return

        }else if (longSessionRef.current.style.backgroundColor !== 'transparent'){
            longSessionRef.current.style.backgroundColor = `${mainColor}`;
            if(longBreakTemp){
                setPausedTime('');
                setTime(longBreakTemp);
                setOriginalTime(longBreakTemp);
                setCurrentTime(()=>formatNumbers(longBreakTemp));
                setCycle(6);
                setPercentage(100);
            }else return
        }
        
    }

    //reusing a function rather thann exporting the existing 
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

    const fontHandler = (e) =>{
        // console.log(e.target.classList[0])
        if(e.target.classList.contains('font-one')){
            //highlight selected font icon 
            fontOneRef.current.style.color = 'white';
            fontTwoRef.current.style.color = 'black';
            fontThreeRef.current.style.color = 'black';
            //change background
            fontOneRef.current.style.backgroundColor = 'black';
            fontTwoRef.current.style.backgroundColor = 'rgb(220, 220, 220)';
            fontThreeRef.current.style.backgroundColor = 'rgb(220, 220, 220)';
            setMainFont('"Poppins", sans-serif')
        }else if (e.target.classList.contains('font-two')){
            //highlight selected font icon 
            fontOneRef.current.style.color = 'black';
            fontTwoRef.current.style.color = 'white';
            fontThreeRef.current.style.color = 'black';
            //change background
            fontOneRef.current.style.backgroundColor = 'rgb(220, 220, 220)';
            fontTwoRef.current.style.backgroundColor = 'black';
            fontThreeRef.current.style.backgroundColor = 'rgb(220, 220, 220)';
            //set Font 
            setMainFont('Roboto mono');
        }else if(e.target.classList.contains('font-three')){
            //highlight selected font icon 
            fontOneRef.current.style.color = 'black';
            fontTwoRef.current.style.color = 'black';
            fontThreeRef.current.style.color = 'white';
            //change background of selected font
            fontOneRef.current.style.backgroundColor = 'rgb(220, 220, 220)';
            fontTwoRef.current.style.backgroundColor = 'rgb(220, 220, 220)';
            fontThreeRef.current.style.backgroundColor = 'black';
            //set Font 
            setMainFont('Ubuntu');
        }
    
    }

    const colorHandler = (e)=>{
        if(e.target.classList.contains('color-one')){
            colorOneRef.current.classList.add('fa-check');
            colorTwoRef.current.classList.remove('fa-check');
            colorThreeRef.current.classList.remove('fa-check');
            //change color of studybtn, applybtn & circle props
            setMainColor('rgb(67, 142, 240)')
            
        }else if (e.target.classList.contains('color-two')){
            colorOneRef.current.classList.remove('fa-check');
            colorTwoRef.current.classList.add('fa-check');
            colorThreeRef.current.classList.remove('fa-check');
            //change color of studybtn, applybtn & circle props
            setMainColor('#95ABC6')
        }else if(e.target.classList.contains('color-three')){
            colorOneRef.current.classList.remove('fa-check');
            colorTwoRef.current.classList.remove('fa-check');
            colorThreeRef.current.classList.add('fa-check');
            //change color of studybtn, applybtn & circle props
            setMainColor('lightseagreen');
        }
    }



    return(
        <div ref={modalBoxRef} className='settings-background'>
            <div className="settings-main-container">
                <h1 className='settings-title'>Settings</h1>
                <div onClick={closeModalHandler}  className='x-btn'>X</div>
                <div className='line'></div>
                
                <div className="settings-container">
                    <div className="time-title-container">
                        <h2>Time</h2>  
                        <h4>(Minutes)</h4>
                    </div>
                
                    <div className="study-container">
                        <label htmlFor='study'>Pomodoro</label>
                        <input ref={pomodoroRef} type="number" name="study" min="5" max="60" step='5' placeholder={pomodoro} defaultValue={25}/>
                    </div>
                    <div className="short-break-container">
                        <label htmlFor='short-break'>Short Break</label>
                        <input ref={shortBreakRef} type="number" name="short-break" min="5" max="15" step='5' placeholder={shortBreak} defaultValue={5}/>
                    </div>
                    <div className="long-break-container">
                        <label htmlFor='short-break'>Long Break</label>
                        <input ref={longBreakRef} type="number" name="short-break" min="10" max="30" step='10' placeholder={longBreak} defaultValue={10}/>
                    </div>

                </div>
                <div className="line"></div>
                <div className="fonts-container">
                    <h2>FONT</h2>
                        <div className="fonts-sub-container" onClick={fontHandler}>
                            <div ref={fontOneRef} className="font-one circle default">Aa</div>
                            <div ref={fontTwoRef} className="font-two circle">Aa</div>
                            <div ref={fontThreeRef} className="font-three circle">Aa</div>
                        </div>
                </div>
                <div className="line"></div>
                <div className="colors-container">
                <h2>COLOR</h2>
                        <div className="colors-sub-container" onClick={colorHandler}>
                            <div className="color-one circle"><i ref={colorOneRef} className="fas fa-check"></i></div>
                            <div className="color-two circle"><i ref={colorTwoRef} className="fas"></i></div>
                            <div className="color-three circle"><i ref={colorThreeRef} className="fas"></i></div>
                        </div>
                </div>

                <button ref={applyBtnRef} className='apply-btn' onClick={applyBtnHandler}>Apply</button>
            </div>
        </div>
    );
}

export default Setting;
