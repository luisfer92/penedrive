import React, { useEffect, useState } from 'react'
import { Container, Row, Button, Modal, Col } from 'react-bootstrap'
import { useProducto } from '../../contexts/ProductoContext'
import ProductoCategoria from '../common/productoCategoria';

import firebase from 'firebase/app';
import 'firebase/firestore';

export default function (props) {
    const { show, setShow, categoria } = props

    const { productos, upgradeProductoBulk } = useProducto()

    const [agregados, setAgregados] = useState([])
    const [eliminados, setEliminados] = useState([])
    const [upload, setUpload] = useState(false)




    const [huerfanos, setHuerfanos] = useState([])
    
    const [propios, setPropios] = useState([])

    useEffect(() => {
        if (show && productos) {
            console.log("cambiando huerfanos")
            const h = productos ? productos.filter((p) => p.categoria_id == undefined) : []
            const p = (productos && categoria) ? productos.filter(p => p.categoria_id === categoria.id) : []
            setHuerfanos(h)
            setPropios(p)
            
        }else{
            setHuerfanos([])
            setPropios([])
           
        }
        setAgregados([])
        setEliminados([]) 

    }, [show, upload])



    const handleAgregar = (productoId, operation) => {
        console.log(operation + " a categoria ")
        
        operation == "+" && setAgregados([...agregados,productoId])
        operation == "-" && setAgregados(agregados.filter(id => id === productoId))
       
    }

    const handleEliminar = (productoId, operation) => {
        operation == "+" && setEliminados([...agregados, productoId])
        operation == "-" && setEliminados(agregados.filter(id => id === productoId))
    }


    const handleModificar = () => {

        upgradeProductoBulk(agregados, { categoria_id: categoria.id })
        upgradeProductoBulk(eliminados, { categoria_id: firebase.firestore.FieldValue.delete() }, true)
        
        setUpload(true)
    }

    console.log(agregados)
    return (
        <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
            <Modal.Header className="bg-oscuro text-white" closeVariant="white" closeButton>
                <Modal.Title className="text-white">{categoria && categoria.nombre}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-claro position-relative">
                <Row className="d-flex justify-content-center pb-5">

                    <Col xs={12} md={11}>
                        <Row className="d-flex justify-content-around ">


                            {propios.map((producto) => {
                                return (
                                    <ProductoCategoria id={producto.id} producto={producto} propio={true} agregar={handleEliminar} eliminar={handleEliminar} />
                                )
                            })}
                            {huerfanos.map((producto) => {

                                return (
                                    <ProductoCategoria id={producto.id} producto={producto} agregar={handleAgregar} eliminar={handleAgregar} />
                                )
                            })}

                        </Row>



                    </Col>

                </Row>
                <div className=" w-100 fixed-bottom ">
                    <Row className="d-flex justify-content-around bg-oscuro py-2">
                        <Col xs={12} md={9} lg={2} xl={3}>
                            <Button variant="success w-100 " onClick={handleModificar}> Guardar </Button>
                        </Col>
                    </Row>

                </div>

            </Modal.Body>
        </Modal>
    )
}