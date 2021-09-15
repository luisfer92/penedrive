import React, { useState } from 'react';
import { Navbar, Container, NavDropdown, Nav, Button, ListGroup, Row, Col } from 'react-bootstrap'
import logo from '../../assets/logo.png'
import { FaAdjust, FaArrowAltCircleLeft, FaBars, FaDoorClosed, FaWrench } from 'react-icons/fa';
import Offcanvas from 'react-bootstrap/Offcanvas'
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ProfilePic from './ProfilePic'




const menuAdmin = [
    {
        nombre: "Productos",
        url: "/productos"

    },

    {
        nombre: "Horarios",
        url: "/"

    },
    {
        nombre: "Operativa",
        url: "/operativa"

    },

]


export default function BarraNav() {

    const [show, setShow] = useState(false);
    const { userAPI } = useAuth()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { logout, currentUser } = useAuth();


    async function handleLogut() {

        try {
            await logout();

        } catch {

        }

    }

    return (
        <>

            <div className="inline-block p-2 fixed-top bg-oscuro text-white" style={{ width: "100vw" }}>
                <Link to="/">

                    <img
                        alt=""
                        src={logo}
                        width="30"
                        height="30"
                        className="mx-2"
                    />{' '}

                </Link>
                <span >Rerovaji</span>

                <div className="float-end align-center">
                    <FaBars size="30" className="border p-1" onClick={handleShow} />
                </div>


            </div>

            <Offcanvas show={show} onHide={handleClose} className="bg-claro border-dark vh-100 overflow-hidden">
                <Offcanvas.Header closeButton closeVariant="white" className="bg-dark">
                    <Offcanvas.Title>
                        <span className="text-white">MENU</span>
                    </Offcanvas.Title>
                </Offcanvas.Header>

                <Row className="shadow-lg py-3 bg-dark rounded-3 justify-content-around mt-2 border border-4 border-white">
                    <Col xs={1} sm={1}  className="justify-content-center border-right border-info">
                        <ProfilePic size={64} />
                    </Col>
                    <Col xs={10} sm={10} md={8} className="align-items-center d-flex">
                        <p className="text-center text-white w-100 fs-5  my-auto">{userAPI && userAPI.correo}</p>
                    </Col>
                </Row>

                <Offcanvas.Body>

                    <div className="w-100 h-100 position-relative d-flex">

                        <ListGroup variant="flush" className="w-100">



                            {
                                menuAdmin.map((item) => {
                                    const { url, nombre } = item
                                    return (
                                        <ListGroup.Item action as={Link} to={url} className="my-2">
                                            {nombre}
                                        </ListGroup.Item>
                                    )
                                })
                            }





                        </ListGroup>

                        <ListGroup variant="flush" className="position-absolute w-100" style={{ bottom: "0" }}>
                            <ListGroup.Item action >
                                <FaAdjust className="me-2" /> Ajustes
                            </ListGroup.Item>
                            <ListGroup.Item action onClick={handleLogut}>
                                <FaArrowAltCircleLeft className="me-2" /> Cerrar session
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>

        </>

    )
}