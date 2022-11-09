/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import LoginPage from '../pages/LoginPage/LoginPage';
import AboutPage from '../pages/AboutPage/AboutPage';
import LogoutPage from '../pages/LogoutPage/LogoutPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import UnauthorizedPage from '../pages/UnauthorizedPage/UnauthorizedPage';

import routes from './ProtectedRoutes';

import Layout from './Layout';
import RequireAuth from './RequireAuth';

const MainRouter = () => {
	const { login } = useAuth();

	return (
		<Routes>
			<Route element={<Layout />}>
				{/* public routes */}
				<Route path="/about" element={<AboutPage />} />
				<Route path="/error" element={<ErrorPage />} />
				<Route path="/unauthorized" element={<UnauthorizedPage />} />
				<Route path="/logout" element={<LogoutPage />} />
				<Route path="/login" element={<LoginPage loginCallback={login} />} />

				{/* Private routes */}
				{routes.map((route) => (
					<Route key={route.path} element={<RequireAuth allowedRoles={route.allowedRoles} />}>
						<Route path={route.path} element={route.element} />
					</Route>
				))}

				{/* catch all  */}
				<Route path="*" element={<Navigate to="/login" replace />} />
			</Route>
		</Routes>
	);
};

export default MainRouter;
