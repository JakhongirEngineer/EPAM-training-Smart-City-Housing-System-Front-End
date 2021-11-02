import { Redirect, Route } from "react-router";
import { useUser } from "../hooks/useUser";

export const PrivateAdminRoute = (props) => {
  const user = useUser();
  //TODO check if user is NOT Admin
  if (!user) return <Redirect to="/login" />; // redirects to login page

  return <Route {...props} />;
};
