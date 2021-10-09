import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { database } from '../../firebase'
import MainHolder from './MainHolder'
import Producto from '../superAdmin/ProductoClasificable'
import { useProducto } from '../../contexts/ProductoContext'
import { Col, Form, Row, Button } from 'react-bootstrap'
import { useMesage } from '../../contexts/MessageContext'


const AlarmaProductos = (props) => {
    const { id } = props
    const { productos } = useProducto()
    const [current, setCurrent] = useState(null)
    const { sendMensaje } = useMesage()
    const que=useRef()
    const cuanto=useRef()
    const [motivoVal, setMotivoVal] = useState(0)

    const motivos = ["Selecciona motivo", "No queda", "Esta en mal estado"]

    useEffect(() => {
        productos && setCurrent(productos.find(p => p.id === id))
    }, [id, productos])

    const manageSend = () => {
        console.log("enviando....")
        if(motivoVal>0){
            const m=motivos[motivoVal]
            const mStr=motivoVal==1?`"${current.nombre}" se nos ha acabado`:`Cuidado "${current.nombre}" en mal estado; ${que.current?.value} he encontrado:${cuanto.current?.value}`
            sendMensaje({topic:"productos",__ref:"id",msg:mStr,__type:"alarm"})

        } 
    }

    return (
        <Row className="mx-auto bg-claro justify-content-center">
            <Col xs={12} sm={8} className="d-flex justify-content-center mb-2">
                <Producto {...current} editable={true} expand={true} />
            </Col>
            <Form as={Col} xs={12} className="bg-oscuro text-white py-2">
                <Form.Group className="mb-2">
                    <Form.Label>
                        ¿Cual es la alarma?
                    </Form.Label>
                    <Form.Select onChange={(ev) => setMotivoVal(ev.target.value)} value={motivoVal}>
                        {motivos.map((m, i) => <option value={i}>{m}</option>)}
                    </Form.Select>
                </Form.Group>
                <Row>
                    {motivoVal > 1 && <Form.Group as={Col} xs={12} className="my-2" >
                        <Form.Label>Cuanto</Form.Label>
                        <Form.Control type="number" ref={cuanto}/>
                    </Form.Group>}
                    {motivoVal > 1 && <Form.Group as={Col} xs={12}>
                        <Form.Label >Que le pasa</Form.Label>
                        <Form.Control as="textarea" ref={que}/>
                    </Form.Group>}
                    
                    {motivoVal > 0 && 
                        <Button as={Col} variant="warning" className="mt-2" onClick={manageSend}>
                            Enviar
                        </Button>
                    }

                </Row>

            </Form>
        </Row>

    )
}


export default (props) => {

    const { topic, ref } = useParams()

    return (
        <MainHolder>
            <h1>{topic}</h1>
            {topic == "productos" && <AlarmaProductos id={ref} />}
        </MainHolder>
    )
}