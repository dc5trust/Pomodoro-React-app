import React, {useState, useRef} from 'react';

//Import CSS Styles
import './style/style.css';
//import components
import Timer from './components/Timer';
import Setting from './components/Setting';


function App() {

//States 
 const [currentTime, setCurrentTime] = useState('00:10');
 const [activeTimer, setActiveTimer] = useState(false);
 const [pausedTime, setPausedTime] = useState();
 const [intervalStatus, setIntervalStatus] = useState();

 //demo state 
 const [demoStatus, setDemoStatus] = useState(true);

 //initial Time, This what you change to alter the duration of the study session 
 //original time is kept becaue 'time' is altered if paused, and original time is used to keep the Percentage percise. 
 const [time, setTime] = useState(5);
 const [originalTime, setOriginalTime] = useState();
 
 //progressBar percentage State
 const [percentage, setPercentage] = useState(100);

 //settings useStates 
 const [pomodoro, setPomodoro] =  useState(10);
 const [shortBreak, setShortBreak] = useState(5); 
 const [longBreak, setLongBreak] = useState(7); 

 //Keep count of cycle between studying and breaks; short & long breaks
 const [cycle, setCycle] = useState(2);
 //we begin at '2' because when the count down reaches ZERO for the first time, it should be at '2' ending the first cycle.

 //useRef for setting up Time within 'settings' returning value from input upon 'applying'
 const pomodoroRef = useRef();
 const shortBreakRef = useRef();
 const longBreakRef = useRef();

 const timeColorRef = useRef();

 // fonts refs
  const fontOneRef = useRef();
  const fontTwoRef = useRef();
  const fontThreeRef = useRef();

//font State 
  const [mainFont, setMainFont] = useState('"Poppins", sans-serif');

 //colors refs 
 const colorOneRef = useRef();
 const colorTwoRef = useRef();
 const colorThreeRef = useRef();

 //font State 
 const [mainColor, setMainColor] = useState('rgb(67, 142, 240)');
 

 //refs
 const settingsBtnRef = useRef();
 const modalBoxRef = useRef();

 const infoModalRef = useRef();
 
 //active menu for study, short break, long break 
 const studySessionRef = useRef();
 const shortSessionRef = useRef();
 const longSessionRef = useRef();

 //settings Ref for applybtn 
 const applyBtnRef = useRef();
 

  return (
    <div className="App">
      <Timer currentTime={currentTime} setCurrentTime={setCurrentTime} activeTimer={activeTimer} setActiveTimer={setActiveTimer} intervalStatus={intervalStatus} setIntervalStatus={setIntervalStatus} pausedTime={pausedTime} setPausedTime={setPausedTime} settingsBtnRef={settingsBtnRef} modalBoxRef={modalBoxRef} pomodoro={pomodoro} setPomodoro={setPomodoro} shortBreak={shortBreak} longBreak={longBreak} time={time} setTime={setTime} cycle={cycle} setCycle={setCycle} studySessionRef={studySessionRef} shortSessionRef={shortSessionRef} longSessionRef={longSessionRef} timeColorRef={timeColorRef} percentage={percentage} setPercentage={setPercentage} applyBtnRef={applyBtnRef} mainColor={mainColor} setMainColor={setMainColor} setOriginalTime={setOriginalTime} originalTime={originalTime} demoStatus={demoStatus} setDemoStatus={setDemoStatus} infoModalRef={infoModalRef}/>
      
      <Setting settingsBtnRef={settingsBtnRef} modalBoxRef={modalBoxRef} pomodoro={pomodoro} setPomodoro={setPomodoro} pomodoroRef={pomodoroRef} shortBreakRef={shortBreakRef} longBreakRef={longBreakRef} shortBreak={shortBreak} setShortBreak={setShortBreak} longBreak={longBreak} setLongBreak={setLongBreak} time={time} setTime={setTime} setCurrentTime={setCurrentTime} currentTime={currentTime} setPausedTime={setPausedTime} pausedTime={pausedTime} setIntervalStatus={setIntervalStatus} intervalStatus={intervalStatus} setActiveTimer={setActiveTimer} activeTimer={activeTimer} fontOneRef={fontOneRef} fontTwoRef={fontTwoRef} fontThreeRef={fontThreeRef} colorOneRef={colorOneRef} colorTwoRef={colorTwoRef} colorThreeRef={colorThreeRef}  applyBtnRef={applyBtnRef} mainColor={mainColor} setMainColor={setMainColor} longSessionRef={longSessionRef} studySessionRef={studySessionRef} shortSessionRef={shortSessionRef} timeColorRef={timeColorRef} setPercentage={setPercentage} cycle={cycle} mainFont={mainFont} setMainFont={setMainFont} setCycle={setCycle} setOriginalTime={setOriginalTime} originalTime={originalTime}/>
    </div>

  );
}


export default App;
