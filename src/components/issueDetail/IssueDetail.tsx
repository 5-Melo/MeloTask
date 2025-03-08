import React, { useState, useEffect, useRef } from 'react';
import { RiAccountCircleLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import styles from './IssueDetail.module.css';

export default function IssueDetail({ title = "Title", name = null, avatar = false, color = false, add = false, selectBox = false , statuses=[]}) {

    const [addingFields, setAddingFields] = useState(false);
    const [attributes, setAttributes] = useState([name])
    const input = useRef(null);
    useEffect(()=>{
        setAddingFields(false)
        console.log(statuses);
        

    },[add])

    function handleAddButton() {
        (input.current.value && addingFields) ? setAttributes(atts => [...atts, input.current.value] ):null
        setAddingFields(!addingFields)
        

    }

    return (
        <div className={styles["issue-detail"]}>
            <h4 className={styles["issue-detail__title"]}>{title}</h4>
            <div className={styles["issue-detail__content"]}>
               { attributes.map((attribute)=>{
                console.log(attribute);
                   return (
                    (avatar && attribute) ? 
                    (<div className={styles["issue-detail__avatar"]}>
                           <RiAccountCircleLine className={styles["issue-detail__avatar-icon"]} />
                           <span className={styles["issue-detail__avatar-name"]}>{attribute}</span>
                    </div>) 
                   :
                   (!avatar && attribute)?
                    (
                       <div className={styles["issue-detail__attribute"]}>
                           {color ? <div className={styles["issue-detail__color-indicator"]}></div> : null}
                           <span className={styles["issue-detail__attribute-text"]}>{attribute}</span>
                       </div>
                   )
                   :
                   null
                )
                })}
                <div className={styles["issue-detail__add-container"]}>
                    <div className={`${styles["issue-detail__addFields"]} ${addingFields && add ? styles["issue-detail__addFields--visible"] : ""}`} >
                        {color ? <input className={styles["color-input"]} type="color" /> : null}
                        <input ref={input} className={styles["issue-detail__name"]} type="name" placeholder="Name" />
                        <button className={styles["issue-detail__submit"]} >Add</button>
                    </div>
                    {
                        (add && !selectBox) ? 
                            <div onClick={handleAddButton} className={styles["issue-detail__add"]}>
                                <FaPlus className={styles["issue-detail__add-icon"]} />
                            </div>
                        :
                        (selectBox) ? 
                        <select name="status" id="status" disabled={!add} className={styles['issue-popup__statusSelect']}>
                            {statuses.map((status)=>{                                
                                return (<option value={status.id}>{status.name}</option>)
                            })}
                        </select>
                        :
                        null
                    }
                </div>
            </div>
        </div>
    );
}
