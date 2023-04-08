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

function Drawercomp(props) {
	const [openDrawer, setOpenDrawer] = useState(false);
	return (
		<>
			<Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
				<List>
					{props.pages.map((page, index) => (
						<ListItemButton onClick={() => setOpenDrawer(false)}>
							<ListItemIcon>
								<ListItemText key={index}>{page}</ListItemText>
							</ListItemIcon>
						</ListItemButton>
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
