import logo from './logo.svg';
import './App.css';
import { Fragment } from 'react'
import { Switch, Route } from 'react-router-dom';
import { MDBContainer, MDBInput } from 'mdbreact'
import { BrowserRouter as Router } from 'react-router-dom';
import Mainmenu from './components/commons/menu';
import UenValidator from './components/views/uenValidator';
import WeatherForecast from './components/views/weatherForecast';

const ServiceOne = () => {
  return (
    <MDBContainer>
      <MDBInput>
        uen number here
      </MDBInput>
    </MDBContainer>
  )
}

function App() {
  return (
    <Fragment className="App">
      <Router>
        <Mainmenu/>
        <Switch>
          <Route path='/uenValidator' component={UenValidator}/>
          <Route path='/weatherForecast' component={WeatherForecast}/>
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
