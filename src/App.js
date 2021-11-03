import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./App.css";
import AdminMainPage from "./pages/AdminMainPage";
import AdminManageAdvertisementArchivesPage from "./pages/AdminManageAdvertisementArchivesPage";
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

          <PrivateAdminRoute
            exact
            path="/admin/advertisementArchives"
            component={AdminManageAdvertisementArchivesPage}
          />

          <PrivateResidentRoute
            exact
            path="/residents"
            component={() => <h1>not implemented yet</h1>}
          />
          <Route path="*" component={() => <Redirect to="/login" />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
