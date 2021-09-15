import React from 'react'
import { Redirect } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import BarraNav from './BarraNav'



export default function MainHolder({ children }) {

    const {currentUser,loggedOut} =useAuth()



    return (
        <div>  
            {(!currentUser && loggedOut) && <Redirect to="/login"/>}
            <BarraNav />
            <div style={{marginTop:"50px"}}>
                 {children}
            </div>
           
        </div>



    )
}