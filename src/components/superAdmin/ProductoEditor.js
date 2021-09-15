import React, { useEffect, useState } from 'react'
import MainHolder from '../common/MainHolder'
import { useParams } from "react-router-dom";
import { useProducto } from '../../contexts/ProductoContext';
import { Col, Form, Row } from 'react-bootstrap';
import { FaAdjust } from 'react-icons/fa';
import Producto from './ProductoClasificable'

export default (props) => {
    const { id } = useParams();
    const { productos } = useProducto()
    const [current, setCurrent] = useState({})

    useEffect(() => {
        productos && setCurrent(productos.find(p => p.id == id))
    }, [productos])

    const { alias, nombre, precio } = current

    return (
        <MainHolder>
            <Row className="justify-content-center pt-3 px-2">
                <Col xs={12} md={11} className="d-flex  justify-content-center">
                    {productos && <Producto {...current} editable={true} expand={true} />}
                </Col>

                <Col md={12} className="bg-info">
                    <Form>
                        <Form.Group className="mb-2">
                            <Form.Label>
                                Alias
                            </Form.Label>
                            <Form.Control placeholder={alias ? alias : "alias del producto"} />
                        </Form.Group>


                        <Form.Group className="mb-2">
                            <Form.Label>
                                Nombre
                            </Form.Label>
                            <Form.Control placeholder={nombre ? nombre : "nombre del producto"} />
                        </Form.Group>
                    </Form>
                </Col>
                <Col xs={12} className="bg-warning d-flex justify-content-center align-items-center">
                    <FaAdjust />
                </Col>
            </Row>

        </MainHolder>
    )
}