import React, { useState } from 'react';
import { Navbar, Container, NavDropdown, Nav, Button, ListGroup } from 'react-bootstrap'
import logo from '../assets/logo.png'
import { FaBars } from 'react-icons/fa';
import Offcanvas from 'react-bootstrap/Offcanvas'




const menuAdmin = [
    {
        nombre: "Productos"

    },

    {
        nombre: "Horarios"

    },
    {
        nombre: "Local"

    }
]


export default function BarraNav() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className="inline-block p-2 border-bottom">
                <img
                    alt=""
                    src={logo}
                    width="30"
                    height="30"
                    className="mx-2"
                />{' '}
                <span>Rerovaji</span>

                <div className="float-end align-center">
                    <FaBars size="30" className="border p-1" onClick={handleShow} />
                </div>
            </div>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup variant="flush">
                        {
                            menuAdmin.map((item) => {
                                const {nombre}=item
                                return <ListGroup.Item action>{nombre}</ListGroup.Item>
                            })
                        }


                    </ListGroup>
                </Offcanvas.Body>
            </Offcanvas>

        </>

    )
}