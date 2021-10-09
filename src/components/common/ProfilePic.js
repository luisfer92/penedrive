import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'


export default function Pic(props) {
    const {userAPI}=useAuth()
    const {size=200}=props
    
    


    return (
       
            <img 
            src={userAPI && userAPI.profileUrl}
            className="rounded-circle shadow border border-3"
            style={{width:size, height:size}}
             />
        
        
    )
}