import React, { useState } from 'react';
import { RiAccountCircleLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import styles from './IssueDetail.module.css';
import { useParams } from 'react-router-dom';

interface IssueDetailProps {
    title: string;
    attributes: (string | null)[];
    setAttributes?: React.Dispatch<React.SetStateAction<(string | null)[]>>;
    options: string[];
    avatar?: boolean;
    color?: boolean;
    add?: boolean;
    labelcreate?: boolean;
    colors?: string[];
}

const IssueDetail: React.FC<IssueDetailProps> = ({
    title,
    attributes,
    setAttributes,
    options,
    avatar = false,
    color = false,
    add = false,
    labelcreate = false,
    colors = []
}) => {
    const [addingFields, setAddingFields] = useState(false);
    const [newAttribute, setNewAttribute] = useState<string | null>(null);
    const [creaingLabel, setCreatingLabel] = useState(false);
    const [newLabel, setNewLabel] = useState('');
    const [labelColor, setLabelColor] = useState('#000000');

    const { id: projectId } = useParams<{ id: string }>();
    const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId');

    const handleClick = (option: string) => {
        if (!setAttributes) return;
        
        setAttributes(prev => {
            const newAttributes = [...prev];
            const index = newAttributes.indexOf(null);
            if (index !== -1) {
                newAttributes[index] = option;
            }
            return newAttributes;
        });
    };

    const handleAddButton = () => {
        setAddingFields(!addingFields);
        setCreatingLabel(false);
    };

    const handleAddAttribute = () => {
        if (newAttribute && setAttributes) {
            setAttributes([...attributes, newAttribute]);
            setNewAttribute(null);
            setAddingFields(false);
        }
    };

    const getAttributes = () => {
        return attributes.map((attribute, index) => {
            return avatar ? (
                <div key={index} className={styles["issue-detail__avatar"]}>
                    <RiAccountCircleLine className={styles["issue-detail__avatar-icon"]} />
                    <span className={styles["issue-detail__avatar-name"]}>{attribute}</span>
                </div>
            ) : (
                <div 
                    style={{ backgroundColor: colors?.[index] ? `${colors[index]}90` : undefined }} 
                    key={index} 
                    className={styles["issue-detail__attribute"]}
                >
                    <span className={styles["issue-detail__attribute-text"]}>{attribute}</span>
                </div>
            );
        });
    };

    const handleCreateLabel = async () => {
        if (newLabel && labelColor) {
            try {
                const response = await fetch(`http://localhost:8080/api/users/${userId}/projects/${projectId}/labels`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        name: newLabel,
                        color: labelColor
                    })
                });
                const data = await response.json();
                console.log(data);
                setNewLabel('');
                setLabelColor('#000000');
                setCreatingLabel(false);
            } catch (err) {
                console.error('Error creating label:', err);
            }
        }
    };

    return (
        <div className={styles["issue-detail"]}>
            <h4 className={styles["issue-detail__title"]}>{title}</h4>
            <div className={styles["issue-detail__content"]}>
                {getAttributes()}
                {add && (
                    <div className={styles["issue-detail__add-container"]}>
                        <div
                            className={`${styles["issue-detail__addFields"]} ${addingFields ? styles["issue-detail__addFields--visible"] : ""}`}
                        >
                            {creaingLabel ? (
                                <>
                                    <input
                                        type="color"
                                        className={styles["issue-detail__color-picker"]}
                                        value={labelColor}
                                        onChange={(e) => setLabelColor(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        className={styles["issue-detail__input"]}
                                        value={newLabel}
                                        onChange={(e) => setNewLabel(e.target.value)}
                                        placeholder="New label"
                                    />
                                    <button className={styles["issue-detail__submit"]} onClick={handleCreateLabel}>
                                        Create
                                    </button>
                                </>
                            ) : (
                                <>
                                    <select
                                        className={styles["issue-detail__select"]}
                                        value={newAttribute || ""}
                                        onChange={(e) => setNewAttribute(e.target.value)}
                                    >
                                        <option value="" disabled>Select an option</option>
                                        {options.map((option, index) => (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                    <button className={styles["issue-detail__submit"]} onClick={handleAddAttribute}>
                                        Add
                                    </button>
                                    {labelcreate && (
                                        <button 
                                            onClick={() => setCreatingLabel(true)} 
                                            className={styles["issue-detail__submit"]}
                                        >
                                            New
                                        </button>
                                    )}
                                </>
                            )}
                        </div>

                        <div onClick={handleAddButton} className={styles["issue-detail__add"]}>
                            <FaPlus className={styles["issue-detail__add-icon"]} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default IssueDetail;