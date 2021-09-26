import React, { useEffect, useRef, useState } from 'react';
import { Card, Button, Form, Alert, Row, Col } from 'react-bootstrap'
import logo from '../../assets/logo.png';
import { useAuth } from '../../contexts/AuthContext'
import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";

import { auth } from '../../firebase';
import { useProducto } from '../../contexts/ProductoContext'

export default function Login(props) {

    const emailRef = useRef();
    const passWordRef = useRef();
    const { login, currentUser,loadUserData } = useAuth();
    const [error, setError] = useState('');
    const [loggedIn, setLoggedIn] = useState(false)
    const [loading, setLoading] = useState(false)
    const { loadProductos } = useProducto();


     

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            setError('')
            setLoading(true)
            const usuario = await login(emailRef.current.value, passWordRef.current.value)
            
            if (usuario) {
               
                setLoggedIn(true);
                
            } else {
                setError("No se puede iniciar sesion ")
            }


        } catch (error) {
            console.log(error)
            setError("No se puede iniciar sesion con esta cuenta")
        }

    }


    

    const prev=props.location.state && props.location.state.prevPath
    const redirection=prev?prev:"/"
    return (
        <>
            {currentUser && <Redirect to={redirection} />}
            <Row className="bg-oscuro text-white" style={{ display: "flex",height:"100vh",justifyContent: "center", alignItems: "center" }}>
                <Col xs={11} md={5} lg={2}>
                
                 <img className="mx-auto d-block shadow my-5" src={logo} style={{width:"100px"}}/>
                    
                    
                    <Form  className="mt-3" onSubmit={handleSubmit}>
                    <p className="text-danger text-center">{error?error:" "}</p>
                        <Form.Group className="mb-2">
                            <Form.Label className="textoPrimario">
                                Email
                        </Form.Label>
                            <Form.Control type="email" ref={emailRef} required  />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label className="textoPrimario">
                                Contraseña
                        </Form.Label>
                            <Form.Control type="password" ref={passWordRef} required value={"galletita"}/>
                        </Form.Group>



                        <Button disable={loading} className="w-100 mt-2 bg-success" type="submit">Iniciar sesion</Button>
                       
                    </Form>
               

                
                </Col>
            
                   

            </Row>
        </>
    )
}