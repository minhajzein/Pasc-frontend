import "./App.css";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";
import { Route, Routes } from "react-router-dom";
import PersistLoginComp from "./components/user/UserLogin/PersistLogin";

//⚡⚡⚡⚡import⚡⚡⚡⚡

function App() {
	return (
		<Routes>
			<Route element={<PersistLoginComp />}>
				<Route path="/*" element={<UserRoutes />} />
			</Route>
			<Route path="/admin/*" element={<AdminRoutes />} />
		</Routes>
	);
}
export default App;
