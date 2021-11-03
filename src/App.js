import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";
import AdminMainPage from "./pages/AdminMainPage";
import AdminManageResidentsPage from "./pages/AdminManageResidentsPage";
import LogoutPage from "./pages/LogoutPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import PrivateAdminRoute from "./private-routes/PrivateAdminRoute";
import PrivateResidentRoute from "./private-routes/PrivateResidentRoute";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/signUp" component={SignUpPage} />
          {/* <SignUpPage /> */}
          <Route exact path="/login" component={SignInPage} />
          <Route exact path="/logout" component={LogoutPage} />
          <PrivateAdminRoute exact path="/admin" component={AdminMainPage} />
          <PrivateAdminRoute
            exact
            path="/admin/residents"
            component={AdminManageResidentsPage}
          />

          <PrivateResidentRoute
            exact
            path="/residents"
            component={() => <h1>not implemented yet</h1>}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
