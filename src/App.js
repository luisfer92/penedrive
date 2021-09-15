import './bootstrap.min.css';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import { ProductoProvider } from './contexts/ProductoContext';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import BarraNav from './components/common/BarraNav'
import MainApp from './components/MainApp'
import ProductoIndex from './components/ProductoIndex'

import createHistory from 'history/createBrowserHistory';
import Login from './components/common/Login'
import Operativa from './components/Operativa'
import ProductoEditor from './components/superAdmin/ProductoEditor'

const history = createHistory();
function App() {


  return (
    <>
      <Router history={history}>

        <ProductoProvider>
          <AuthProvider>

            <Switch>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/" component={MainApp} />
              <Route exact path="/productos" component={ProductoIndex}/>
              <Route path="/productos/:id" component={ProductoEditor}/>
              <Route exatt path="/operativa" component={Operativa}/>
            </Switch>

          </AuthProvider>
        </ProductoProvider>

      </Router>

    </>


  );
}

export default App;
