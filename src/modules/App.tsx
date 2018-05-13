import * as React from "react";
import intl from "react-intl-universal";
import { Route, Switch } from "react-router-dom";
import { Activation } from "./activation/activation";
import { Dashboard } from "./dashboard/dashboard";

const locales = {
  "en-US": {}
};

class App extends React.Component<any, any> {
  public componentDidMount() {
    this.loadLocales();
  }

  public render() {
    return (
      <div>
        <h3>UPPERCASE</h3>
        <a href={"/dashboard"}>Dashboard</a>
        <br />
        <a href={"/activation"}>Activation</a>
        <Switch>
          <Route exact path="/dashboard" component={() => <Dashboard />} />
          <Route exact path="/activation" component={() => <Activation />} />
        </Switch>
      </div>
    );
  }

  private loadLocales() {
    intl
      .init({
        currentLocale: intl.determineLocale({ urlLocaleKey: "lang" }),
        locales
      })
      .then(() => {
        this.setState({ initDone: true });
      });
  }
}

export default App;
