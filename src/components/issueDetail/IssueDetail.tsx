import React, { useState } from 'react';
import { RiAccountCircleLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import styles from './IssueDetail.module.css';

export default function IssueDetail({ title = "Title", name = "John Doe", attribute = "attribute", avatar = false, color = false, add = false }) {

    const [addingFields, setAddingFields] = useState(false);


    function handleAddButton() {
        setAddingFields(!addingFields)
    }

    return (
        <div className={styles["issue-detail"]}>
            <h4 className={styles["issue-detail__title"]}>{title}</h4>
            <div className={styles["issue-detail__content"]}>
                {
                    avatar ? (
                        <div className={styles["issue-detail__avatar"]}>
                            <RiAccountCircleLine className={styles["issue-detail__avatar-icon"]} />
                            <span className={styles["issue-detail__avatar-name"]}>{name}</span>
                        </div>
                    ) : (
                        <div className={styles["issue-detail__attribute"]}>
                            {color ? <div className={styles["issue-detail__color-indicator"]}></div> : null}
                            <span className={styles["issue-detail__attribute-text"]}>{attribute}</span>
                        </div>
                    )
                }
                {
                    avatar ? (
                        <div className={styles["issue-detail__avatar"]}>
                            <RiAccountCircleLine className={styles["issue-detail__avatar-icon"]} />
                            <span className={styles["issue-detail__avatar-name"]}>{name}</span>
                        </div>
                    ) : (
                        <div className={styles["issue-detail__attribute"]}>
                            {color ? <div className={styles["issue-detail__color-indicator"]}></div> : null}
                            <span className={styles["issue-detail__attribute-text"]}>{attribute}</span>
                        </div>
                    )
                }
                <div className={styles["issue-detail__add-container"]}>
                    <div
                        className={`${styles["issue-detail__addFields"]} ${addingFields ? styles["issue-detail__addFields--visible"] : ""
                            }`}
                    >
                        {color ? <input className={styles["color-input"]} type="color" /> : null}
                        <input className={styles["issue-detail__name"]} type="name" placeholder="Name" />
                        <button className={styles["issue-detail__submit"]} >Add</button>
                    </div>
                    {
                        add ? (
                            <div onClick={handleAddButton} className={styles["issue-detail__add"]}>
                                <FaPlus className={styles["issue-detail__add-icon"]} />
                            </div>
                        ) : null
                    }
                </div>
            </div>
        </div>
    );
}
