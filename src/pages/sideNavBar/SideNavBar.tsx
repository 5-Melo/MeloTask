import React, { useState } from "react";
import styles from "./SideNavBar.module.css";
import { RiAccountCircleLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { FaListCheck, FaRegClock } from "react-icons/fa6";
import { GoStack } from "react-icons/go";
import { FaChevronDown } from "react-icons/fa";


interface SideNavBarProps {
    pages: { [key: string]: React.ComponentType };
}


export default function SideNavBar({ pages }: SideNavBarProps) {


    const [activePage, setActivePage] = useState<keyof typeof pages>("Dashboard");

    const handlePageChange = (page: keyof typeof pages) => {
        setActivePage(page);
    };

    const ActiveComponent = pages[activePage];

    return (
        <div className={styles["side-nav"]}>
            <header className={styles["side-nav__header"]}>
                <div className={styles["side-nav__logo"]}>
                    <h2 className={styles["side-nav__logo-text"]}>MeloTask</h2>
                    <h1 className={styles["side-nav__title"]}>{activePage}</h1>
                </div>
                <div className={styles["side-nav__profile"]}>
                    <div className={styles["side-nav__profile-main"]}>
                        <RiAccountCircleLine className={styles["side-nav__profile-icon"]} />
                        <div className={styles["side-nav__profile-info"]}>
                            <span className={styles["side-nav__profile-name"]}>John Doe</span>
                            <span className={styles["side-nav__profile-role"]}>Role</span>
                        </div>
                    </div>
                    <FaChevronDown className={styles["side-nav__profile-down"]} />
                </div>
            </header>

            <div className={styles["side-nav__grid"]}>
                <aside className={styles["side-nav__sidebar"]}>
                    {activePage === "Dashboard" ? <div className={styles["side-nav__create-issue"]}>
                        <div className={styles["side-nav__create-icon"]}>
                            <span>+</span>
                        </div>
                        <h4 className={styles["side-nav__create-title"]}>
                            Create new issue
                        </h4>
                    </div>
                        :
                        <div className={styles["side-nav__create-issue"]}>
                            <div className={styles["side-nav__create-icon"]}>
                                <span>+</span>
                            </div>
                            <h4 className={styles["side-nav__create-title"]}>
                                Create new Project
                            </h4>
                        </div>}
                    <nav className={styles["side-nav__nav"]}>
                        <ul className={styles["side-nav__nav-list"]}>
                            {[
                                { name: "Dashboard", icon: <RxDashboard /> },
                                { name: "Projects", icon: <LuBriefcaseBusiness /> },
                                { name: "Backlog", icon: <FaListCheck /> },
                                { name: "Gantt Chart", icon: <FaRegClock /> },
                                { name: "Project Template", icon: <GoStack /> },
                            ].map((item) => (
                                <li
                                    key={item.name}
                                    className={`${styles["side-nav__nav-item"]} ${activePage === item.name ? styles["side-nav__nav-item--active"] : ""
                                        }`}
                                    onClick={() => handlePageChange(item.name)}
                                >
                                    {item.icon}
                                    <span className={styles["side-nav__nav-name"]}>{item.name}</span>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                <section className={styles["side-nav__content"]}>
                    {
                        ActiveComponent && <ActiveComponent />
                    }
                </section>
            </div>
        </div>
    );
}
