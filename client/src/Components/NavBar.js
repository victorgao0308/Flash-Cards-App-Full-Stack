import React from 'react';
import {
Nav,
NavLink,
NavMenu,
NavBtn,
SignInBtn,
} from './NavbarElements';

let signInVal = "Sign In";
let signInTo = "/signin";
isLoggedIn();

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
		<NavLink to='/Review'>
			Review
		</NavLink>
		</NavMenu>

		<NavBtn>
          <SignInBtn to= {signInTo}>{signInVal}</SignInBtn>
        </NavBtn>

	</Nav>
	</>
);
};
export default Navbar;

function isLoggedIn() {
	let user = JSON.parse(localStorage.getItem("signed in as"));
	if (user) {
		signInVal = `Logged in as ${user}`;
		signInTo = '/menu'
	}
}
