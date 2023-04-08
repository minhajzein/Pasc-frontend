import "./App.css";
import UserRoutes from "./routes/UserRoutes";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

//⚡⚡⚡⚡import⚡⚡⚡⚡

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/*" element={<UserRoutes />} />
			</Routes>
		</Router>
	);
}
export default App;
