import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from "styled-components";
import { AppMenu } from './components/AppMenu';
import { Car } from './components/car/Car';
import { Customer } from './components/customer/Customer'
import { Rute } from './components/rute/Rute'
const AppContainer = styled.div`
  width: 1000px;
  margin: 0 auto;
`;

function App() {
  return (
    <div className="App">
          <Router>
            <AppMenu/>
            <AppContainer>
              <Switch>
                <Route exact path = "/car">
                  <Car/>
                </Route>
                <Route path = "/customer">
                  <Customer/>
                </Route>
                <Route path = "/rute">
                  <Rute/>
                </Route>
                <Route path = "/models/:modelId">
                </Route>
                <Route path = "/cars/:id">
                </Route>
                <Route path = "/authorization">
                </Route>
              </Switch>
            </AppContainer>
          </Router>
    </div>
  );
}

export default App;
