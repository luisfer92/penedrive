import React from 'react'
import { Col, Row, Button, Badge } from 'react-bootstrap'
import { FaMapMarkerAlt, FaUserAlt } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import { useLocal } from '../../contexts/LocalContext'


const Local = ({ local }) => {
    const { nombre, direccion, allowed_users, pic_url } = local
    const {setLocal} =useLocal()
    const history=useHistory()

    const handleSet=()=>{
        setLocal(local)
        history.push("/")
    }

    return (
        <Col className="rounded rounded-3 mx-2 p-0 border border-2 border-warning bg-oscuro shadow-lg"
            xs={10} md={5} lg={2}>


            <Row className="w-100 h-100 p-0 my-auto mx-0 ">
                <p className="fs-3 w-100 p-0 m-0 text-center border-bottom border-4 border-warning text-warning" style={{height:"10%"}}>{nombre}</p>

                <Row className="border-bottom border-white p-0 m-0" style={{ height: "200px" }}>

                    <img src={pic_url} className="w-100 h-100 p-0 my-auto" />

                </Row>


                <Row className="m-0 text-white p-0" >
                    <Col xs={2} className="d-flex align-items-center border-end border-2 border-white">
                        <FaMapMarkerAlt className="mx-auto" />
                    </Col>
                    <Col className="p-0" xs={10}>
                        <p className="my-auto text-center py-2">{direccion}</p>
                    </Col>
                    <Col xs={2} as={Badge} bg="warning" className="d-flex align-items-center justify-content-center p-0 fs-4">

                        {allowed_users.length}

                    </Col>
                    <Col className="p-0">
                        <p className="my-auto text-center py-2">Usuarios</p>
                    </Col>
                    
                </Row>

                <Row as={Button} variant="warning" className="m-0 border-top border-2 " onClick={handleSet}>
                        Seleccionar
                        </Row>

            </Row>


        </Col>
    )
}



export default (props) => {
    const { locales } = useLocal()

    return (


        <Row className="vw-100 align-items-start vh-100 bg-claro p-0 mx-auto ">
            <Col xs={12} className=" bg-info">
                <p>Tus locales</p>
            </Col>
            <Row className="w-100 p-0 mx-0 flex-nowrap flex-md-wrap justify-content-md-center align-items-stretch px-3 px-md-0" style={{ overflowY: "auto" }}>
                {locales && locales.map(l => <Local local={l} onClick={() => console.log("tocado")} />)}
            </Row>

        </Row>

    )
}