import Rect, { useState } from 'react'
import { Badge } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext'
import { useProducto } from '../contexts/ProductoContext'
import BarraNav from '../components/common/BarraNav'
import TrabajadorIndex from './trabajador/TrabajadorIndex'
import MainHolder from './common/MainHolder';
export default function MainApp() {

    const { currentUser } = useAuth();
    const { productos } = useProducto();




    return (
        <MainHolder>
            <TrabajadorIndex />
        </MainHolder>

    )
}