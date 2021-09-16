import React, { useEffect, useState } from 'react'
import MainHolder from '../common/MainHolder'
import { useParams } from "react-router-dom";
import { useProducto } from '../../contexts/ProductoContext';
import { Col, Form, Row } from 'react-bootstrap';
import { FaAdjust, FaEuroSign, FaBox } from 'react-icons/fa';
import Producto from './ProductoClasificable'



const FormItem = (props) => {
    const { nombre, value, holder } = props

    return (
        <Form.Group className="mb-2" as={Col} xs={12}>
            <Form.Label>
                {nombre}
            </Form.Label>
            <Form.Control placeholder={value ? value : holder} />
        </Form.Group>

    )
}

const Separador = (props) => {
    const { nombre, icono } = props
    return (
        <p className="d-lg-none  w-100 text-end border-bottom border-white fs-3 my-2">{nombre} {icono}</p>
    )
}

const CategoriaEdicion = (props) => {
    const { children } = props
    console.log(children)
    return (
        <Col sm={12} lg={4} className="bg-info">
            {children}
        </Col>
    )
}


export default (props) => {
    const { id } = useParams();
    const { productos } = useProducto()
    const [current, setCurrent] = useState({})

    useEffect(() => {
        productos && setCurrent(productos.find(p => p.id == id))
    }, [productos])

    const { nombre, precio, unidades, paquetes, peso, iva, categoria_id } = current
    const { codBarras, codCodisis } = current
    return (
        <MainHolder>
            <Row className="justify-content-center justify-content-lg-around pt-3 px-2">

                <Col xs={12} md={11} lg={3} className="d-flex  justify-content-center">
                    {productos && <Producto {...current} editable={true} expand={true} />}
                </Col>

                <Col md={12} lg={6} className="bg-oscuro text-white py-2">
                    <Form as={Row}>



                        <FormItem nombre="Nombre" value={nombre} holder="Nombre del producto" />
                        <CategoriaEdicion>
                            <Separador nombre="valor" icono={<FaEuroSign />} />

                            <FormItem nombre="Precio" value={precio} hoder="Precio del producto" />

                            <Form.Group className="mb-2" as={Col} xs={12}>
                                <Form.Label>IVA</Form.Label>
                                <Form.Select >
                                    <option>{iva ? iva : "IVA del producto"}</option>
                                    <option value="10">10%</option>
                                    <option value="4">4%</option>
                                    <option value="21">21%</option>
                                </Form.Select>
                            </Form.Group>
                        </CategoriaEdicion>


                        <Separador nombre="empaquetado" icono={<FaBox />} />

                        <FormItem nombre="Unidades" value={unidades} holder="unidades por caja" />

                        <FormItem nombre="Paquetes" value={paquetes} holder="paquetes por caja" />

                        <FormItem nombre="Peso" value={peso} holder="peso del paquete" />




                    </Form>
                </Col>
                <Col xs={12} className="bg-warning d-flex justify-content-center align-items-center">
                    <FaAdjust />
                </Col>
            </Row>

        </MainHolder>
    )
}