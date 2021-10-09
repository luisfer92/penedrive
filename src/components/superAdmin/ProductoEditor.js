import React, { useEffect, useRef, useState } from 'react'
import MainHolder from '../common/MainHolder'
import { Link, useParams } from "react-router-dom";
import { useProducto } from '../../contexts/ProductoContext';
import { Col, Form, Row, InputGroup, Spinner } from 'react-bootstrap';
import { FaAdjust, FaEuroSign, FaBox, FaFingerprint, FaLock, FaShareAlt, FaThumbsUp, FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import Producto from './ProductoClasificable'
import SecondaryHolder from '../common/SecondaryHolder';



const FormItem = (props) => {
    const { nombre, value, holder, lock = false, cambios, handleChange, saved } = props
    const [initial, setInitial] = useState(value)
    const [autosave, setAutosave] = useState(null)
    const saving = (cambios && Object.keys(cambios).includes(nombre.toLowerCase()) && autosave)


    const setValue = (event) => {
        const val = event.target.value.trim().toLowerCase()
        var newCambio = {}
        if (initial !== val) {
            newCambio[nombre.toLowerCase()] = val
            const newChanges = Object.assign({}, cambios, newCambio)

            setInitial(val)
            handleChange(newChanges)
        } else {

        }
    }


    const handleItemChange = (event) => {
        console.log(initial)
        const val = event.target.value
        if ((val !== "") && (initial !== val)) {
            if (autosave) {
                console.log("sigues escribiendo")
                clearTimeout(autosave)
                setAutosave(setTimeout(() => { setValue(event) }, 2000))
            } else {
                console.log("has empezado a escribir")
                setAutosave(setTimeout(() => { setValue(event) }, 2000))
            }
        } else {
            console.log("los valores de inicio y actual coinciden")
            clearTimeout(autosave)
            setAutosave(false)
        }

    }


    return (
        <Form.Group className="mb-2" as={Col} xs={12}>
            <Form.Label>
                {nombre}
            </Form.Label>
            <InputGroup className="mb-2">

                <Form.Control placeholder={value ? value : holder} readOnly={lock} onChange={handleItemChange} />


                {lock && <InputGroup.Text className="text-warning fs-1 bg-transparent"><FaLock /></InputGroup.Text>}
                {(saving && !saved) && <InputGroup.Text className="text-warning fs-1 bg-transparent"><Spinner animation="grow" /></InputGroup.Text>}

            </InputGroup>

        </Form.Group>

    )
}



const CategoriaEdicion = (props) => {
    const { children, nombre, icono } = props

    const [active, setActive] = useState(false)

    return (

        <Col sm={12} lg={12} xl={6} className={`${active ? "border" : "border-top"} border-white border-3 rounded rounded-2 px-2 mb-sm-2 h-auto my-2`}>

            <Col xs={12} className={`${!active ? "border border-3" : "border-bottom"} border-white fs-3 d-flex py-auto justify-content-center  text-white`} onClick={() => setActive(!active)}>
                <span className="me-2 text-capitalize">{nombre}</span>
                <span>{icono}</span>
            </Col>

            <Col xs={12} className="px-2">
                {active && children}

            </Col>



        </Col>
    )
}


const Categoria = (props) => {
    const { nombre, id } = props

    return <option value={id}>{nombre}</option>
}


const Editor = (props) => {
    const { id } = useParams();
    const { productos, categorias, upgradeProducto } = useProducto()
    const [current, setCurrent] = useState({})
    const [cambios, setCambios] = useState(null)
    const [autosave, setAutosave] = useState(null)
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        productos && setCurrent(productos.find(p => p.id == id))
    }, [productos])

    useEffect(() => {
        cambios && upgradeProducto(id, cambios)
    }, [cambios])

    const getCategoria = (catId) => {
        const categoria = categorias.find(c => c.id === catId)
        return categoria
    }

    const save = (cambios) => {
        console.log("Guardando los cambios en firebase")
        setCambios(cambios)
        setSaved(true)
    }

    const handleSave = (cambios) => {
        console.log("cambio requrido")
        console.log(cambios)
        setSaved(false)
        if (autosave) {
            console.log("sigues modificando el formulario")
            window.clearTimeout(autosave)
            setAutosave(window.setTimeout(() => { save(cambios) }, 5000))
        } else {
            console.log("has modificado el formulario")
            setAutosave(window.setTimeout(() => { save(cambios) }, 5000))
        }
    }

    const handleDropdowns = (event) => {
        const { value, id } = event.target

        console.log(id)
        if (id === "categorias") {
            handleSave(Object.assign({}, cambios, { categoria_id: value }))
        }
        if (id === "iva") {
            handleSave(Object.assign({}, cambios, { iva: value }))
        }
    }




    const { nombre, precio, unidades, paquetes, peso, iva, categoria_id } = current
    const { codigo_barras, codisis_id } = current
    const categoria = categoria_id && getCategoria(categoria_id)

    return (
        <SecondaryHolder title={"Editar - "+nombre} back="/productos">
            <Row className="justify-content-center justify-content-lg-around mx-auto w-100 align-items-center pt-2" >

                
                <Col xs={12} md={8} lg={4} xl={3} className="d-flex  justify-content-center align-items-center ">
                    {productos && <Producto {...current} editable={true} expand={true} />}
                </Col>

                <Col md={12} lg={7} xl={8} className=" text-white py-2 px-0" >
                    <Form as={Row} className="bg-oscuro justify-content-around">



                        <FormItem nombre="Nombre" value={nombre} holder="Nombre del producto" handleChange={handleSave} cambios={cambios} saved={saved} />
                        <Form.Group className="mb-2" as={Col} xs={12} >
                            <Form.Label>Categoria</Form.Label>
                            <Form.Select id="categorias" onChange={handleDropdowns}>
                                {categoria ? <Categoria {...categoria} /> : <option> Categoria del producto </option>}
                                {categorias && categorias.map(c => c.id !== categoria_id ? <Categoria {...c} /> : null)}
                            </Form.Select>
                        </Form.Group>

                        <CategoriaEdicion nombre="exclusivo">

                            <Form.Group className="mb-2 ps-3 ps-md-0 d-sm-flex d-lg-block justify-content-center pt-2 bg-info" as={Col} xs={12} >
                                <Form.Check
                                    inline
                                    label="No"
                                    name="no_exclusivo"
                                    type='checkbox'
                                    id='no'
                                    className="w-100 w-md-auto  my-2 my-md-auto  w-lg-100 "


                                />
                                <Form.Check
                                    inline
                                    label="Andalucia"
                                    name="andalucia"
                                    type='checkbox'
                                    id='andalucia'
                                    className="w-100 w-md-auto  my-2 my-md-auto  w-lg-100 "


                                />
                                <Form.Check
                                    inline
                                    label="Levante"
                                    name="levante"
                                    type='checkbox'
                                    id='levante'
                                    className="w-100 w-md-auto  my-2 my-md-auto w-lg-100 "
                                />

                                <Form.Check
                                    inline
                                    label="Canarias"
                                    name="canarias"
                                    type='checkbox'
                                    id='canarias'
                                    className="w-100 w-md-auto my-2 my-md-auto  w-lg-100 "

                                />

                                <Form.Check
                                    inline
                                    label="Baleares"
                                    name="baleares"
                                    type='checkbox'
                                    id='baleares'
                                    className="w-100 w-md-auto  my-2 my-md-auto  w-lg-100 "

                                />

                                <Form.Check
                                    inline
                                    label="Santa justa"
                                    name="santa_justa"
                                    type='checkbox'
                                    id='santa_justa'
                                    className="w-100 w-md-auto  my-2 my-md-auto  w-lg-100 "

                                />



                            </Form.Group>



                        </CategoriaEdicion>

                        <CategoriaEdicion nombre="identificacion" icono={<FaFingerprint />}>

                            <FormItem nombre="ID" value={id} hoder="Id del producto" lock handleChange={handleSave} saved={saved} />
                            <FormItem nombre="codigo_barras" value={codigo_barras} hoder="Codigo de barras del producto" handleChange={handleSave} saved={saved} />
                            <FormItem nombre="codisis_id" value={codisis_id} hoder="Codigo de barras del producto" handleChange={handleSave} saved={saved} />


                        </CategoriaEdicion>

                        <CategoriaEdicion nombre="valor" icono={<FaEuroSign />}>

                            <FormItem nombre="Precio" value={precio} hoder="Precio del producto" handleChange={handleSave} saved={saved} />

                            <Form.Group className="mb-2" as={Col} xs={12}>
                                <Form.Label>IVA</Form.Label>
                                <Form.Select id="iva" onChange={handleDropdowns}>
                                    <option>{iva ? iva : "IVA del producto"}</option>
                                    <option value="10">10%</option>
                                    <option value="4">4%</option>
                                    <option value="21">21%</option>
                                </Form.Select>
                            </Form.Group>
                        </CategoriaEdicion>



                        <CategoriaEdicion nombre="empaquetado" icono={<FaBox />}>

                            <FormItem nombre="Unidades" value={unidades} holder="unidades por caja" handleChange={handleSave} saved={saved} />

                            <FormItem nombre="Paquetes" value={paquetes} holder="paquetes por caja" handleChange={handleSave} saved={saved} />

                            <FormItem nombre="Peso" value={peso} holder="peso del paquete" handleChange={handleSave} saved={saved} />

                        </CategoriaEdicion>



                    </Form>
                </Col>

            </Row>

        </SecondaryHolder>
    )
}


export default Editor