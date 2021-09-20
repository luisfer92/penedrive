import React, { useState } from 'react'
import { FaHandHoldingHeart, FaTimes, FaUtensils, FaTint } from 'react-icons/fa';
import { Button, Row, Col, Dropdown, ButtonGroup } from 'react-bootstrap';
import limpieza from './limpieza'
import MainHolder from './common/MainHolder';
import harinaImg from '../assets/harina.png'


const freidoras = [
    { numero: 1, fecha: "11/11/2021", compi: "Fulanito" },
    { numero: 2, fecha: "12/11/2021", compi: "Menganito" },
    { numero: 3, fecha: "13/11/2021", compi: "Alguien" },
    { numero: 4, fecha: "14/11/2021", compi: "ultimo" }
]

const harina = { fecha: "11/11/2020", compi: "Luisfer" }





const Freidora = (props) => {
    const { numero, fecha, compi } = props

    return (
        <Col className="bg-dark pb-5 pt-2 m-2 mx-lg-5 rounded border border-5 border-warning position-relative shadow" 
            sm={5} xs={10} md={3} lg={2} >


            <h1 className="align-items-center justify-content-center rounded-circle border border-3 border-warning text-white mx-auto my-auto d-flex " style={{ width: "64px", height: "64px" }}>{numero}</h1>
            <p className="mb-0 mt-2">Ultima vez: {compi}</p>
            <p className="text-center">{fecha}</p>
            <Button className="w-100 text-dark position-absolute" variant="warning" style={{ left: "0", bottom: "0" }}>Filtrar</Button>
        </Col>
    )
}

const FreidoraHolder = (props) => {
    const { freidoras } = props

    return (
        <>
            <p className="ps-2 h5 text-white"> Freidoras</p>

            <Row className="py-3 bg-white  flex-nowrap mx-auto w-100 justify-content-lg-center" flex={false} style={{ borderRadius: "25px", maxWidth: "100%", overflowX: "auto" }}>

                <Col className="text-white d-lg-none" md={1} sm={2} xs={1}>.</Col>

                {freidoras.map(freidora => <Freidora {...freidora} />)}




                <Col className="text-white d-lg-none" md={1} sm={2} xs={1} >.</Col>



            </Row>

            <Button className="mx-auto mt-2 " variant="success">Filtrar todas</Button>
        </>
    )
}


const Harina = (props) => {


    const { compi, fecha } = props

    return (
        <Row className="w-100 p-2 mx-auto">

            <Row className="w-100 mx-auto align-items-center bg-claro rounded-3 py-4 " >
                <p className="ps-4 h5 "> Harina</p>
                <Col xs={"auto"} sm="auto" md={4} className="d-none d-sm-flex h-100 align-items-center rounded" >
                    <div className=" d-flex  mx-auto align-items-center justify-content-center ">
                    <img src={harinaImg} className="border border-3 border-dark rounded-circle bg-warning shadow-lg" style={{width:"200px"}}/>

                    </div>
                </Col>

                <Col className="mx-auto h-auto border border-3 rounded border-warning bg-dark pt-2 shadow-lg ">

                    <p >Ultimo cambio:</p>
                    <p className="text-center">{compi} : {fecha}</p>
                    <Button variant="warning my-2 w-100 mx-auto"> Cambiar</Button>
                </Col>

            </Row>

        </Row>
    )
}

const CategoriaLimpiezaItem = (props) => {
    const { nombre, compi, fecha } = props
    const [active, setActive] = useState(false)
    return (
        <Col xs={12} sm={12} className="mb-2 px-2" >
            <Row className={`bg-warning text-dark mx-auto w-100 rounded rounded-3 p-0  border border-2 border-warning`} >
                <Col xs={active ? 10 : 12} sm={!active ? 12 : 11} className="text-center fs-4" onClick={() => setActive(!active)}>
                    {nombre}
                </Col>
                {active &&
                    <Col xs={1} sm={1} className="text-end" onClick={() => setActive(!active)}>
                        <FaTimes />
                    </Col>}
                {
                    active && <Col xs={12} md={4} className="bg-dark text-white text-center  py-2">
                        {compi}
                    </Col >
                }
                {active && <Col xs={12} sm={12} md={8} className="text-center bg-white text-center py-2 ">
                    {fecha}
                </Col>}

                {active && <Col className="p-0 bg-dark py-2 d-flex justify-content-center border-top border-warning">
                    <Button className="w-75" variant="warning">
                        Actualizar
                    </Button>
                </Col>}
            </Row>
        </Col>
    )
}

const CategoriaLimpieza = (props) => {
    const { nombre, icono, items } = props
    const [active, setActive] = useState(false)
    return (
        <Row className={`align-items-center  bg-dark p-0 mb-2 ${active && "border border-2 border-dark"} position-relative`}>
            {active && <Row className="w-100 mx-auto p-0  position-absolute" style={{ top: "0" }}>
                <p className="w-100 text-end pe-2 text-white "><FaTimes /></p> </Row>}

            <Col sm={12} xs={12} className={`p-0 d-flex align-items-center  ${active && "mb-2"}`}  >

                <Row className="d-flex w-100 mx-auto p-0" onClick={() => setActive(!active)} style={{ zIndex: "200" }}>
                    <Col xs={12} sm={12} className="d-flex align-items-center p-0" >
                        <p className="fs-3 w-100 text-center my-auto "  >  <span >{nombre}</span> {icono} </p>
                    </Col>

                </Row>

            </Col>
            <Row className="bg-white mx-auto pt-2 px-0">
                {
                    active && items.map((i) => <CategoriaLimpiezaItem {...i} />)
                }
            </Row>








        </Row>
    )
}

const Limpieza = (props) => {
    return (

        <Row className="w-100 mx-auto py-2 px-2">
            <p className="ps-0 h5 text-white ps-0"> Limpieza</p>

            <Col xs={12} sm={12} md={11} lg={8} className="mx-auto pt-3 px-4 bg-white rounded rounded-6">

                {limpieza.map(zona => <CategoriaLimpieza {...zona} />)}

            </Col>


        </Row>
    )
}


export default function Operativa(props) {

    return (
        <MainHolder>


            <h3 className="my-2 py-2 px-2">Operativa</h3>

            <div className="bg-dark py-2 w-100 text-white d-flex flex-column ">


                <FreidoraHolder freidoras={freidoras} />

                <Harina {...harina} />

                <Limpieza />

            </div>
        </MainHolder>
    )
}