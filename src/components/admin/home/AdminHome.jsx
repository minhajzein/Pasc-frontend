import React from "react";
import { motion as m } from "framer-motion";

function AdminHome() {
	return (
		<m.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="w-full"
		></m.div>
	);
}

export default AdminHome;
