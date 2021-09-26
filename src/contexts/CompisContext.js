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
        local && console.log("buscando compis" + local.allowed_users)

        let newCompis = []
        local && database.collection("usuarios").where('correo', 'in', local.allowed_users).get().then((query) => {
            query.forEach(
                (c) => {
                    
                    const { id } = c
                    storage.ref(`fotos_perfil/${id}.png`).getDownloadURL().then((url) => { 
                       
                        const data = Object.assign({}, c.data(), { pic_url: url }) 
                        console.log(data)
                        newCompis.push({ id, ...data })
                    })

                   
                }
            )
            console.log("compis encontrados")
            console.log(newCompis)
            setCompis(newCompis)
        })

    }, [setCompis, local])



    const value = {
        compis,

    }


    return (
        <CompisContext.Provider value={value}>
            {children}
        </CompisContext.Provider>
    )
}