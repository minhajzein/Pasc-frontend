import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminPublic() {
	const adminToken = useSelector(state => state.adminToken.value);
	const location = useLocation();

	return adminToken !== null ? (
		<Navigate to="/" state={{ from: location }} replace />
	) : (
		<Outlet />
	);
}

export default AdminPublic;
