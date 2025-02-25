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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState<string>('');
    const [checkbox, setCheckbox] = useState<string>(false);
    const [passwordField,setPasswordField] = useState('password');

    function handleClick(e)
    {
        e.preventDefault();
        console.log("Hello from Radwan");
        console.log(email);
        console.log(password);
        console.log(checkbox);
    }
    function handleInput(e)
    {
        const type : string = e.target.type
        if (type === "email")
        {
            console.log("Setting Email");
            setEmail(e.target.value)
        }
        else if (type === "password")
        {
            console.log("setting password")
            setPassword(e.target.value)
        }
        else
        {
            console.log("setting checkbox")
            setCheckbox(e.target.checked);
        }
    }
    function togglePassword(e)
    {
        setPasswordField(passwordField === 'password'? 'text':'password');
    }
    return (
        <div className={`${styles.container} ${parentStyles.form}`}>
            <div className={styles.heading}>
                <h1>Sign In</h1>
                <p>"enter, access, achieve"</p>
            </div>
            <form className={styles.form} onSubmit={handleClick}>
                <div className={styles.fields}>
                    <input onChange={handleInput} type="email" placeholder="Email Address" name="email" id="email" autoComplete="username" />
                    <div className={styles.form__password}>
                        <input onChange={handleInput} type={passwordField} placeholder="Password" name="password" id="password" autoComplete="current-password" />
                        <button className={styles.form__password__toggleButton} onClick={togglePassword}>{passwordField === 'password' ? <FaEye /> : <FaEyeSlash/>}</button>
                    </div>
                    <div className={styles.checkbox}>
                        <input onChange={handleInput} type="checkbox" name="remember" id="remember" />
                        <label htmlFor="remember">Remember me</label>
                    </div>
                </div>
                <div className={styles.submit}>
                    <input type="submit" value="Sign In" />
                    <p>don't have an account <a href="/signup">Sing Up</a></p>
                </div>
            </form>
        </div>
    );
}

export default Form;