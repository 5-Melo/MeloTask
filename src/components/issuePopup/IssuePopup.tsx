import React, { useState, useContext } from 'react';
import { FaAngleLeft } from "react-icons/fa6";
import { FiEdit3 } from "react-icons/fi";
import IssueDetail from '../issueDetail/IssueDetail.tsx';
import styles from './IssuePopup.module.css'; // Import the CSS module
import GlobalContext from '../../Context/GlobalContext.tsx';

export default function IssuePopup() {

    const [edit, setEdit] = useState(false);
    const [prevent, setPrevent] = useState(false);
    const {popUp, setPopUp} = useContext(GlobalContext)

    function backgroundClick(e)
    {
        if(e.target.className === styles['wrapper'])
         setPopUp(false);
    }
    function issueClick()
    {
        setPopUp(true);

    }

    return (
        <div className={styles["wrapper"]} onClick={backgroundClick}>
            <div className={styles["issue-popup"]} onClick={issueClick}>
                <div className={styles["issue-popup__header"]}>
                    <div className={styles["issue-popup__header-left"]}>
                        <FaAngleLeft className={styles["issue-popup__back-icon"]} />
                        <h1 className={styles["issue-popup__project-name"]}>Project Name</h1>
                    </div>
                    {
                        !edit ?
                            <FiEdit3 onClick={() => { setEdit(true); }} className={styles["issue-popup__edit-icon"]} />
                            :
                            <button className={styles["issue-popup__save"]} onClick={() => { setEdit(false); }}>Save</button>
                    }
                </div>

                {/* Labels Component (Placeholder) */}
                <div className={styles["issue-popup__labels"]}>
                    {/* Add labels component here */}
                </div>


                <form action="">
                <div className={styles["issue-popup__content"]}>
                    <h2 className={styles["issue-popup__subtitle"]}>Title:</h2>
                    <input type='text' name='title' id='title' className={styles["issue-popup__title"]} defaultValue='Issue Title'/>
                    <div className={styles["issue-popup__description"]}>
                        <h2 className={styles["issue-popup__subtitle"]}>Description:</h2>
                        <p className={styles["issue-popup__description-text"]}>Issue Description</p>
                    </div>
                </div>
                </form>

                {/* Issue Details Component */}
                <div className={styles["issue-popup__details"]}>
                    <IssueDetail title="Created By" avatar={true} />
                    <IssueDetail title="Assigned to" avatar={true} add={edit} />
                    <IssueDetail title="Dependencies" add={edit} />
                    <IssueDetail title="Status" color={true} />
                    <IssueDetail title="Difficulty" />
                    <IssueDetail title="Priority" />
                </div>
            </div>
        </div>
    );
}