
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Accordion, Col, Row, Button } from "react-bootstrap";
import { FaBug, FaEdit, FaEuroSign, FaExclamationTriangle, FaFingerprint, FaPlus } from "react-icons/fa";
import { useProducto } from "../../contexts/ProductoContext";
import AgregarProducto from '../superAdmin/OrganizadorProductos'
import Producto from './ProductoClasificable'




const Categoria = (props) => {
    const { categoria, handleEditar, productos } = props


    return (
        <Accordion className="p-2 acordion-flush" >
            <Accordion.Item eventKey="0" >
                <Accordion.Header as="h5">

                    <span className="text-capitalize">
                        {categoria.nombre} ({productos && productos.length})
                    </span>


                </Accordion.Header>
                <Accordion.Body className="border border-dark " >

                    <Row className="d-flex justify-content-center">

                        <Col sm={12} className="d-xs-flex d-sm-flex d-md-none border p-0 ">
                            <Button className="w-100" variant="dark" onClick={() => handleEditar(categoria)}>
                                editar categoria
                            </Button>
                        </Col>

                        {
                            productos && productos.map((p) => <Producto {...p} />)
                        }

                        <Col sm={12} className="d-none d-md-flex border p-0">
                            <Button className="w-100" variant="info" onClick={() => handleEditar(categoria)}>
                                editar categoria
                            </Button>
                        </Col>
                    </Row>



                </Accordion.Body>
            </Accordion.Item>

        </Accordion>
    )
}


export default function CategoriaClasifier(props) {
    const { categorias, productos } = useProducto()
    const [show, setShow] = useState(false)
    const [categoriaActiva, setCategoriaActiva] = useState()

    const handleEditar = (categoria) => {

        setCategoriaActiva(categoria)
        setShow(true)
    }


    return (
        <>

            <Row className="d-flex justify-content-center boder bg-oscuro mt-2" style={{ maxHeight: "76vh", overflowY: "auto" }}>


                {categorias && categorias.map((c) => {
                    const prodXcat = productos.filter((p) => p.categoria_id === c.id)
                    return (
                        <Col xs={12} sm={12} >
                            <Categoria handleEditar={handleEditar} categoria={c} productos={prodXcat} />
                        </Col>)
                })}
            </Row>
            <AgregarProducto show={show} setShow={setShow} categoria={categoriaActiva} />{/*modal*/}



        </>





    )
}