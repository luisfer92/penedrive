import reactDom from "react-dom";
import React from 'react'
import MainHolder from "../components/common/MainHolder";
import { Row, Form, Col, Button } from "react-bootstrap";

import moment from 'moment';



export default (props) => {


    const handleSubmit=(ev)=>{
        ev.preventDefault()
        console.log("enviando formulario")
    }


    return (
        <MainHolder>

            <Form as={Row} className="bg-dark text-white mx-auto py-2" onSubmit={handleSubmit}>
                <Form.Label as={Col} xs={12} className="my-4 ps-2">
                    Informacion del trabajador
                </Form.Label>
                <Form.Group as={Col} xs={12}>
                    <Form.Label >
                        Correo usuario
                    </Form.Label>
                    <Form.Control />
                </Form.Group>
                <Form.Group as={Col} xs={12}>
                    <Form.Label >
                        Nombre
                    </Form.Label>
                    <Form.Control />
                </Form.Group>

                <Form.Label as={Col} xs={12} className="ps-2 my-4">
                    Contrato del trabajador
                </Form.Label>
                <Form.Group>
                    <div  className="mb-3 d-flex justify-content-center">
                        <Form.Check type="checkbox">
                            <Form.Check.Input type="checkbox"/>
                            <Form.Check.Label className="ms-2">Trabajador indefinido</Form.Check.Label>
                            
                        </Form.Check>
                    </div>
                
                </Form.Group>

                <Form.Group as={Col} xs={12}>
                    <Form.Label >
                        Inicio contrato
                    </Form.Label>
                    <Form.Control type="date" />
                </Form.Group>

                <Form.Group as={Col} xs={12}>
                    <Form.Label >
                        Fin contrato
                    </Form.Label>
                    <Form.Control type="date" />
                </Form.Group>

                <Form.Group as={Col} xs={12}>
                    <Form.Label >
                        Horas de trabajo
                    </Form.Label>
                    <Form.Control type="number" />
                </Form.Group>
                <Form.Group as={Col} xs={6}>
                    <Form.Label >
                        Dias laborables
                    </Form.Label>
                    <Form.Control type="number" defaultValue={5}/>
                </Form.Group>
                <Form.Group as={Col} xs={6}>
                    <Form.Label >
                        Dias descanso
                    </Form.Label>
                    <Form.Control type="number" defaultValue={2}/>
                </Form.Group>
                <Form.Group as={Col} xs={12}>
                    <Form.Label >
                        Duracion vacaciones (dias)
                    </Form.Label>
                    <Form.Control type="number" defaultValue={30}/>
                </Form.Group>

                <Form.Group as={Col} xs={12}>
                    <Form.Label >
                        Sueldo (€)
                    </Form.Label>
                    <Form.Control type="number" />
                </Form.Group>

                <Form.Group as={Col} xs={12}>
                    <Form.Label >
                        Seguros sociales (€)
                    </Form.Label>
                    <Form.Control type="number" />
                </Form.Group>
                <Button  className="w-100 mt-2 bg-success" type="submit" value="tu_culo">Iniciar sesion</Button>


            </Form>
        </MainHolder>
    )
}