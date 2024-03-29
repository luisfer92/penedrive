
import React, { useState } from 'react';
import { Button, Col, Form, InputGroup, Row, Dropdown, Spinner } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { FaDatabase, FaGlobe, FaPlus, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useProducto } from '../contexts/ProductoContext';
import CategoriaClasifier from './superAdmin/CategoriaClasifier';
import MainHolder from './common/MainHolder';
import AgregarProducto from './superAdmin/OrganizadorProductos';
import AbcClasifier from './superAdmin/AbcClasifier';
import PrecioClasifier from './superAdmin/PrecioCalisifier'
import { Link } from 'react-router-dom';




export default function ProductoIndex(params) {


    const [singleSelections, setSingleSelections] = useState([]);
    const [order, setOrderBy] = useState(["Categorias"])

    const { productos, categorias } = useProducto();



    return (

        <MainHolder>

            <div className="w-100 mx-auto">
                <h2 className="px-2 mt-2 text-white"> Productos </h2>

                <Row className="mx-auto bg-claro" style={{ justifyContent: "space-around" }}>

                    <Col xs={5} sm={4} md={2} className="bg-amarillo rounded shadow pt-1 px-3 pb-2 m-2 text-dark " >
                        <p className="text-end"><FaShoppingCart /></p>
                        <h4 className="text-center">1</h4>
                        <p className="text-sm text-center">Prestamos</p>
                    </Col>

                    <Col xs={5} sm={4} md={2} className="bg-azul rounded shadow pt-1 px-3 pb-2 m-2 text-white " >
                        <p className="text-end"><FaShoppingCart /></p>
                        <h4 className="text-white text-center">1</h4>
                        <p className="text-sm text-center">Deudas</p>
                    </Col>


                    <Col xs={5} sm={4} md={2} className="bg-dark rounded shadow pt-1 px-3 pb-2 m-2 text-white " >
                        <p className="text-end"><FaGlobe /></p>
                        <h4 className="text-white text-center">{productos ? productos.length : "..."}</h4>
                        <p className="text-sm text-center">Productos</p>
                    </Col>

                    <Col as={Link} to="/productos/nuevo" xs={5} sm={4} md={2} className="nounderline bg-dark rounded shadow pt-1 px-3 pb-2 m-2 text-white " >
                        <p className="text-end"><FaDatabase /></p>
                        <h4 className="text-white text-center"><FaPlus /></h4>
                        <p className="text-sm text-center">Nuevo</p>
                    </Col>

                </Row>




            </div>





            <div className="border-top border-white mx-auto h-100 " style={{ overflowY: "hidden" }}>

                <Form className="text-white py-3 w-100 d-flex justify-content-center" style={{ height: "10%" }}>


                    <Typeahead
                        className="w-75"
                        id="labelkey-example"
                        labelKey={(option) => `${option.nombre} ${option.codBarras}`}
                        options={[
                            { nombre: 'Pan 100M', codBarras: '123456789' },
                            { nombre: 'Pan chapata crital', codBarras: '123456789' },
                            { nombre: 'Pan cereales', codBarras: '123456789' },
                            { nombre: 'Galletas Oreo', codBarras: '123456789' },
                            { nombre: 'Mayonesa Prima', codBarras: '123456789' },
                            { nombre: 'Salsa cheddar', codBarras: '123456789' },
                        ]}
                        placeholder="¿Nombre del producto?"
                    />








                </Form>





                <div className=" bg-claro pb-2 shadow mx-auto " style={{ borderTopLeftRadius: "25px", borderTopRightRadius: "25px", paddingTop: "30px", maxHeight: "90%" }}>

                    <Form.Group as={Row} className="px-2 justify-content-end mx-auto h-25" >
                        <Form.Label as={Col} className="text-end h-100 my-auto ">Orden:</Form.Label>

                        <Dropdown as={Col} className="col-auto">
                            <Dropdown.Toggle variant="warning" className=" border border-dark">
                                {order}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>

                                <Dropdown.Item onClick={() => { setOrderBy("Nombre") }}>Nombre</Dropdown.Item>
                                <Dropdown.Item onClick={() => { setOrderBy("Precio") }}>Precio</Dropdown.Item>
                                <Dropdown.Item onClick={() => { setOrderBy("Categorias") }}>Categorias</Dropdown.Item>

                            </Dropdown.Menu>
                        </Dropdown>


                    </Form.Group>
                    <div className="h-75 w-100 mx-auto bg-dark">
                        {


                            (productos && categorias) ?
                                order == "Categorias" ? <CategoriaClasifier /> : null
                                :
                                <div className="d-flex bg-oscuro justify-content-center align-items-center" style={{ minHeight: "33vh" }}>
                                    <Spinner animation="border" variant="light" />
                                </div>
                        }

                        {
                            order == "Nombre" ? <AbcClasifier /> : null

                        }

                        {
                            order == "Precio" ? <PrecioClasifier /> : null

                        }
                    </div>






                </div>








            </div>




        </MainHolder>














    )
}