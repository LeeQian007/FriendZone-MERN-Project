import LoginPage from "pages/LoginPage";
import HomePage from "pages/HomePage";
import ProfilePage from "pages/ProfilePage";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthWrapper = () => {
  const isAuth = Boolean(useSelector((state) => state.token));
  return isAuth ? <HomePage /> : <Navigate to="/" />;
};

export const routes = [
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/home",
    // element: <HomePage />,
    element: <AuthWrapper />,
  },
  {
    path: "/profile/:userId",
    element: <ProfilePage />,
  },
];
