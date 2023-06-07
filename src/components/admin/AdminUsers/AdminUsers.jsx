import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useGetUsersQuery } from "../../../redux/adminApiSlices/usersApiSlice";
import UserPage from "../UserPage/UserPage";

//================= imports ===============================================================================================================

function AdminUsers() {
	const {
		data: users,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetUsersQuery();

	let content;

	if (isLoading) content = <p>Loding...</p>;
	if (isError) {
		toast.error("something went wrong, please try again", {
			position: "top-center",
			theme: "colored",
		});
	}
	if (isSuccess) {
		const { ids } = users;
		const tableContent = ids?.length
			? ids.map(userId => <UserPage key={userId} userId={userId} />)
			: null;
		content = (
			<table className="">
				<thead>
					<tr>
						<th scope="col">Username</th>
						<th scope="col">Roles</th>
						<th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody>{tableContent}</tbody>
			</table>
		);
	}
	return content;
}

export default AdminUsers;
