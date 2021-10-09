import React, { useEffect, useState } from 'react'
import firebase, { database, storage } from '../firebase'


import { useLocal } from './LocalContext'


export const CompisContext = React.createContext();




export function useCompis() {
    return React.useContext(CompisContext)
}
export function CompisProvider({ children }) {
    const { local } = useLocal()
    const [compis, setCompis] = useState()




    useEffect(() => {
        

        let newCompis = []
        local && database.collection("usuarios").where('correo', 'in', local.allowed_users).get().then((query) => {
            query.forEach(
                (c) => {
                    
                    const { id } = c
                    storage.ref(`fotos_perfil/${id}.png`).getDownloadURL().then((url) => { 
                       
                        const data = Object.assign({}, c.data(), { pic_url: url }) 
                        newCompis.push({ id, ...data })
                    })

                   
                }
            )
            
            setCompis(newCompis)
        })

    }, [setCompis, local])

    const getCompiByCorreo=(correo)=>{
        return compis?.find(c=>c.correo==correo)
    }

    const value = {
        compis,
        getCompiByCorreo,

    }


    return (
        <CompisContext.Provider value={value}>
            {children}
        </CompisContext.Provider>
    )
}