import React, { useState } from 'react'
import { Button, Col, Form, InputGroup, Row, Dropdown, Spinner, Nav } from 'react-bootstrap';
import { useProducto } from '../../contexts/ProductoContext';
import ProductoCategoria from '../common/productoCategoria';
import Producto from './ProductoClasificable'


const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));
alphabet.splice(15, 0, "Ñ")

const generaAlphabet = (productos) => {
    return alphabet.filter(l => productos.find(p => p.nombre.toUpperCase().startsWith(l)))
}

const generaProductos = (productos, letra) => {
    return productos.filter(p => {

        return p.nombre.toUpperCase().startsWith(letra)
    }).
        sort((a, b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0)).
        map(p => <Producto {...p} />)
}
export default (props) => {
    const { productos } = useProducto()
    const [active, setActive] = useState("A")


    return (
        <>
            <Row  >
                <Col xs={2} sm={2} lg={12} style={{ maxHeight: "80vh", overflow: "auto" }}>
                    <Row className="mx-auto py-lg-2  px-md-2 justify-content-md-around border-end border-3 border-info">
                        {generaAlphabet(productos).map(letra => {
                            return (
                                <Col
                                    xs={"auto"}
                                    sm={12}
                                    lg={"auto"}
                                    onClick={() => setActive(letra)}
                                    className="my-2 mx-auto text-center mx-lg-2 bg-info px-lg-5 text-white">

                                    {letra}
                                </Col>
                            )
                        })}
                    </Row>
                </Col>
                <Col xs={9} lg={12} style={{ maxHeight: "80vh", overflow: "auto" }}>

                    <Row className="justify-content-center">
                        {generaProductos(productos, active)}
                    </Row>


                </Col>

            </Row>






        </>
    )
}