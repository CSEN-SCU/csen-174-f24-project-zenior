import React from 'react';
import './Navbar.css';

const Navbar = () => {
	return(
		<nav className="navbar"> 
			<div className="navbar-left">
				<a href="/" className="logo">Logo Here</a>
			</div>
			<div className="navbar-main">
				<ul className='nav-links'>
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
