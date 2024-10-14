"use client"; //this is a client component

import React, { useState } from 'react';
import styles from './Navbar.module.css';
import Image from 'next/image';

const Navbar = () => {
	//manage menu visibility
	const[isOpen, setIsOpen] = useState(false);

	//toggle the menu open/closed
	const toggleMenu = () => {
		setIsOpen(prevState => !prevState);
	};

	return(
		<nav className={styles.navbar}> 
			<div className={styles.navbarLeft}>
				<a href="/" className={styles.logo}>
					<Image src="/Logo.png" alt="ZENior logo" width={150} height={50}/>
				</a>
			</div>
			<button className={styles.hamburger} onClick={toggleMenu}>&#9776;</button>

			<div className={`${styles.navbarMain} ${isOpen ? styles.showMenu : ' '}`}>
				<ul className={styles.navLinks}>
					<li>
						<a >Student Project Proposals</a>
					</li>
					<li>
						<a >Faculty Advisor Project Proposals</a>
					</li>
					<li>
						<a >Faculty Advisor Directory</a>
					</li>
					<li>
						<a >My Project and Team</a>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
