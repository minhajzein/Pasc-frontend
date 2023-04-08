import React, { useState, useEffect } from "react";
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Tab,
	Tabs,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import Drawercomp from "../Drawer/Drawercomp";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleChange } from "../../redux/reducers/tabPath";

//⚡⚡⚡⚡ imports ⚡⚡⚡⚡

function Header() {
	const [value, setValue] = useState("/");
	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down("md"));
	const tabValue = useSelector(state => state.tabValue.value);

	const pages = [
		{ name: "home", link: "/" },
		{ name: "events", link: "/events" },
		{ name: "news", link: "/news" },
		{ name: "about", link: "/about" },
		{ name: "account", link: "/accounts" },
	];

	const dispatch = useDispatch();

	const handleOnchange = (e, value) => {
		dispatch(handleChange(value));
		setValue(value);
	};

	return (
		<AppBar
			position="fixed"
			sx={{ background: "linear-gradient(to right, black , #19484B)" }}
		>
			<Toolbar>
				<IconButton size="small" edge="start" color="inherit" aria-label="logo">
					<img width={25} src="/src/assets/images/pasc_logo.png" alt="logo" />
				</IconButton>
				<Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 900 }}>
					PASC
				</Typography>

				{isMatch ? (
					<Drawercomp pages={pages} />
				) : (
					<Tabs textColor="inherit" onChange={handleOnchange} value={tabValue}>
						{pages.map((page, index) => (
							<Tab
								key={index}
								label={page.name}
								component={Link}
								to={page.link}
								value={page.link}
							/>
						))}
					</Tabs>
				)}
			</Toolbar>
		</AppBar>
	);
}

export default Header;
