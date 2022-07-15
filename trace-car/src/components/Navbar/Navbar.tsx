import React from "react";
import { FaBars } from "react-icons/fa";
import {
	Container,
	EmptyBox,
	Logo,
	LogoH1,
	LogoImg,
	Menu,
	MenuItem,
	MenuLink,
	Nav,
	OpenMenu,
} from "./styled";

import LogoIMG from "/src/images/luniverse_symbol.png";

const Navbar = () => {
	return (
		<>
			<Container>
				<Nav>
					{/* Logo */}
					<Logo to="/">
						<LogoImg src={LogoIMG} />
						<LogoH1>Luniverse Car</LogoH1>
					</Logo>

					{/* Button to open menu */}
					{/* <OpenMenu>
						<FaBars />
					</OpenMenu> */}

					{/* Navbar menu */}
					<Menu>
						<MenuItem>
							<MenuLink to="/authtoken">AuthToken</MenuLink>
						</MenuItem>
						<MenuItem>
							<MenuLink to="/items">List</MenuLink>
						</MenuItem>
						<MenuItem>
							<MenuLink to="/mypage">MyPage</MenuLink>
						</MenuItem>
					</Menu>
				</Nav>
			</Container>
			<EmptyBox />
		</>
	);
};

export default Navbar;
