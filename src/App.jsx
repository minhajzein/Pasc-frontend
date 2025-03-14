import './App.css'
import AdminRoutes from './routes/AdminRoutes'
import UserRoutes from './routes/UserRoutes'
import { Route, Routes } from 'react-router-dom'
import PersistLoginComp from './components/user/UserLogin/PersistLogin'
import { ToastContainer } from 'react-toastify'
import AdminPersist from './components/admin/Login/AdminPersist'

//⚡⚡⚡⚡imports⚡⚡⚡⚡

function App() {
	return (
		<>
			<Routes>
				<Route element={<PersistLoginComp />}>
					<Route path='/*' element={<UserRoutes />} />
				</Route>
				<Route element={<AdminPersist />}>
					<Route path='/admin/*' element={<AdminRoutes />} />
				</Route>
			</Routes>
			<ToastContainer />
		</>
	)
}
export default App
