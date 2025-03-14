import React, { useEffect, useState } from 'react'
import styles from './AccountPage.module.css'
import Header from '../../components/header/Header'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function AccountPage() {
    const [user, setUser] = useState(null)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId')
            const token = localStorage.getItem('token') || sessionStorage.getItem('token')
            if (userId) {
                const taskUrl = `http://localhost:8080/api/users/${userId}`
                const response = await fetch(taskUrl, { method: 'GET', headers: { 'authorization': `Bearer ${token}` } })
                const userData = await response.json()
                setUser(userData)
                setFirstName(userData.firstName)
                setLastName(userData.lastName)
                setUsername(userData.username)
                setEmail(userData.email)
            }
        }
        fetchData()
    }, [])

    const handleSave = async () => {
        if ((currentPassword || newPassword || confirmPassword) && (newPassword !== confirmPassword)) {
            setError('Passwords do not match')
            return
        }

        const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId')
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        const updateUrl = `http://localhost:8080/api/users/${userId}`
        const updatedUser = {
            firstName,
            lastName,
            username,
            email,
            ...(currentPassword && newPassword && { currentPassword, newPassword })
        }

        console.log(updatedUser);
        

        const response = await fetch(updateUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedUser)
        })

        if (response.ok) {
            toast.success('User saved successfully')
        } else {
            toast.error('Error saving user')
        }
    }

    if (!user) {
        return <div>Loading...</div>
    }

    return (
        <div className={styles.accountPage}>
            <Header />
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Account Page</h1>
                <div className={styles.content}>
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Profile Information</h2>
                        <div className={styles.sectionInputs}>
                            <div className={styles.sectionContent}>
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className={styles.sectionContent}>
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <div className={styles.sectionContent}>
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={username}
                                    disabled={true}
                                />
                            </div>
                            <div className={styles.sectionContent}>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={styles.passwordChange}>
                            <h3>Password Change</h3>
                            <div className={styles.sectionContent}>
                                <input
                                    type="password"
                                    id="currentPassword"
                                    name="currentPassword"
                                    placeholder="Current Password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                            </div>
                            <div className={styles.sectionContent}>
                                <input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div className={styles.sectionContent}>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        {error && <div className={styles.error}>{error}</div>}
                        <button className={styles.saveBtn} onClick={handleSave}>Save</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
