import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminPublic() {
	const adminToken = useSelector(state => state.adminToken.adminToken);
	const location = useLocation();

	return adminToken !== null ? (
		<Navigate to="/admin" state={{ from: location }} />
	) : (
		<Outlet />
	);
}

export default AdminPublic;
