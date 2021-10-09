import React, { useState } from 'react'
import { Col } from 'react-bootstrap'



export default function ProductoCategoria(props) {
    const [active, setActive] = useState(false)
    const { producto: { id,nombre, precio }, propio,agregar,eliminar } = props
    const colors = ((propio && !active) || (!propio && active) )?"bg-info text-white " : " bg-white text-dark "

    

    const handleActive=()=>{
        
        setActive(!active)
        !active && agregar(id,"+")
        active && eliminar(id,"-")
    }


    return (
        <Col xs={11} md={4} lg={3} xl={2} xxl={2} className={`border ${colors} border-info rounded sombra m-2 py-4`} onClick={handleActive}>
            <div className="d-flex align-items-center">
                <span className="text-center w-100 text-capitalize">{nombre}</span>
                
            </div>
        </Col>
    )
}