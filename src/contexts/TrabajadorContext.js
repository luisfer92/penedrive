import React, { useEffect, useState } from 'react'
import  { database } from '../firebase'
import { ContratoContext } from './ContratoContext';

import { useLocal } from './LocalContext';




export const TrabajadorContext = React.createContext();




export function useTrabajador() {
    return React.useContext(TrabajadorContext)
}
export function TrabajadorProvider({ children }) {
    const { local } = useLocal()
    const [trabajadores, setTrabajadores] = useState()
    const [selfDB, setDB] = useState()

    console.log(local)

    useEffect(() => {

        if(local){
             const db = database.collection("locales").doc(local.id).collection("plantilla")
        setDB(db)

        }
       

    }, [local])

    useEffect(() => {
       
        let unsubscribe = null
        if (selfDB) {
            const plantilla = []
            console.log("carga inicial trabajadores")
            selfDB.orderBy("nombre").onSnapshot((snap) => {
                snap.forEach((t) => {
                   
                    plantilla.push({ id: t.id, ...t.data() })
                })
                setTrabajadores(plantilla)
            })
        }

        return unsubscribe ? () => unsubscribe() : null
    }, [selfDB, setTrabajadores])

    const createTrabajador = (data) => {
        selfDB.add(data).then((query) => {
            console.log("lo subii")
        })
    }

    const value = {
        trabajadores,
        createTrabajador,
        
    }


    return (
        <TrabajadorContext.Provider value={value}>
            <ContratoContext.Provider>
                {children}
            </ContratoContext.Provider>            
        </TrabajadorContext.Provider>
    )
}