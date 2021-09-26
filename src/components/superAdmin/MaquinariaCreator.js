import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaBolt, FaBullhorn, FaEdit } from "react-icons/fa";
import { useLocal } from "../../contexts/LocalContext";
import { useMaquinaria } from "../../contexts/MaquinariaContext";
import MainHolder from "../common/MainHolder";

const FormularioMaquina = (props) => {

    const { selected } = props
    const { maquinas } = useMaquinaria()
    const numero=maquinas ? maquinas.filter(m => m.nombre === selected.nombre).length + 1 : 1
    const [alias, setAlias] = useState()
    const [marca, setMarca] = useState()
    const [modelo, setModelo] = useState()
    const [consumo, setConsumo] = useState()

    const {createMaquina}=useMaquinaria()

    const handleNuevaMaquina=()=>{
        const {nombre}=selected
        createMaquina({numero,alias,marca,modelo,consumo,nombre,status:"success"})
    }

    useEffect(()=>{
        console.log("pintando effecto")
        console.log(selected)
        setAlias(selected.nombre)
    },[selected])

    return (
        <Form as={Row} className="w-100 mx-auto align-items-center text-white align-items-start justify-content-center h-100 py-2 px-0">
            
            <Row className="w-100 h-25  mb-2 py-2  mx-auto">
                <Col xs={4} className="bg-warning shadow h-100 d-flex">
                    <img src={selected.pic} className="h-75 w-100  my-auto" />
                </Col>
                <Col xs={8} className="px-0 d-flex flex-column">
                    <h3 className="m-0 ms-2 text-white">{alias}</h3>
                    <p className="text-end m-0 pe-3 text-amarillo">({marca ? marca : "marca"}-{modelo ? modelo : "modelo"})</p>
                    <h3 className="text-center my-auto text-white"><span className="text-amarillo"> <FaBolt size={30} /> </span>{consumo ? consumo : "00"} Kw/h </h3>


                </Col>

            </Row>
            <Row className="h-75 bg-oscuro">

                <Form.Group as={Col} xs={4} className="py-2">
                    <Form.Label>
                        Numero
            </Form.Label>
                    <Form.Control value={numero} readOnly />
                </Form.Group>
                <Form.Group as={Col} xs={8} className="py-2">
                    <Form.Label>
                        Alias
             </Form.Label>
                    <Form.Control onChange={(ev) => setAlias(ev.target?.value)} defaultValue={alias}/>
                </Form.Group>
                <Form.Group as={Col} xs={5} className=" py-2">
                    <Form.Label>
                        Marca
             </Form.Label>
                    <Form.Control onChange={(ev) => setMarca(ev.target?.value)} />
                </Form.Group>
                <Form.Group as={Col} xs={7} className=" py-2">
                    <Form.Label>
                        Modelo
            </Form.Label>
                    <Form.Control onChange={(ev) => setModelo(ev.target?.value)} />
                </Form.Group>
                <Form.Group as={Col} xs={4} className=" py-2">
                    <Form.Label>
                        kw/h
            </Form.Label>
                    <Form.Control type="number" onChange={(ev) => setConsumo(ev.target?.value)} />
                </Form.Group>
                <Form.Group as={Col} xs={8} className=" py-2">
                    <Form.Label>
                        Tecnico
            </Form.Label>
                    <Form.Select>
                        <option>Selecciona tecnico</option>
                    </Form.Select>
                </Form.Group>
                <Button variant="warning p-0 m-0 text-dark" onClick={handleNuevaMaquina}>Agregar</Button>
            </Row>

        </Form>
    )
}


const MaquinaLocal = (props) => {
    const {nombre,pic,numero,marca,modelo,consumo,status,alias}=props
    return (
        <Row className="shadow bg-oscuro p-0 mx-auto my-2  text-white border border-2 border-amarillo">

            <Col as="img" xs={4} md={2} lg={1} src={pic} className="p-2  h-75 my-auto" />
            <Col className=" px-0 d-block border-start border-amarillo">
                <p className="ps-3 m-0 fs-4 d-block">{alias?alias:nombre} {`-${numero}-`}</p>
                <p className="text-end pe-1 m-0 border-bottom border-amarillo ">{marca}-{modelo}</p>
                <p className="text-center fs-4 my-4"><span className="text-amarillo me-2 fs-2"><FaBolt /></span>{consumo} kw/h</p>

            </Col>
            <Col xs={12} className="p-0">
                <Row className="justify-content-end mx-auto w-100">

                    <Col xs={4} md={2} lg={1} className="d-flex justify-content-center align-items-center">
                        Status:
                         <div className={`bg-${status} my-auto ms-2 rounded-circle border boder-white border-2`} style={{ width: "20px", height: "20px" }} />
                    </Col>
                    <Col as={Button} xs={5} className="text-dark bg-warning border border-amarillo">
                        Averia
                    </Col>
                    <Col as={Button}  className="text-amarillo border border-amarillo">
                        <FaEdit />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default (props) => {

    const { maquinas, disponibles } = useMaquinaria()
    const { local } = useLocal()
    const [selected, setSelected] = useState()

    return ( 
        <MainHolder>
            <div className="h-100 w-100 p-0 m-0 bg-oscuro" >

                <div className="d-flex row flex-column py-2 h-100 m-auto align-items-center" style={{}}>

                    <h5 className="text-white  w-100 my-auto ps-3">Maquinaria {local?.nombre}</h5>

                    <Col xs={12} lg={6} className="bg-claro px-0 py-2 my-auto" style={{ height: "80%", overflowY: "scroll" }}>
                        {maquinas && maquinas.map(m => <MaquinaLocal {...m} />)}
                    </Col>


                </div>

                <Row className="m-0 px-2 h-75 align-items-start bg-dark" >
                    <h5 className="p-0 my-auto text-white ">Maquinaria disponible</h5>
                    <div className="d-flex  rounded rounded-5  align-items-center h-75 bg-claro flex-lg-wrap justify-content-lg-evenly" style={{ overflowX: "scroll" }}>
                        {disponibles && disponibles.map(m =>
                            <Col xs={8} sm={4} md={3} className="shadow rounded ronded-3 h-75 mx-3 position-relative my-lg-4" >
                                <p className=" text-center d-block text-truncate my-auto bg-dark border border-2 border-amarillo text-amarillo">{m.nombre}</p>
                                <img src={m.pic} className="w-100 h-75 bg-oscuro p-2" />
                                <Button variant="warning w-100 position-absolute border border-2 border-amarillo " style={{ bottom: "0", left: "0" }} onClick={() => setSelected(m)}>Seleccionar</Button>
                            </Col>
                        )}
                    </div>

                </Row>
                {selected && <FormularioMaquina selected={selected} />}
            </div>

        </MainHolder>
    )
}