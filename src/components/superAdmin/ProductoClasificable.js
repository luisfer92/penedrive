import React, { useEffect, useState } from 'react'
import { Button, Col, Form, InputGroup, Row, Dropdown, Spinner } from 'react-bootstrap';
import { FaBug, FaEdit, FaEuroSign, FaExclamationTriangle, FaFingerprint } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useProducto } from '../../contexts/ProductoContext';



const BottomBar = (props) => {
    const { id } = props
    return (
        <Row className="bg-info">

            <Col className="rounded border border-white p-2 m-2 shadow-lg fs-5 position-relative bg-oscuro">
                <FaExclamationTriangle />
                <span class="badge badge-light position-absolute text-warning" style={{ top: "0", right: "0" }}>4</span>
            </Col>

            <Col className="rounded border border-white p-2 m-2 shadow-lg fs-5 position-relative bg-oscuro">
                <FaBug />
                <span class="badge badge-light position-absolute text-warning" style={{ top: "0", right: "0" }}>4</span>
            </Col>
            <Col
                className="rounded border border-white p-2 m-2 shadow-lg fs-5 position-relative bg-oscuro"
                as={Link}
                to={`productos/${id}`}
            >
                <FaEdit className="text-white" />
            </Col>
        </Row>
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
        <div className="d-flex px-3 w-100 border-top border-white bg-info py-2 position-md-absolute"
            style={{ bottom: "0", left: "0" }}>
            <h4 className="text-center w-100 my-auto">{nombre}</h4>
        </div>
    )
}

const IDProducto = (props) => {
    const { id } = props

    return (
        <Col>
            <div className="d-flex bg-info  text-white justify-content-center border border-white my-3 py-2 fs-4">
                <span className="me-2"><FaFingerprint /></span>
                <span>{id}</span>
            </div>
        </Col>
    )
}

const PrecioProducto = (props) => {
    const { precio } = props

    return (
        <Col xs={12}>
            <p className="text-center my-auto">
                <span className="fs-3">{(Math.round(precio * 100) / 100).toFixed(2)}</span>
                <span><FaEuroSign /></span>
            </p>

        </Col>
    )
}

export default (props) => {
    const { id, nombre, precio, categoria_id } = props
    const { expand = false, editable = false } = props
    return (
        <Col className="bg-oscuro text-white my-2  m-sm-2 text-center  shadow-lg rounded"
            xs={12} sm={expand ? 12 : 5} lg={expand ? 12 : 3} >


            <Row className={`justify-content-center px-3`}  >
                {editable && <IDProducto id={id} />}

                <Col xs={12}>
                    <p className="text-capitalize fs-2 text-center my-auto">{nombre}</p>
                </Col>
                {editable && <PrecioProducto precio={precio} />}
            </Row>


            {(editable && categoria_id) && <Categoria id={categoria_id} />}
            {!editable && <BottomBar id={id} />}
        </Col>
    )
}