import React from 'react';
import styles from './form.module.css'
import { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

// import {Link} from 'react-router-dom'


interface props {
    parentStyles : {form: string};

}


const Form: React.FC<props> = ({ parentStyles }) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkbox, setCheckbox] = useState(false);
    const [passwordField,setPasswordField] = useState('password');


    async function register (newUser)
    {
        console.log(newUser);
        
        const url = 'http://localhost:8080/api/auth/register'
        const response = await fetch(url, {method:'POST' ,headers:{'Content-Type': 'application/json'}, body: JSON.stringify(newUser) })

        if (response.ok) {
            console.log("SUCCESS");
            window.location.href = '/login';
        }
        else {
            console.log("register failed");
        }
        console.log(response);
    }
    function handleClick(e)
    {
        e.preventDefault();
        // console.log("Hello from Radwan");
        // console.log(e.target);
        // console.log(firstName);
        // console.log(lastName);
        // console.log(username);
        // console.log(email);
        // console.log(password);
        // console.log(checkbox);
        const newUser = { firstName, lastName , username, email, password};

        register(newUser);
        
        
    }
    function handleInput(e)
    {
        const id = e.target.id
        if (id === "email")
        {
            setEmail(e.target.value)
        }
        else if (id === "password")
        {
            setPassword(e.target.value)
        }
        else if(id === "remember")
        {
            setCheckbox(e.target.checked);
        }
        else if(id === 'firstName')
        {
            setFirstName(e.target.value);
        }
        else if(id === 'lastName')
        {
            setLastName(e.target.value);
        }
        else if(id === 'username')
        {
            setUsername(e.target.value);
        }
    }
    function togglePassword(e)
    {
        setPasswordField(passwordField === 'password'? 'text':'password');
    }
    return (
        <div className={`${styles.container} ${parentStyles.form}`}>
            <div className={styles.heading}>
                <h1>Let's get you started</h1>
            </div>
            <form className={styles.form} onSubmit={handleClick}>
                <div className={styles.fields}>
                    <input onChange={handleInput} className={`${styles['w-40']} ${styles.fields__input}`} type="text" placeholder="First Name" id="firstName"/>
                    <input onChange={handleInput} className={`${styles['w-40']} ${styles.fields__input}`} type="text" placeholder="Last Name" id="lastName" />
                    <input onChange={handleInput} className={`${styles.fields__input}`} type="text" placeholder="Username" id="username" />
                    <input onChange={handleInput} className={`${styles.fields__input}`} type="email" placeholder="Email Address" id="email"  />
                    <input onChange={handleInput} className={`${styles.fields__input}`} type={passwordField} placeholder="Password" id="password" />
                    <button type='button' className={styles.form__password__toggleButton} onClick={togglePassword}>{passwordField === 'password' ? <FaEye /> : <FaEyeSlash/>}</button>
                    <input onChange={handleInput} className={styles.checkbox} type="checkbox" id="remember" />
                    <label htmlFor="remember">Remember me</label>
                </div>
                <div className={styles.submit}>
                    <input type="submit" value="Create an Account" />
                    <p>Already have an account <a href="/login">Log In</a></p>
                </div>
            </form>
        </div>
    );
}

export default Form;