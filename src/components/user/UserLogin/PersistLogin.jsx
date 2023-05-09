import React, { useEffect, useRef, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useRefreshMutation } from "../../../redux/userApiSlices/authApiSlice";
import usePersist from "../../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../../redux/slices/authSlice";

//⚡⚡⚡⚡⚡ Imports ⚡⚡⚡⚡⚡

const PersistLoginComp = () => {
	const [persist] = usePersist();
	const token = useSelector(selectCurrentToken);
	const [truePersist, setTruePersist] = useState(false);
	const effectRan = useRef(false);

	const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
		useRefreshMutation();
	useEffect(() => {
		if (effectRan.current === true || process.env.NODE_ENV !== "development") {
			const verifyRefreshToken = async () => {
				try {
					const refreshtoken = await refresh();
					console.log(refreshtoken + "this is refresh token");
					setTruePersist(true);
				} catch (error) {
					console.log(error);
				}
			};
			if (!token && persist) verifyRefreshToken();
		}
		const setEffectRan = () => {
			effectRan.current = true;
		};

		return setEffectRan;
	}, []);

	let content;
	if (!persist) {
		console.log("no persist");
		content = <Outlet />;
	} else if (isLoading) {
		content = <p>Loading...</p>;
	} else if (isError) {
		console.log(error);
	} else if (isSuccess && truePersist) {
		content = <Outlet />;
	} else if (token && isUninitialized) {
		content = <Outlet />;
	}

	return content;
};

export default PersistLoginComp;
