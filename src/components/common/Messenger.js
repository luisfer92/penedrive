/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useRef, useState } from 'react'
import { Col, Form, Row, InputGroup, Button } from 'react-bootstrap'
import { FaBeer, FaBullhorn, FaExclamationTriangle } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext'
import { useCompis } from '../../contexts/CompisContext'
import { useMesage } from '../../contexts/MessageContext'
import MainHolder from './MainHolder'
import moment from 'moment'


const getFormated = (date) => {
    console.log("formateando")
    var duration = moment.duration(moment().diff(date));

    var minutes = duration.asMinutes()
    var days = duration.asDays()


    const menosDe30 = minutes < 30
    const ayer = days >= 1 && days < 2
    const hoy = (days > 0 && days < 1) && !menosDe30

    const isProximo = (menosDe30 || ayer || hoy)

    const _getFormated = () => {
        let formated = null
        const soloHoras = date.format("HH:MM")
        switch (true) {
            case (!isProximo):
                formated = date.format("ddd. DD-MM-YY HH:MM")
                break
            case (ayer):
                formated = "ayer " + soloHoras
                break

            case (hoy):
                formated = soloHoras
                break

            case (minutes < 1):
                formated = "ahora mismo"
                break;
            case (menosDe30):
                formated = "hace " + Math.round(minutes) + " minutos"
                break

            default:
                console.log()
                break;
        }
        return formated
    }
    return _getFormated()
}




const MsgFecha = (props) => {
    const { date } = props
    const [formated, setFormated] = useState(getFormated(date))

    useEffect(() => {

        const timer = setInterval(() => {
            const newTime = getFormated(date)
            newTime != formated && setFormated(getFormated(date))
        }, 60000)

        return () => clearInterval(timer);
    }, [setFormated])

    return <p className="w-100 m-0 p-0 text-end pe-2 text-warning">{formated}</p>
}


const MsgFrom = (props) => {
    const { userAPI } = useAuth()
    const { children, from, date, __type } = props
    const { compis } = useCompis()
    const [me, setMe] = useState()
    const [itsMine, setItsMine] = useState(false)

    useEffect(() => {

        if (compis && userAPI) {

            const find = compis.find(c => c.correo === from)
            find && console.log(find.id)
            console.log(userAPI)
            setItsMine(find && find.id === userAPI.id)
            setMe(find)
        }
    }, [setMe, compis])

    console.log(date)


    return (
        <Row className={`justify-content-center px-0 mx-auto  ${itsMine && "flex-row-reverse"}`}>
            <Col xs sm={5} lg={4} className="d-flex align-items-center text-white ">
                <Row className="w-100 mx-auto p-0 text-dark">
                    <Col xs={12} className="mx-auto text-capitalize text-white">{me && me.nombre}</Col>
                    <Col xs={12} className={` shadow mx-auto py-3 text-start ${itsMine ? "bocadillo-me" : "bocadillo"} ${__type == "alarm" && "bg-oscuro  text-amarillo"} border border-3 border-white d-flex align-items-center `}>
                        {children}
                    </Col>
                    <MsgFecha date={date} />
                </Row>

            </Col>
            <Col xs={2} md={1} className="d-flex justify-content-center  align-items-center">

                {me && <img src={me.pic_url} style={{ width: "48px", height: "48px" }} className="rounded-circle border border-3 border-white shadow" />}


            </Col>



        </Row >

    )
}


const Mensaje = (props) => {
    const { msg, date, author, __type } = props

    return (
        <Row className="mx-auto justify-content-center my-2 w-100">
            <MsgFrom from={author} date={date} __type={__type}>

                {
                    __type == "alarm" &&
                        <div className="position-absolute text-white" style={{ top: "-10px", right: "-10px" }}>
                            <FaBullhorn className="m-0 p-0" size={25} />
                        </div>
                }
                {msg}



            </MsgFrom>

        </Row>

    )
}



export default function () {
    const { mensajes, sendMensaje } = useMesage()
    const [type, setType] = useState()
    const msgText = useRef()
    const msgsBottom = useRef(null)


    useEffect(() => {
        if (msgsBottom) msgsBottom.current.scrollTop = msgsBottom.current.scrollHeight *2
    }, [mensajes])


    const handleSend = () => {
        if (msgText.current) {
            const text = msgText.current.value
            text != "" && sendMensaje({ msg: text })
        }
    }


    return (
        <MainHolder>

            <div className="w-100 p-0 m-0 d-flex bg-oscuro-claro flex-column justify-content-end" style={{ height: "80%", overflow: "hidden" }} >
                <div className="py-5 position-relative" style={{ maxHeight: "100%", overflowX: "hidden", overflowY: "scroll" }}ref={msgsBottom}  >
                    {mensajes && mensajes.map(m => <Mensaje {...m} />)}
                    <Row className="bg-info " style={{bottom:"0" ,height: "10vh" }} />
                </div>

            </div>




            <div className="bg-warning m-0 w-100  position-absolute bg-dark d-flex border-top border-3 border-white" style={{ minHeight: "20%", bottom: "0" }}>
                <Form className="my-auto mx-auto  p-2 w-100">

                    <Form.Group className="mb-2">
                        <InputGroup>

                            <Form.Control as="textarea" ref={msgText} className="rounded rounded-4" placeHolder={"mensaje..."} />
                            <InputGroup.Text as={Button} onClick={handleSend} variant="success px-4">Enviar</InputGroup.Text>
                        </InputGroup>
                    </Form.Group>


                </Form>
            </div>
        </MainHolder>

    )
}