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
        nombre: "Cambiar local",
        url: "/local/selector"

    },
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
    const {location}=useHistory()
   
    

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

                <Row className="shadow-lg py-1 bg-dark rounded-3 justify-content-around mt-2 border border-4 border-white">
                    <Col xs={3}  className="bg-info d-flex p-0 justify-content-center border-right border-info">
                        <ProfilePic size={64} />
                    </Col>
                    <Col  className="align-items-center d-flex bg-warning">
                        <p className="text-center text-white w-100 fs-5  my-auto">{userAPI && userAPI.correo}</p>

                    </Col>
                    

                </Row>

                <Offcanvas.Body>

                    <Row className="">
                        <ListGroup variant="flush" className="w-100 bg-info p-0" style={{minHeight:"80%"}}>



                            {
                                menuAdmin.map((item) => {
                                    const { url, nombre } = item
                                    const active=location.pathname===url
                                    return (
                                        <ListGroup.Item action as={!active && Link} to={url} className={`my-2 ${ active && "active"}`}>
                                            {nombre}
                                        </ListGroup.Item>
                                    )
                                })
                            }





                        </ListGroup>
                    </Row>

                    <Row>    

                        <ListGroup variant="flush" className=" w-100" style={{ bottom: "0" }}>
                            <ListGroup.Item action >
                                <FaAdjust className="me-2" /> Ajustes
                            </ListGroup.Item>
                            <ListGroup.Item action onClick={handleLogut}>
                                <FaArrowAltCircleLeft className="me-2" /> Cerrar session
                            </ListGroup.Item>
                        </ListGroup>
                    </Row>
                </Offcanvas.Body>
            </Offcanvas>

        </>

    )
}