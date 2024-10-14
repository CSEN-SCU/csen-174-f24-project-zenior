import React from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
	return(
		<nav className={styles.navbar}> 
			<div className={styles.navbarLeft}>
				<a href="/" className={styles.logo}>Logo Here</a>
			</div>
			<div className={styles.navbarMain}>
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
