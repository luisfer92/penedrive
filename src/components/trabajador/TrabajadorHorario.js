import React from 'react'
import { Col, Container, ListGroup, Row } from 'react-bootstrap'
import TrabajadorDia from './TrabajadorDia'


export default function UserHorario() {
  return (
    <div className="w-100 bg-oscuro border pb-2">
      <h4 className="text-white p-4">Horario</h4>

      <div className="d-flex flex-column bg-white pb-2 bg-claro" style={{ borderTopLeftRadius: "25px", borderTopRightRadius: "25px", paddingTop: "30px" }}>

        <Row className="d-flex justify-content-around ">

          <Col xs={12} sm={"auto"} md={4} className="border py-4 mx-2 sm-m-0 shadow-sm bg-white">
            <p className="h5 text-center">Hoy</p>
            <p className="h5 text-center  "> 17:00 - cierre</p>
          </Col>


          <Col xs={12} sm={"auto"} md={4} className="border py-4 mx-2 sm-m-0 shadow-sm bg-white">
            <p className="h5 text-center">Mañana</p>
            <p className="h5 text-center  "> 17:00 - cierre</p>
          </Col>

          <Col xs={11} >

            <h5 className="mt-4 mb-2">Esta semana:</h5>

            <Row className="d-flex justify-content-around">

              <TrabajadorDia nombre="lunes" turnos={["17:00 - cierre"]} />
              <TrabajadorDia nombre="martes" libre={true} />
              <TrabajadorDia nombre="miercoles" turnos={["12:30 - 16:00", "20:00 - 00:00"]} euro={true} />
              <TrabajadorDia nombre="jueves" turnos={["17:00 - cierre"]} />
              <TrabajadorDia nombre="viernes" turnos={["17:00 - cierre"]} />
              <TrabajadorDia nombre="sabado" libre={true} />
              <TrabajadorDia nombre="domingo" turnos={["12:30 - 16:00", "20:00 - 00:00"]} euro={true} />



            </Row>



          </Col>
        </Row>

       







      </div>

    </div>


  )
}