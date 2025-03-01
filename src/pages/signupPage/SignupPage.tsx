import React from 'react';
import Form from './Form.tsx'
import Figure from './Figure.tsx'
import styles from './signupPage.module.css'

const SigninPage: React.FC = () => {
    return (
        <div className={styles.container}>
            <Figure parentStyles={styles}/>
            <Form parentStyles={styles} />
        </div>
    )
}

export default SigninPage;