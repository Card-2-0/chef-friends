import React, { useState } from 'react';
import User from './User'

function App() {
    const [names, setNames] = useState([]);

    const submit = () => {
        let txt = document.getElementById('input').value
        const list = names.concat(txt)
        setNames(list);
    }

    return (
    <div className="App">
        <h1>Hi There</h1>
        <input id = 'input' placeholder='Enter User Id'/>
        <button type='submit' onClick={submit}> Add User </button>
        <p>{names.length}</p>
        {names.map((e) => 
            <User key = {e} rating = {0} userid = {e}/> 
        )}
    </div>
);
}

export default App;
