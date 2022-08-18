import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/landingpage/landing";
import home from "./components/homePage/home";
import Create from "./components/addVideogame/addVideogame";
import Detail from "./components/videoGame detail/Detail";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={home} />
          <Route exact path="/videogames" component={Create} />
          <Route exact path="/videogames/:id" component={Detail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
