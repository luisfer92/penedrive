import './bootstrap.min.css';
import './App.css';
import BarraNav from './components/BarraNav'
import UserProfile from './components/UserProfile'
import { ListGroup, Table } from 'react-bootstrap';

const dateOptions = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };

function App() {
  return (
    <>
      <BarraNav />

      <UserProfile />

      <div className="w-100 bg-info border pb-1">
        <h4 className="text-white p-4">Horario</h4>
        <div className="d-flex flex-column bg-white pb-1 shadow" style={{ borderTopLeftRadius: "25px", borderTopRightRadius: "25px", paddingTop: "30px" }}>

          <div className="d-flex px-2">

            <div className="border py-4 shadow-sm w-50">
              <p className="h5 text-center">Hoy</p>
              <p className="h5 text-center  "> 17:00 - cierre</p>
            </div>
            <div className="border py-4 shadow-sm w-50">
              <p className="h5 text-center">Mañana</p>
              <p className="h5 text-center  "> 17:00 - cierre</p>
            </div>

           

          </div>

          <div className="px-2">



            <h5 className="mt-4 mb-2 ps-2">Esta semana:</h5>
            <ListGroup>
              <ListGroup.Item>
                <p>Lunes - <span>17:00 - cierre</span></p>
              </ListGroup.Item>
              <ListGroup.Item>
                <p>Lunes - <span>17:00 - cierre</span></p>
              </ListGroup.Item>
              <ListGroup.Item>
                <p>Martes - <span>Libre</span></p>
              </ListGroup.Item>
              <ListGroup.Item>
                <p>Miercoles - <span>12:00 - 16:00</span>  <span>20:00 - 00:00</span></p>
              </ListGroup.Item>
              <ListGroup.Item>
                <p>Jueves - <span>09:30 - 17:00</span></p>
              </ListGroup.Item>
              <ListGroup.Item>
                <p>Lunes - <span>17:00 - cierre</span></p>
              </ListGroup.Item>
              <ListGroup.Item>
                <p>Lunes - <span>17:00 - cierre</span></p>
              </ListGroup.Item>

            </ListGroup>

          </div>

        </div>
      </div>

    </>


  );
}

export default App;
