import React from 'react'
import { Col, ListGroup, Row, Accordion, Container } from 'react-bootstrap'

export default function Dia(props) {

    const { nombre, turnos, libre = false,euro=false } = props
    const bgColor = libre ? "bg-verde" : "bg-oscuro"
    const textColor=euro?"text-warning":libre?"text-dark":"text-white"
    return (
        <Col  sm={5} lg={3} xxl className={`p-3 h-100 ${bgColor} m-2 rounded shadow-lg ${textColor} mx-xl-2 d-xl-flex align-items-end`}>
            <Row className=" h-100 w-100 mx-auto">
            <p className="text-uppercase w-100">{nombre}:</p>
            

            <div className={`d-flex flex-column  py-4  justify-content-center`} style={{ alignItems: "center" }}>
                {libre && <p className="text-center ">Libre</p>}
                {(!libre) && <p className="text-center ">{turnos[0]}</p>}
                {(!libre && turnos.length == 2) && <p className="text-center w-100 ">{turnos[1]}</p>}
            </div>

            <div className="text-dark p-0" style={{ width: "100%" }}>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header >
                            Compis
                            </Accordion.Header>
                        <Accordion.Body>
                            <p>Compi 1</p>
                            <p>Compi 1</p>
                            <p>Compi 1</p>
                            <p>Compi 1</p>
                            <p>Compi 1</p>
                            <p>Compi 1</p>
                            <p>Compi 1</p>
                            <p>Compi 1</p>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>



            </Row>
            
            


        </Col>
    )
}