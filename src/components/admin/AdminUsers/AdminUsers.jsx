import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useGetUsersQuery } from "../../../redux/adminApiSlices/usersApiSlice";
import UserRow from "./UserRow";
import Loading from "../Loading/Loading";

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

	if (isLoading) content = <Loading />;

	if (isSuccess) {
		const { ids } = users;
		const tableContent = ids?.length
			? ids.map(userId => <UserRow key={userId} userId={userId} />)
			: null;
		content = (
			<div className="w-full p-2">
				<table className="w-full mt-12 md:mt-16 bg-slate-200 rounded">
					<thead className="bg-gray-400 border-2 border-black rounded">
						<tr>
							<th className="py-5 border-r border-black" scope="col">
								Profile
							</th>
							<th className="py-5 border-r border-black" scope="col">
								Name
							</th>
							<th className="py-5 border-r border-black" scope="col">
								Roles
							</th>
							<th className="py-5" scope="col">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>{tableContent}</tbody>
				</table>
			</div>
		);
	}
	return (
		<>
			{content}
			<ToastContainer />
		</>
	);
}

export default AdminUsers;
