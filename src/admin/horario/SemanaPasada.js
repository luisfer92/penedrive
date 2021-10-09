import moment from "moment";
import React, { useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useHorarioEditorContext } from "../../contexts/HorarioEditorContext";
import DiaBarraaHolder from "./DiaBarraaHolder";

moment.locale('es')

const SemanaInactiva = (props) => {
    const { semanaAnterior } = props
    return (
        <>
            <div className="h-50 ">
                <Row className="text-white p-0 m-0 h-100 w-100">
                    <DiaBarraaHolder>M</DiaBarraaHolder>
                    {semanaAnterior.dias.map((d) =>
                        <DiaBarraaHolder>
                            {d.trabajadores?.length || 0}
                        </DiaBarraaHolder>
                    )}
                </Row>
            </div>
            <div className="h-50">
                <Row className="text-white p-0 m-0 h-100 w-100">
                    <DiaBarraaHolder>N</DiaBarraaHolder>
                    {semanaAnterior.dias.map((d) =>
                        <DiaBarraaHolder>
                            {d.trabajadores?.length || 0}
                        </DiaBarraaHolder>
                    )}
                </Row>

            </div>
        </>
    )
}

const TramoHolder = (props) => {
    const [active, setActive] = useState(false)
    const { children } = props
    return (
        <Col className="border d-flex justify-content-center align-items-start"
            style={{height:"90%"}}
            xs={2}
            onClick={() => { setActive(!active) }}
        >
            {children}
        </Col>
    )
}

const tramoGenerator = (inicio, fin, step = 30) => {

    let diff = fin.diff(inicio, "minutes")
    let nextStep = null
    const tramos = [{ rpr: inicio.format("HH:mm"), compis: [], time: inicio }]


    while (diff > 0) {
        nextStep = nextStep ? nextStep.clone().add(30, "minutes") : inicio.clone().add(30, "minutes")
        const rpr = nextStep.format("HH:mm")
        tramos.push({ rpr: nextStep.format("HH:mm"), compis: [], time: nextStep })
        diff = fin.diff(nextStep, "minutes")
        console.log(`hay ${diff} de diferencia entre ${fin.format("DD-MM-YYYY HH:mm")} y ${nextStep.format("DD-MM-YYYY HH:mm")}`)
    }

    return tramos
}

const SemanaActiva = (props) => {
    const { tramo } = props
    
    const tramoPasado = { i: tramo.i.subtract("days", 7), f: tramo.f.subtract("days", 7) }
    const [currentTramo, setCurrentTramo] = useState(tramoGenerator(tramoPasado.i, tramoPasado.f))
    const scrollPane=useRef();

    const handleWheel=(ev)=>{
       
        
        scrollPane.current.scrollLeft +=ev.deltaY<0?100:-100
        
    }


    return (
        <Row className="bg-white mx-auto p-0 align-items-start h-100">
            <Col xs={12} className="p-0 m-0" style={{ height: "15%" }}>
                <p className="text-white w-100 m-0 bg-info text-capitalize">
                    {tramoPasado.i.format("dddd [pasado] HH:mm - " + tramoPasado.f.format("HH:mm"))}
                </p>
            </Col>
            <Col className="p-0 m-0 bg-warning"   style={{ height: "85%" }}>
                <Row className="m-0 p-0 bg-success flex-nowrap h-100 position-relative" style={{ overflowX: "scroll" }} 
                     onWheel={handleWheel}
                     ref={scrollPane}
                    >
                    
                    {currentTramo.map(t =>
                        <TramoHolder>
                            {t.rpr}
                        </TramoHolder>
                    )}

                </Row>
            </Col>
        </Row>
    )
}


export default () => {

    const { semanaAnterior, tramoHorario } = useHorarioEditorContext()


    return (
        <div className="bg-dark w-100 mx-auto m-0 p-0" style={{ height: "20%" }}>
            {tramoHorario ? <SemanaActiva tramo={tramoHorario} /> : <SemanaInactiva semanaAnterior={semanaAnterior} />}
        </div>
    )
}