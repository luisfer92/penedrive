import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext'



const DiaHolder = ({ children }) => {

    return (
        <Col  className="text-white p-0 d-flex justify-content-center align-items-center border " style={{maxHeight:"100%",overflowY:"scroll"}}>
            {children}
        </Col>
    )
}


const SemanaHolder = (props) => {

    const {turnoAbr}=props
    const {userAPI}=useAuth()

    return (
        <Row className="mx-auto h-100">
            <DiaHolder>{turnoAbr}</DiaHolder>
            <Col  className="text-white p-0 d-flex justify-content-center align-items-center border " style={{maxHeight:"100%",overflowY:"scroll"}}>
                <div className="w-100 my-auto py-2">
                    <Col xs={12} as={"img"} src={userAPI?.profileUrl} />
                    
                </div>
                
                
                
            </Col>
            
            <DiaHolder>M</DiaHolder>
            <DiaHolder>X</DiaHolder>
            <DiaHolder>J</DiaHolder>
            <DiaHolder>V</DiaHolder>
            <DiaHolder>S</DiaHolder>
            <DiaHolder>D</DiaHolder>
        </Row>
    )


}



const BarraDias = (props) => {
    return (
        <Row className="bg-info text-white p-0 m-0" style={{ height: "5%" }}>
            <DiaHolder><FaSun/>-<FaMoon/></DiaHolder>
            <DiaHolder>L</DiaHolder>
            <DiaHolder>M</DiaHolder>
            <DiaHolder>X</DiaHolder>
            <DiaHolder>J</DiaHolder>
            <DiaHolder>V</DiaHolder>
            <DiaHolder>S</DiaHolder>
            <DiaHolder>D</DiaHolder>
        </Row>
    )
}


export default (props) => {

    return (
        <div className="vh-100 vw-100 bg-info p-0 m-0">
            <div className="bg-white w-100 mx-auto " style={{ height: "30%" }}>

            </div>
            <BarraDias />
            <div className="w-100 m-0 p-0" style={{ height: "65%" }}>
                <div className="bg-claro-oscuro h-50 p-0 mx-auto w-100">
                    <SemanaHolder turnoAbr="M"/>
                </div>
                <div className="bg-oscuro h-50">
                    <SemanaHolder turnoAbr="N"/>
                </div>
            </div>

        </div>
    )
}