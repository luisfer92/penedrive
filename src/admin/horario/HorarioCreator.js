import React, { useRef, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaEuroSign, FaMoon, FaSun, FaUsers } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext'
import moment from 'moment'
import { HorarioEditorProvider, useHorarioEditorContext } from '../../contexts/HorarioEditorContext'
import { useCompis } from '../../contexts/CompisContext'
import SemanaPasada from './SemanaPasada'
import DiaBarraaHolder from './DiaBarraaHolder'


let primerLunesDelMes = moment().year(2020).month(10).date(1).day(8);
if (primerLunesDelMes.date() > 7)
    primerLunesDelMes.day(-6);

const Trabajador = (props) => {
    const { pic_url } = props
    return (
        <Col xs={12} sm={10} lg={8} as={"img"} src={pic_url} className="shadow rounded-circle  border border-2 border-white mx-auto d-block my-2"
            style={{ maxHeight: "100px", maxwidth: "100px" }} />
    )
}

const DiaHolder = (props) => {

    const { children } = props
    const { setTramoHorario } = useHorarioEditorContext()
    const { nombre, abbr, horas, trabajadores, tramos, tr_index, active } = props

    const length = trabajadores ? trabajadores.length : 0



    const handleSelecction = () => {
        console.log(abbr)
        setTramoHorario({ ...tramos[tr_index], dia_abbr: abbr })

    }




    return (
        <Col xs={active ? 9 : true}
            className="text-white p-0 d-flex justify-content-center align-items-start  h-100 position-relative border"
            style={{ overflowY: length > 0 ? "scroll" : "hidden" }}

        >

            <div className="py-2 d-block  h-100 p-0 mt-4 bg-warning" onClick={handleSelecction} >
                <div className={`p-0 w-100 text-center border-bottom border-start border-white shadow fs-6  ${length === 0 && "h-100"}`} style={{ position: "absolute", top: "0", left: "0" }}  >

                    <span className="d-block bg-oscuro text-warning">3500</span>
                    <span className="d-block bg-info">{length}/11</span>
                </div>

                {children}
            </div>

        </Col>
    )
}

const SemanaActiva = (props) => {
    const { semana, turnoAbr } = props
    return (
        semana?.dias.map(d =>
            <DiaHolder {...d} tr_index={turnoAbr === "M" ? 0 : 1}>
                {d.trabajadores?.map(t =>
                    <Trabajador {...t} />
                )}



            </DiaHolder>
        )
    )
}


const TrabajadorTriada = (props) => {
    const { pic_url } = props
    return (
        <Row className="bg-oscuro mx-auto p-0 border my-2 shadow " style={{ height: "70px" }}>
            <Col xs={2} className="d-flex align-items-center p-0 h-100  mx-auto p-0">
                <div className="w-100 h-100 mx-auto my-auto d-flex" style={{ overflowX: "hidden" }}>

                    <img src={pic_url} className="mx-auto my-auto" style={{ width: "100%", maxWidth: "64px", height: "100%", maxHeight: "64px" }} />
                </div>
            </Col>
            <Col xs={10} className="p-0 h-100 bg-dark">
                <Row className="mx-auto p-0 h-100 w-100 text-white">

                    <Col xs={2} className="d-flex align-items-center justify-content-center h-100 border-end">
                        ant
                    </Col>
                    <Col className="d-flex m-0 p-0 align-items-center justify-content-center bg-white h-100">
                        <Row className="ps-1 pe-0 w-100 bg-dark h-100 align-items-center" >
                            <Col xs={5} className="p-0">

                                <input type="time" className="w-100 p-0 d-flex justify-content-center" />
                            </Col>
                            <Col xs={5} className="p-0">

                                <input type="time" className="w-100" />
                            </Col>
                            <Col xs={2} className="d-flex bg-info h-50 m-0 align-items-center justify-content-center text-white " style={{fontSize:"10px"}}>
                                10.5
                            </Col>
                            <Col xs={5} className="p-0">

                                <input type="time" className="w-100 p-0 d-flex justify-content-center" />
                            </Col>
                            <Col xs={5} className="p-0">

                                <input type="time" className="w-100" />
                            </Col>
                            <Col xs={2} className="d-flex bg-info h-50 m-0 align-items-center justify-content-center text-white " style={{fontSize:"10px"}}>
                                10.5
                            </Col>

                            


                        </Row>
                    </Col>
                    <Col xs={2} className="d-flex align-items-center justify-content-center h-100 border-start">
                        sig
                    </Col>

                </Row>



            </Col>
        </Row>
    )
}

const DiaActivo = (props) => {

    const { compis } = useCompis()

    return <div className="mx-auto h-100 w-100 p-0 bg-claro" style={{ overflowY: "scroll" }}>

        {compis?.map(c =>
            <TrabajadorTriada {...c} />
        )}

       
    </div>
}



const SemanaHolder = (props) => {

    const { turnoAbr, handleTramoHorario } = props
    const { userAPI } = useAuth()
    const { semana, tramoHorario } = useHorarioEditorContext()



    return (
        <Row className="mx-auto h-100">

            {!tramoHorario &&

                <DiaBarraaHolder>
                    <div className={`p-0 w-100 text-center border-top border-white shadow fs-6 `} style={{ position: "absolute", top: "0", left: "0" }}  >

                        <span className="d-block bg-oscuro text-warning"><FaEuroSign /></span>
                        <span className="d-block bg-info"><FaUsers /></span>
                    </div>
                    {turnoAbr}
                </DiaBarraaHolder>
            }


            {tramoHorario ? <DiaActivo /> : <SemanaActiva semana={semana} turnoAbr={turnoAbr} />}
        </Row >
    )


}



const BarraDias = (props) => {


    const { tramoHorario, setTramoHorario } = useHorarioEditorContext()

    return (
        <Row className="bg-info text-white p-0 m-0" style={{ height: "5%" }}>
            <DiaBarraaHolder active={tramoHorario ? true : false}>
                {!tramoHorario ? <><FaSun />-<FaMoon /></> : <FaUsers />}
            </DiaBarraaHolder>
            {!tramoHorario && <>
                <DiaBarraaHolder >L</DiaBarraaHolder>
                <DiaBarraaHolder >M</DiaBarraaHolder>
                <DiaBarraaHolder >X</DiaBarraaHolder>
                <DiaBarraaHolder >J</DiaBarraaHolder>
                <DiaBarraaHolder >V</DiaBarraaHolder>
                <DiaBarraaHolder >S</DiaBarraaHolder>
                <DiaBarraaHolder >D</DiaBarraaHolder>
            </>
            }
            {
                tramoHorario &&
                <Col xs={10} className="h-100 bg-dark p-0 ">
                    <Row className="h-100 w-100 mx-auto">
                        <Col xs={2} className="justify-content-center d-flex align-items-center h-100">
                            ant
                        </Col>
                        <DiaBarraaHolder >
                            <div className="w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center" onClick={() => { setTramoHorario(null) }}>
                                {tramoHorario.dia_abbr.toUpperCase()}
                            </div>
                        </DiaBarraaHolder>
                        <Col xs={2} className="justify-content-center d-flex align-items-center h-100">
                            sig
                        </Col>

                    </Row>

                </Col>


            }

        </Row>
    )
}


const Horario = (props) => {
    const { tramoHorario } = useHorarioEditorContext()
    return (
        <div className="w-100 m-0 p-0" style={{ height: "65%" }}>
            {!tramoHorario &&
                <>
                    <div className="bg-claro-oscuro h-50 p-0 mx-auto w-100">
                        <SemanaHolder turnoAbr="M" />
                    </div>
                    <div className="bg-oscuro h-50">
                        <SemanaHolder turnoAbr="N" />
                    </div>
                </>
            }
            {tramoHorario && <SemanaHolder turnoAbr={tramoHorario.abbr} />}
        </div>)
}


export default (props) => {
    const semanaPasada = useRef()
    const apertura = "09:30"
    const cambioTurno = "17:00"
    const cierre = "23:59"
    const { compis } = useCompis()
    const t = [{ i: apertura, f: cambioTurno }, { i: cambioTurno, f: cierre }]
    return (
        <HorarioEditorProvider i={primerLunesDelMes} t={t}>
            <div className="vh-100 vw-100 bg-info p-0 m-0">
                <SemanaPasada ref={semanaPasada} />
                <BarraDias />
                <Horario />
                <div className="bg-dark w-100 mx-auto m-0 p-0 " style={{ height: "10%", overflowX: "hidden" }}>
                    <Row className="h-100  m-0 py-1 mx-auto  px-1" >
                        <div className="h-100  d-flex " style={{ overflowX: "scroll" }} >
                            {compis?.map(c =>
                                <Col className="h-100  d-flex justify-content-center align-items-center mx-2 ">
                                    <img src={c.pic_url} className="rounded-circle border border-2 border-white " style={{ height: "100%", width: "auto" }} />

                                </Col>
                            )}

                        </div>


                    </Row>

                </div>
            </div>
        </HorarioEditorProvider>

    )
}