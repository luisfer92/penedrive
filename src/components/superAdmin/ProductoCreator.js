import React, { createRef, useState } from 'react'
import { Col, Form, Row, Button } from 'react-bootstrap'
import { useProducto } from '../../contexts/ProductoContext'
import MainHolder from '../common/MainHolder'
import box from '../../assets/box.png'
import { FaAngleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import SecondaryHolder from '../common/SecondaryHolder'




export default (props) => {
    const { categorias } = useProducto()
    const [error, setError] = useState(null)
    const nombreInput = createRef(null)
    const precioInput = createRef(null)
    const categoriaInput = createRef(null)


    const handleSubmit = () => {
        if (nombreInput.current && precioInput.current && categoriaInput.current) {
            const nombre = nombreInput.current.value
            const precio = precioInput.current.value
            const categoriaID = categoriaInput.current.value

            if (nombre && precio && categoriaID) {
                console.log(`${nombre}: ${precio}€ cat-(${categoriaID})`)
            } else {
                setError("Debes rellenar todos los campos")
            }

        }

    }


    return (



        <SecondaryHolder title={"Nuevo producto"} back={"/productos"}>

            <Form as={Row} className="text-white px-4 py-4 justify-content-center rounded rounded-3" >
                <Col xs={11} className="d-flex justify-content-center py-2 mb-2">
                    <img src={box} className="mx-auto rounded-circle bg-warning border border-5 border-white shadow-lg" style={{ width: "220px" }} />
                </Col>
                <Row className="pt-3 mb-2 border rounded rounded-3 border-white bg-oscuro ">
                    <Form.Group as={Col} xs={12} sm={6} lg={4} className="pb-4">
                        <Form.Label>
                            Nombre
                    </Form.Label>
                        <Form.Control placeholder="Nombre del producto" ref={nombreInput} />
                    </Form.Group>

                    <Form.Group as={Col} xs={12} sm={6} lg={4} className="pb-4">
                        <Form.Label>
                            Precio
                    </Form.Label>
                        <Form.Control placeholder="Precio del producto" ref={precioInput} />
                    </Form.Group>

                    <Form.Group className="" as={Col} xs={12} lg={4} className="pb-4">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Select id="categorias" ref={categoriaInput}>
                            <option value={0}> Categoria del producto </option>
                            {categorias && categorias.map(
                                c => <option value={c.id}>{c.nombre}</option>
                            )
                            }
                        </Form.Select>
                    </Form.Group>
                </Row>


                {error && <p className="fs-3 text-danger w-100 text-center">{error}</p>}

                <Col xs={4} sm={4} className="d-md-flex  p-0 mt-lg-3 me-2">
                    <Button variant="warning " onClick={handleSubmit} className="w-100 text-dark">Perfilar</Button>
                </Col>

                <Col xs={7} sm={4} className="d-md-flex mt-lg-3 p-0">
                    <Button variant="success" onClick={handleSubmit} className="w-100">Crear</Button>
                </Col>

            </Form>
        </SecondaryHolder>
    )
}