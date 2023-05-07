import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function Public() {
	const user = useSelector(state => state.user.value);
	const location = useLocation();

	return user !== null ? (
		<Navigate to="/" state={{ from: location }} replace />
	) : (
		<Outlet />
	);
}

export default Public;
