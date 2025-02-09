import React from 'react';
import Form from './Form.tsx'
import Figure from './Figure.tsx'
import styles from './signinPage.module.css'

function SigninPage() {
    return (
        <div className={styles.container}>
            <Figure parentStyles={styles}/>
            <Form parentStyles={styles} />
        </div>
    );
}

export default SigninPage;