import React from "react";
import { Col } from 'react-bootstrap'

export default (props) => {
    const {children,active,expanded,hidden}=props
        
        return (
            <Col xs={active?2:true} className="text-white p-0 d-flex justify-content-center align-items-center position-relative shadow border" style={{display:hidden?"none":"flex", maxHeight: "100%", overflowY: "hidden" }}>

                {children}
            </Col>
        )
    
}