import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { FaAngleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import MainHolder from './MainHolder'



export default (props)=>{
    const {children,title,back}=props
    return (
        <MainHolder>
            <Row className=" ps-3 py-2" >
                <Col xs={2} sm={1} as={Link} to={back} className="bg-dark text-warning justify-content-center rounded rounded-4 py-3 d-flex">
                    <FaAngleLeft size="35" />

                </Col>
                <Col className="d-flex  my-auto">
                    <h4 className="my-auto">{title}</h4>
                </Col>
            </Row>
            <Row className="vh-100 justify-content-center">
                {children}
            </Row>

            
        </MainHolder>
    )

}