import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/landingpage/landing";
import home from "./components/homePage/home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={home} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
