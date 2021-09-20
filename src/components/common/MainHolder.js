import React, { useEffect, useState } from 'react'
import { Col, Row, Spinner, Button } from 'react-bootstrap'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import BarraNav from './BarraNav'
import logo from '../../assets/logo.png'
import { useLocal } from '../../contexts/LocalContext'



const LoadingCortine = () => {
    const [time, setTimer] = useState()
    const { currentUser } = useAuth()
    const {local}=useLocal()
    const [outOfTime, setOutOfTime] = useState()
    const history = useHistory()

    useEffect(() => {
        setTimer(setTimeout(() => { setOutOfTime(true) }, 5000))
        return clearTimeout(time)
    }, [])

    const TimeOutPanel = () => {
        return (
            <Col xs={12}>
                <Row className="justify-content-center">
                    <Col xs={9} className="text-center my-auto text-danger mb-4 border border-danger py-4" >
                        <p className="fs-1 text-danger">Ups algo salio mal</p>
                        Intenta iniciar sesion manualmente
                    </Col>
                    <Col as={Link} to="/login" xs={8} className="bg-info p-0">
                         <Button  variant="danger" className="w-100">Iniciar sesion</Button>
                    </Col>
                   
                </Row>

            </Col>
        )
    }

    const LoadingPanel = () => {
        return (
            <Row className={`d-flex justify-content-center align-items-${outOfTime ? "center" : "start pt-5"} fs-1`}>
                Cargando
                <Spinner animation="grow" variant="warning" className="ms-3" />
            </Row>
        )
    }

    return (
        <div className="position-absolute bg-oscuro d-flex row text-warning justify-content-center mx-auto m-0 p-0" style={{ zIndex: "200", top: "0", width: "100%", height: "100vh" }}>

            <Col className={`d-flex justify-content-center align-items-${outOfTime ? "center" : "end"} `}>
                <img src={logo} />
            </Col>

            {!outOfTime && <LoadingPanel />}

            {outOfTime && <TimeOutPanel />}

        </div>
    )

}


export default function MainHolder({ children }) {

    const { currentUser, loading,userAPI } = useAuth()
    const {local}=useLocal()
    const history = useHistory()
    const location = history.location
    

    return (
        <div className="position-relative vh-100 vw-100" >
            {(!currentUser && !loading) && <Redirect to={{ pathname: '/login', state: { prevPath: location.pathname } }} />}
            {(userAPI && !local)&& <Redirect  to={{ pathname: '/local/selector', state: { prevPath: location.pathname } }} />}
            <BarraNav />
            <div style={{ marginTop: "50px" }}>
                {children}
            </div>
            {loading && <LoadingCortine />}

        </div>



    )
}