import React from 'react';
import {
Nav,
NavLink,
NavMenu,
NavBtn,
SignInBtn,
} from './NavbarElements';

const Navbar = () => {
return (
	<>
	<Nav>
		<NavMenu>
		<NavLink to='/Menu'>
			Menu
		</NavLink>
		<NavLink to='/Sets'>
			Sets
		</NavLink>
		<NavLink to='/Study'>
			Study
		</NavLink>
		</NavMenu>

		<NavBtn>
          <SignInBtn to='/signin'>Sign In</SignInBtn>
        </NavBtn>

	</Nav>
	</>
);
};

export default Navbar;
