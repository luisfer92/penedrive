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
            <Row >
                <Col xs={12} className="mt-2 bg-oscuro text-warning text-center fs-1">{active}</Col>
                
                <Col 
                    xs={2} 
                    lg={12} 
                    style={{ maxHeight: "65vh", overflow: "auto" }}
                    className="border border-end border-dark border-4"
                    >
                    <Row className="py-lg-2 px-0 px-md-2 justify-content-md-around">
                        {generaAlphabet(productos).map(letra => {
                            return (
                                letra!=active?<Col
                                    xs={12}
                                   
                                    lg={"auto"}
                                    onClick={() => setActive(letra)}
                                    className="my-2 py-2 text-center mx-lg-2 bg-oscuro px-lg-5 text-warning">

                                    {letra}
                                </Col>:null
                            )
                        })}
                    </Row>
                </Col>
                <Col xs={10} lg={12} style={{ maxHeight: "65vh", overflow: "auto" }}>

                    <Row className=" justify-content-md-between px-3 px-md-4 bg-claro">
                        {generaProductos(productos, active)}
                    </Row>


                </Col>

            </Row>






        </>
    )
}