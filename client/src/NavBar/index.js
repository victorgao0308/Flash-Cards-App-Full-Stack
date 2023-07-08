import React from 'react';
import {
Nav,
NavLink,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';

const Navbar = () => {
return (
	<>
	<Nav>
		<NavMenu>
		<NavLink to='/Home'>
			Home
		</NavLink>
		<NavLink to='/Sets'>
			Sets
		</NavLink>
		<NavLink to='/Study'>
			Study
		</NavLink>
		{/* Second Nav */}
		{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
		</NavMenu>

		<NavBtn>
          <NavBtnLink to='/signin'>Sign In</NavBtnLink>
        </NavBtn>

	</Nav>
	</>
);
};

export default Navbar;
