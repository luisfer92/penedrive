import React from "react";
import { Col, Row, Button, ButtonGroup } from "react-bootstrap";
import MainHolder from "../components/common/MainHolder";
import { useCompis } from "../contexts/CompisContext";
import { useTrabajador } from "../contexts/TrabajadorContext";
import { useContrato } from "../contexts/ContratoContext";
import { Link } from 'react-router-dom';
import moment from 'moment'
import { FaEdit } from "react-icons/fa";


const ProfilePic = (props) => {
    const { profile_pic, nombre } = props
    return (
        <Col xs={3} className="bg-dark p-0 d-flex ">
            {
                profile_pic ?
                    <img src={profile_pic} className="w-100 my-auto" />
                    :
                    <p className="fs-4">{nombre.substring(0, 3)}</p>
            }
        </Col>
    )
}


const ContratoDuration = (props) => {
    const { inicio, duracion } = props


    var a, m, d= null
    var caducado=false
    var rpr="Caducado"

    if (duracion) {
        const diffDuration = moment.duration(duracion.diff(moment()));

        a = diffDuration.years()
        m = diffDuration.months()
        d = diffDuration.days()

        caducado = !(a > 0 || m > 0 || d > 0)
        
        if(!caducado) {rpr=`Fin en: ${a > 0 ? a + "m" : ""} ${m > 0 ? m + "m" : ""} ${d}d`}
        
        
    }else{
        rpr="indefinido"
    }

    return (
        <Col xs={8} className={`p-0 text-center border-start ${caducado?"text-dark bg-danger":""}`}>
            {rpr}
        </Col>

    )
}

const Contrato = (props) => {
    const { horas, inicio, duracion, sueldo, ss, jornada, vacaciones } = props
    return (
        <Row className="mx-auto p-0">
            <Col xs={12} className="text-center border">
                cargo
            </Col>
            <Col xs={4} className="d-flex justify-content-center align-items-center">
                <span className="fs-3 text-white">{horas}</span>
            </Col>
            <ContratoDuration inicio={inicio} duracion={duracion} />

        </Row>
    )

}


const Trabajador = (props) => {

    const { nombre, correo, id } = props
    const { getCompiByCorreo } = useCompis()
    const { getContratoByTrabajadorID, contratos } = useContrato()

    const contrato = getContratoByTrabajadorID(id)
    console.log(contratos)
    return (
        <Col className="mx-auto p-0 my-2 mx-md-2" xs={12} md={5} lg={3} >
            <Row className="mx-auto p-0 bg-claro-oscuro  shadow ">
                <ProfilePic nombre={nombre} profile_pic={getCompiByCorreo(correo)?.pic_url} />
                <Col className="text-white fs-4 pt-2  p-0">
                    <span className="ps-2 text-capitalize">{nombre}</span>
                    {contrato && <Contrato {...contrato} />}

                </Col>
                <Col xs={12} className="border-top p-0 d-flex justify-content-center">
                    <ButtonGroup className="w-100">
                        <Button className="border-end">Baja</Button>
                        <Button >Vacaciones</Button>
                        <Button variant="warning" >Editar</Button>
                    </ButtonGroup>
                </Col>
            </Row>
        </Col>
    )
}

export default (props) => {
    const { trabajadores } = useTrabajador()
    return (
        <MainHolder>
            <Col className="h-100 bg-white">
                <Row className="mx-auto px-1 justify-content-center justify-content-md-evenly" style={{ height: '90%', overflowY: "scroll" }}>
                    {trabajadores?.map(t => <Trabajador {...t} />)}


                </Row>
                <Link className="btn btn-success d-flex align-items-center justify-content-center" style={{ height: '10%' }} to="/plantilla/nuevo">Nuevo</Link>
            </Col>

        </MainHolder>
    )
}