import { Redirect, Route } from "react-router";
import { useLocalStorageReducer } from "../hooks/useLocalStorageReducer";
import { useUser } from "../hooks/useUser";
import principalReducer from "../reducers/principalReducer";

const PrivateResidentRoute = (props) => {
  const user = useUser();
  const [principal, principalDispatch] = useLocalStorageReducer(
    "principal",
    null,
    principalReducer
  );

  if (!user || principal.roles[0].name !== "RESIDENT")
    return <Redirect to="/login" />; // redirects to login page

  return <Route {...props} />;
};

export default PrivateResidentRoute;
