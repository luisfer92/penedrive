import React, { useEffect, useState } from 'react'
import { Button, Col, Form, InputGroup, Row, Dropdown, Spinner } from 'react-bootstrap';
import { FaBug, FaBullhorn, FaEdit, FaEuroSign, FaExclamationTriangle, FaFingerprint } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useProducto } from '../../contexts/ProductoContext';



const BottomBar = (props) => {
    const { id } = props
    return (
        <Col xs={12}>
            <Row className="bg-warning ">

                <Col
                    as={Link}
                    to={`local/alarmas/productos/${id}`}
                    className="rounded border border-white p-2 m-2 shadow-lg fs-5 position-relative bg-oscuro">
                    <FaBullhorn className="text-white"/>
                    <span class="badge badge-light position-absolute text-warning" style={{ top: "0", right: "0" }}>4</span>
                </Col>

                <Col className="rounded border border-white p-2 m-2 shadow-lg fs-5 position-relative bg-oscuro">
                    <FaBug />
                    <span class="badge badge-light position-absolute text-warning" style={{ top: "0", right: "0" }}>4</span>
                </Col>
                <Col
                    className="rounded border border-white p-2 m-2 shadow-lg fs-5 position-relative bg-oscuro"
                    as={Link}
                    to={`productos/editar/${id}`}
                >
                    <FaEdit className="text-white" />
                </Col>
            </Row>
        </Col>
    )
}

const Categoria = (props) => {
    const { id } = props
    const { categorias } = useProducto()
    const [categoria, setCategoria] = useState({})

    useEffect(() => {
        categorias && setCategoria(categorias.find(c => c.id === id))
    }, [categorias])

    const { nombre } = categoria

    return (
        <Col xs={12}>
            <h4 className="text-center w-100 my-auto text-white py-4 mt-2 border-top border-2 border-white">{nombre}</h4>
        </Col>
    )
}

const IDProducto = (props) => {
    const { id } = props

    return (
        <Col xs={12} className="text-dark bg-warning py-1 mb-3">
            <Row className="d-inline fs-1">
                <span><FaFingerprint /></span>
                <span>{id}</span>
            </Row>


        </Col>
    )
}

const PrecioProducto = (props) => {
    const { precio } = props

    return (
        <Col xs={12} className="text-warning mt-2">
            <p className="text-center my-auto">
                <span className="fs-1">{(Math.round(precio * 100) / 100).toFixed(2)}</span>
                <span><FaEuroSign /></span>
            </p>

        </Col>
    )
}

export default (props) => {
    const { id, nombre, precio, categoria_id } = props
    const { expand = false, editable = false } = props
    return (
        <Col className="bg-oscuro text-white my-2  m-sm-2 text-center  shadow-lg rounded rounded-3 "
            xs={11} sm={expand ? 12 : 5} lg={expand ? 12 : 3} >

            <Row className="align-items-end h-100">
                {editable && <IDProducto id={id} />}

                <Col xs={12} className="my-2">
                    <p className="text-capitalize fs-3 text-center my-auto">{nombre}</p>
                </Col>
                {editable && <PrecioProducto precio={precio} />}


                {(editable && categoria_id) && <Categoria id={categoria_id} />}
                {!editable && <BottomBar id={id} />}

            </Row>



        </Col>
    )
}