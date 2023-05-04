import React, { useState } from "react";
import {
	Drawer,
	IconButton,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

function Drawercomp(props) {
	const [openDrawer, setOpenDrawer] = useState(false);
	return (
		<>
			<Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
				<List>
					{props.pages.map((page, index) => (
						<Link to={page.link}>
							<ListItemButton key={index} onClick={() => setOpenDrawer(false)}>
								<ListItemIcon>
									<ListItemText>{page.name}</ListItemText>
								</ListItemIcon>
							</ListItemButton>
						</Link>
					))}
				</List>
			</Drawer>
			<IconButton
				sx={{ color: "white", marginLeft: "auto" }}
				onClick={() => setOpenDrawer(!openDrawer)}
			>
				<MenuIcon />
			</IconButton>
		</>
	);
}

export default Drawercomp;
