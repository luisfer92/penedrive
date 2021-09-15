import React from 'react'
import { Col, ListGroup, Row, Accordion, Container } from 'react-bootstrap'

export default function Dia(props) {

    const { nombre, turnos, libre = false,euro=false } = props
    const bgColor = libre ? "bg-success" : "bg-oscuro"
    const textColor=euro?"text-warning":"text-white"
    return (
        <Col md={12} lg={12} xl={10} className={`p-3 ${bgColor} m-2 rounded shadow-lg ${textColor}`}>
            <p className="text-uppercase">{nombre}:</p>
            

                <div className={`d-flex flex-column w-100 py-4 `} style={{ alignItems: "center" }}>
                    {libre && <p className="text-center ">Libre</p>}
                    {(!libre) && <p className="text-center ">{turnos[0]}</p>}
                    {(!libre && turnos.length == 2) && <p className="text-center w-100 ">{turnos[1]}</p>}
                </div>

                <div className="text-dark" style={{ width: "100%" }}>
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



            


        </Col>
    )
}