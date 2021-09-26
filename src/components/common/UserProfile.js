import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaChessKing, FaChessKnight, FaChessPawn, FaChessQueen, FaEdit } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext'
import { useProducto } from '../../contexts/ProductoContext'
import ProfilePic from './ProfilePic'


const chapa = (userApi) => {

    const { isAdmin, isSuperAdmin } = userApi
    
    let chapa = isSuperAdmin ? <FaChessKing /> : isAdmin ? <FaChessQueen /> : <FaChessPawn />


    return chapa
}


export default function UserProfile(props) {

    const {userAPI} =useAuth()

    return (

       
            <Row className="p-2 mx-auto" style={{ justifyContent: "center"}}>
                <Col xs={11} sm={8}  md={3} lg={4}  className="bg-oscuro border  py-4 rounded rounded-4 shadow-lg" md={6}>
                    <div className="d-flex text-white px-2" style={{ justifyContent: "space-between" }}>
                        {userAPI && chapa(userAPI)} <FaEdit />
                    </div>

                    <div className="d-flex justify-content-center">
                       <ProfilePic /> 
                    </div>
                    
                    <h4 className="mt-4 text-center text-silver">
                        {userAPI && userAPI.nombre}
                    </h4>


                </Col>

            </Row>
       

    )
}