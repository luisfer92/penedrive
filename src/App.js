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
import ProductoCreator from './components/superAdmin/ProductoCreator'
import { LocalProvider } from './contexts/LocalContext';
import LocalSelector from './components/common/LocalSelector';
import NotFoundPage from './components/common/NotFoundPage'

const history = createHistory();
function App() {


  return (
    <>
      <Router history={history}>

        <ProductoProvider>

          <AuthProvider>

            <LocalProvider>

              <Switch>
                <Route exact path="/" component={MainApp} />
                <Route exact path="/login" component={Login}/>
                <Route exact path="/local/selector" component={LocalSelector} />
                <Route exact path="/productos" component={ProductoIndex} />
                <Route exact path="/productos/nuevo" component={ProductoCreator} />
                <Route path="/productos/editar/:id" component={ProductoEditor} />
                <Route exatt path="/operativa" component={Operativa} />
                <Route path="*" component={NotFoundPage} />
              </Switch>

            </LocalProvider>

          </AuthProvider>

        </ProductoProvider>

      </Router>

    </>


  );
}

export default App;
