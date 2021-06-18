import { useState, useRef } from 'react';
import './login.css';

const Login = ({setLoggedIn}) => {
    const crypto = require("crypto");
    const usernameErr = useRef();
    const passwordErr = useRef();
    const loginErr = useRef();

    const [loginDetails, setLoginDetails] = useState({
        username: '',
        password: ''
    });

    const getHttpRequest = () => {
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...loginDetails,
                password: crypto.createHash("sha256").update(loginDetails.password).digest("hex")
            })
        };
        
        return requestOptions;
    }

    const handleLogin = () => {
        fetch("http://localhost:9000/users", getHttpRequest())
            .then(res => res.json())
            .then(res => res.status === 200 ? setLoggedIn(true) : loginErr.current.style.display = 'block')
            .catch(err => loginErr.current.style.display = 'block');
    }

    const checkUsernameErr = () => {
        loginDetails.username === '' ? usernameErr.current.style.display = 'block' : usernameErr.current.style.display = 'none';
    }

    const checkPasswordErr = () => {
        loginDetails.password === '' ? passwordErr.current.style.display = 'block' : passwordErr.current.style.display = 'none';
    }

    const handleLoginClick = () => {
        checkUsernameErr();
        checkPasswordErr();

        if (usernameErr.current.style.display === 'none' && passwordErr.current.style.display === 'none')
            handleLogin();
    }

    const setLoginFormDetails = (e, field) => {
        setLoginDetails({
            ...loginDetails,
            [field]: e.currentTarget.value
        })

        if (field === 'username' && e.currentTarget.value !== '')
            usernameErr.current.style.display = 'none';
        else if (e.currentTarget.value !== '')
            passwordErr.current.style.display = 'none';
    }
    
    return (
        <div className="login-section">
            <form className="login-form">
                <input placeholder="Username" value={loginDetails.username} onChange={(e) => setLoginFormDetails(e, 'username')}/>
                <small ref={usernameErr}>* Username cannot be blank</small>
                <input placeholder="Password" value={loginDetails.password} onChange={(e) => setLoginFormDetails(e, 'password')} type="password" />
                <small ref={passwordErr}>* Password cannot be blank</small>
                <button type="button" onClick={() => handleLoginClick()}>Log In</button>
                <small ref={loginErr}>* Incorrect login details</small>
            </form>
        </div>
    )
}

export default Login;