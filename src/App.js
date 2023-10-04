import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Converter from './Converter';
import List from './List';

import './App.css';

const NotFound = () => {
  return <h2>404 Not Found</h2>;
}

const App = () => {
  return (
    <Router basename="/react-currency">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">The Money Maker</Link>
        <div className="collapse navbar-collapse ml-auto" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto float-right">
          <li className="nav-item">
            <Link className="nav-link" to="/">List</Link>
          </li>
          <li className="nav-item">          
            <Link className="nav-link" to="/convert">Converter</Link>
          </li>
        </ul>
      </div>
      </nav>      
      <Switch>
        <Route path="/" exact component={List} />
        <Route path="/convert" component={Converter} />
        <Route component={NotFound} />
      </Switch>
      <div className="footer">Check my footer</div>
    </Router>
    
  );
}

export default App;
