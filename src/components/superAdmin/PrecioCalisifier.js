import React, { useState } from 'react'
import { Button, Col, Form, InputGroup, Row, Dropdown, Spinner, Nav } from 'react-bootstrap';
import { useProducto } from '../../contexts/ProductoContext';
import ProductoCategoria from '../common/productoCategoria';
import Producto from './ProductoClasificable'


export default () => {
    const { productos } = useProducto()

    const ordenar=()=>{
        window.productos=productos
        return productos.sort((a,b)=> a.precio - b.precio)
    }

    return (
        <Row className="justify-content-around" style={{ maxHeight: "80vh", overflow: "auto" }}>
            {ordenar().map(p=><Producto {...p}/>)}
        </Row>

    )

}