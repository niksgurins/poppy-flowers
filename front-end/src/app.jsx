import React, { useState } from 'react';
import './app.less';
import Home from './pages/home/home';
import Login from './pages/login/login';

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <div className="app">
            { loggedIn ? 
                <Home /> :
                <Login setLoggedIn={setLoggedIn} />
            }
        </div>
    )
}

export default App;