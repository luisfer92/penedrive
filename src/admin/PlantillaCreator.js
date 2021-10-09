import React, { createRef, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import MainHolder from "../components/common/MainHolder";
import { Row, Form, Col, Button } from "react-bootstrap";
import { Pie } from 'react-chartjs-2'
import moment from 'moment';
import { useTrabajador } from '../contexts/TrabajadorContext';

import { useContrato } from '../contexts/ContratoContext'



const data = {
    labels: ['Cocina', 'Barra', 'Office'],
    datasets: [
        {
            label: '# of Votes',
            data: [0, 0, 0],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',

            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',

            ],
            borderWidth: 1,
        },
    ],
};

const SkillCounter = (props) => {
    const [cocina, setCocina] = useState(0)
    const [barra, setBarra] = useState(0)
    const [office, setOffice] = useState(0)
    const [total, setTotal] = useState(100)
    const [chartData,setChartData]=useState(data)
    const grafico=useRef()

    useEffect(() => {
        var newData=data
        newData.datasets[0].data=[cocina,barra,office]
        setChartData(newData)
        
        const suma = parseInt(cocina) + parseInt(barra) + parseInt(office)
        setTotal(100 - suma)
        console.log(grafico.current?.data)

    }, [cocina, barra, office])

    

     

    return (

        <Form.Group as={Col} xs={12} className="bg-claro text-dark">
            <Row className="mx-auto justify-content-center">
                <Col xs={12} md={6}>
                    {chartData && <Pie data={chartData} ref={grafico}/>}
                </Col>
            </Row>

            <p>Puntos:{total}</p>
            <Form.Label>Cocina:{cocina}</Form.Label>
            <Form.Range min="0" max="100" value={cocina} onChange={(ev) => (total > 0 || cocina > parseInt(ev.target.value)) && setCocina(ev.target.value)} />

            <Form.Label>Barra:{barra}</Form.Label>
            <Form.Range min="0" max="100" value={barra} onChange={(ev) => (total > 0 || barra > parseInt(ev.target.value)) && setBarra(ev.target.value)} />

            <Form.Label>Office:{office}</Form.Label>
            <Form.Range min="0" max="100" value={office} onChange={(ev) => (total > 0 || office > parseInt(ev.target.value)) && setOffice(ev.target.value)} />

        </Form.Group>
    )
}


const FormularioTrabajador = forwardRef((props, ref) => {


    const fotoHolder = useRef()
    const nombreInput = useRef()
    const correoInput = useRef()
    const telefonoInput = useRef()


    useEffect(() => {
        console.log(fotoHolder)
    }, [fotoHolder])


    useImperativeHandle(ref, () => ({

        getData() {

            //const foto = fotoHolder.current?.toDataURL('image/webp', 0.92)

            return {
                nombre: nombreInput.current?.value,
                correo: correoInput.current?.value,
                telefono: telefonoInput.current?.value
            }
        }

    }));


    const drawImage = (ev) => {
        console.log("archivo cambiado")
        const canvas = fotoHolder.current
        if (canvas) {
            const f = ev.target.files[0]
            var img = new Image()
            img.src = URL.createObjectURL(f)
            img.onload = () => {
                const cw = canvas.width
                const ch = canvas.height
                const context = canvas.getContext("2d")

                context.clearRect(0, 0, cw, ch);
                context.drawImage(img, 0, 0, img.width, img.height,     // source rectangle
                    0, 0, cw, ch);


            }
        }

    }


    return (
        <Form as={Row} className="py-2 m-0 p-0" ref={ref}>

            <Form.Label as={Col} xs={12} className="my-4 ps-2" >
                Informacion del trabajador
            </Form.Label>
            {/* 
            
            
             <Row className="border border-warning py-2 m-0 p-0 justify-content-center" style={{ width: "100%", overflow: "hidden" }}>
                
                <Col xs={12} className="d-flex justify-content-center mx-auto">
                    <canvas className="mx-auto bg-info p-0" style={{ width: '250px', height: '250px' }} ref={fotoHolder} />

                </Col>

                <Form.Group controlId="formFile" className="my-2" as={Col} xs={12} md={4}>
                    <Form.Label>Foto</Form.Label>
                    <Form.Control type="file" accept="image/*" size="sm" onChange={drawImage} />
                </Form.Group>
            </Row>
            */}


            <Form.Group as={Col} className="my-2" xs={12} md={6}>
                <Form.Label >
                    Nombre
                </Form.Label>
                <Form.Control ref={nombreInput} />
            </Form.Group>
            <Form.Group as={Col} className="my-2" xs={12} md={6}>
                <Form.Label >
                    Correo usuario
                </Form.Label>
                <Form.Control ref={correoInput} />
            </Form.Group>
            <Form.Group as={Col} className="my-2" xs={12} md={6}>
                <Form.Label >
                    Telefono
                </Form.Label>
                <Form.Control ref={telefonoInput} />
            </Form.Group>

            <SkillCounter />
        </Form>
    )
})


const FormularioContrato = forwardRef((props, ref) => {

    const [indefinido, setIndefinido] = useState(false)

    const fechaInicioInput = useRef()
    const fechaFinInput = useRef()
    const horasInput = useRef()
    const laborablesInput = useRef()
    const descansosInput = useRef()
    const vacacionesInput = useRef()
    const sueldoInput = useRef()
    const ssInput = useRef()


    useImperativeHandle(ref, () => ({

        getData() {
            const horas = parseInt(horasInput.current?.value || 0)
            const jornada = [
                parseInt(laborablesInput.current?.value || 0),
                parseInt(descansosInput.current?.value || 0)
            ]
            const vacaciones = parseInt(vacacionesInput.current?.value || 0)
            const sueldo = parseFloat(sueldoInput.current?.value || 0)
            const ss = parseFloat(ssInput.current?.value || 0)


            return {
                inicio: fechaInicioInput.current?.value,
                duracion: indefinido != false ? fechaFinInput.current?.value : undefined,
                horas,
                jornada,
                vacaciones,
                sueldo,
                ss,
                trabajador_id: undefined,
                activo: true,
            }
        }

    }));


    return (
        <Form as={Row} className="mx-auto mb-2 p-0" ref={ref}>
            <Form.Label as={Col} xs={12} className="my-2">
                Contrato del trabajador
            </Form.Label>
            <Form.Check type="checkbox" className="my-2 mx-auto w-100 d-flex justify-content-end">
                <Form.Check.Label className="mx-4">Trabajador indefinido</Form.Check.Label>
                <Form.Check.Input type="checkbox" value={indefinido} onChange={() => setIndefinido(!indefinido)} />
            </Form.Check>

            <Form.Group as={Col} xs={12} md={6} className="my-2">
                <Form.Label >
                    Inicio contrato
                </Form.Label>
                <Form.Control type="date" ref={fechaInicioInput} />
            </Form.Group>

            {!indefinido && <Form.Group as={Col} xs={12} md={6} className="my-2">
                <Form.Label >
                    Fin contrato
                </Form.Label>

                <Form.Control type="date" ref={fechaFinInput} />

            </Form.Group>}


            <Form.Group as={Col} xs={12} className="my-2">
                <Form.Label >
                    Horas de trabajo
                </Form.Label>
                <Form.Control type="number" ref={horasInput} />
            </Form.Group>
            <Form.Group as={Col} xs={6} md={4} className="my-2">
                <Form.Label >
                    Dias laborables
                </Form.Label>
                <Form.Control type="number" defaultValue={5} ref={laborablesInput} />
            </Form.Group>
            <Form.Group as={Col} xs={6} md={4} className="my-2">
                <Form.Label >
                    Dias descanso
                </Form.Label>
                <Form.Control type="number" defaultValue={2} ref={descansosInput} />
            </Form.Group>
            <Form.Group as={Col} xs={12} md={4} className="my-2">
                <Form.Label >
                    Duracion vacaciones (dias)
                </Form.Label>
                <Form.Control type="number" defaultValue={30} ref={vacacionesInput} />
            </Form.Group>

            <Form.Group as={Col} xs={12} md={6} className="my-2">
                <Form.Label >
                    Sueldo (€)
                </Form.Label>
                <Form.Control type="number" ref={sueldoInput} />
            </Form.Group>

            <Form.Group as={Col} xs={12} md={6} className="my-2">
                <Form.Label >
                    Seguros sociales (€)
                </Form.Label>
                <Form.Control type="number" ref={ssInput} />
            </Form.Group>


        </Form>
    )
})


const PlantillaCreator = (props) => {




    const trabajador = useRef()
    const contrato = useRef()
    const { createTrabajador } = useTrabajador()
    const { createContrato } = useContrato()

    const handleSubmit = (ev) => {
        const trabajadorData = trabajador.current?.getData()
        const contratoData = contrato.current?.getData()
        console.log(contratoData)
        console.log(trabajadorData)
        const tr_id = createTrabajador(trabajadorData, contratoData)

        console.log("enviando formulario")
    }

    useEffect(() => {
        console.log(trabajador)
    }, [trabajador])


    return (
        <MainHolder>


            <div className="bg-dark text-white mx-auto py-2 min-h-100 w-100" onSubmit={handleSubmit}>

                <FormularioTrabajador ref={trabajador} />


                <FormularioContrato ref={contrato} />

                <Button className="w-100 mt-2 bg-success" onClick={handleSubmit} value="tu_culo">Crear</Button>

            </div>

        </MainHolder>
    )
}

export default PlantillaCreator