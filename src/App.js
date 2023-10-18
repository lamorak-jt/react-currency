import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Converter from './Converter';
import Header from './Header';
import Footer from './Footer';
import List from './List';

import './App.css';

const NotFound = () => {
  return <h2>404 Not Found</h2>;
}

const App = () => {
  return (    
    <Router basename="/react-currency">
      <div>
        <Header>      
        </Header>
        <div class="container-lg main-container">
          <Switch>
            <Route path="/" exact component={List} />
            <Route path="/convert" exact component={Converter} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <Footer>
        </Footer>        
      </div>
    </Router>  
    
  );
}

export default App;
