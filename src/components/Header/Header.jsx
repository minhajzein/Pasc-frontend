import React, { useState } from "react";
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

function Header() {
	const [value, setValue] = useState(0);
	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down("md"));
	const pages = ["home", "events", "news", "about"];
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
					<Tabs
						textColor="inherit"
						value={value}
						onChange={(e, value) => setValue(value)}
					>
						{pages.map((page, index) => (
							<Tab key={index} label={page} />
						))}
					</Tabs>
				)}
			</Toolbar>
		</AppBar>
	);
}

export default Header;
