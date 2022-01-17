import React, {useState} from 'react';

const Setting = ()=>{
    return(
        <div className='settings-background'>
            <div className="settings-main-container">
                <h1>Settings</h1>
                <div className="settings-container">
                    <label htmlfor='study'>Study Sessions</label>
                    <input type="number" name="study" min="1" max="15"/>
                    <label htmlfor='short-break'>Short Break</label>
                    <input type="number" name="short-break"min="1" max="10"/>
                </div>
            </div>
        </div>
    );
}

export default Setting;