import React, { Suspense } from "react";

import { Router, Switch } from "react-router-dom";
import history from "../history";

import LanguageSelector from "./common/LanguageSelector";

import "../config/i18n";
import GoogleAuth from "../services/auth/GoogleAuth";

const App = () => {
  return (
    <div className="ui container">
      <Suspense fallback={null}>
        <LanguageSelector />
        <Router history={history}>
          <div>
            <div>
              <GoogleAuth />
            </div>
            <Switch>
              {/* <Route path="/apps/edit/:id" component={AppEdit} /> */}
            </Switch>
          </div>
        </Router>
      </Suspense>
    </div>
  );
};

export default App;
