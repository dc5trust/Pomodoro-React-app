import React, {useState} from 'react';
//Import CSS Styles
import './style/style.css';
//import components
import Timer from './components/Timer';
import Setting from './components/Setting';

function App() {

 const [currentTime, setCurrentTime] = useState('01:40');
 const [activeTimer, setActiveTimer] = useState(false);
 const [pausedTime, setPausedTime] = useState();
 const [intervalStatus, setIntervalStatus] = useState();

 const [duration, setDuration] = useState();

  return (
    <div className="App">
      <Timer currentTime={currentTime} setCurrentTime={setCurrentTime} activeTimer={activeTimer} setActiveTimer={setActiveTimer} intervalStatus={intervalStatus} setIntervalStatus={setIntervalStatus} pausedTime={pausedTime} setPausedTime={setPausedTime}/>
      <Setting />
    </div>

  );
}

export default App;
