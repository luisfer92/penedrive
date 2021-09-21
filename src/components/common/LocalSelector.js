import React from 'react'
import { Col, Row, Button, Badge } from 'react-bootstrap'
import { FaHome, FaMapMarkerAlt, FaShopware, FaUserAlt } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import { useLocal } from '../../contexts/LocalContext'


const Local = ({ local }) => {
    const { nombre, direccion, allowed_users, pic_url } = local
    const { setLocal } = useLocal()
    const history = useHistory()

    const handleSet = () => {
        setLocal(local)
        history.push("/")
    }

    return (
        <Col className="rounded rounded-3 mx-2 p-0 border border-2 border-warning bg-oscuro shadow-lg"
            xs={12} sm={6} md={5} lg={3} xl={4}>


            <Row className="w-100 h-100 p-0 my-auto mx-0 ">
                <p className="fs-3 w-100 p-0 m-0 text-center border-bottom border-4 border-warning text-warning" style={{ height: "10%" }}>{nombre}</p>

                <Row className="border-bottom border-white p-0 m-0 " style={{ height: "200px" }}>

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


        <Row className=" p-0 mx-auto justify-content-center vh-100" >
            <Col xs={12} className="fs-4 text-white bg-dark p-0 m-0 d-flex justify-content-center shadow" style={{height:"10%"}}>
                <span className="fs-1 p-0 d-flex me-2 bg-warning rounded-circle justify-content-center align-items-center my-auto border border-2 border-white" style={{width:"50px",height:"50px"}}><FaHome /></span>
                <span className=" my-auto">Tus locales</span>

            </Col>
            <Col xs={12} xl={8}  className="align-items-center  d-flex px-0 px-lg-5  " style={{height:"80%"}}>
                <Row  className=" px-4 m-0 flex-nowrap flex-md-wrap justify-content-md-evenly  px-md-0 py-4 shadow-lg " style={{ overflow: "auto" }}>
                    {locales && locales.map(l => <Local local={l} onClick={() => console.log("tocado")} />)}
                </Row>
            </Col>
            <Col  md={3} lg={5} className="p-0 d-flex" style={{height:"9%"}}>
                <Button variant="warning" className="w-100 my-auto">Nuevo</Button>
            </Col>


        </Row>

    )
}