import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./App.css";
import AdminMainPage from "./pages/admin/AdminMainPage";
import AdminManageAdvertisementArchivesPage from "./pages/admin/AdminManageAdvertisementArchivesPage";
import AdminManageResidentsPage from "./pages/admin/AdminManageResidentsPage";
import LogoutPage from "./pages/LogoutPage";
import BuyingAdvertisements from "./pages/resident/BuyingAdvertisements";
import ResidentAdvertisements from "./pages/resident/ResidentAdvertisements";
import ResidentHouses from "./pages/resident/ResidentHouses";
import ResidentsMainPage from "./pages/resident/ResidentsMainPage";
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
            component={ResidentsMainPage}
          />

          <PrivateResidentRoute
            exact
            path="/residents/:residentCode/advertisements"
            component={ResidentAdvertisements}
          />
          <PrivateResidentRoute
            exact
            path="/residents/:residentCode/houses"
            component={ResidentHouses}
          />

          <PrivateResidentRoute
            exact
            path="/buying/advertisements"
            component={BuyingAdvertisements}
          />

          <Route path="*" component={() => <Redirect to="/login" />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
