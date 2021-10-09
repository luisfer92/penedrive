import React, { useEffect, useState } from 'react'
import { database } from '../firebase'
import { useContrato } from './ContratoContext';
import { storage } from '../firebase'
import { useLocal } from './LocalContext';
import {useAuth} from './AuthContext'



export const TrabajadorContext = React.createContext();




export function useTrabajador() {
    return React.useContext(TrabajadorContext)
}
export function TrabajadorProvider({ children }) {
    const { local,addCompi } = useLocal()
    const {createContrato}=useContrato()
    const { registerTrabajador } = useAuth()
    const [trabajadores, setTrabajadores] = useState()
    const [selfDB, setDB] = useState()

    


    



    useEffect(() => {

        if (local) {
            const db = database.collection("locales").doc(local.id).collection("plantilla")
            setDB(db)

        }


    }, [local])

    useEffect(() => {

        let unsubscribe = null
        if (selfDB) {
            const plantilla = []
            
            selfDB.orderBy("nombre").onSnapshot((snap) => {
                snap.forEach((t) => {
                    console.log(t.data())
                    plantilla.push({ id: t.id, ...t.data() })
                })
                setTrabajadores(plantilla)
                
            })

        }

        return unsubscribe ? () => unsubscribe() : null
    }, [selfDB, setTrabajadores])

    const createTrabajador = (trabajdor,contrato) => {
        var trabajador_id=null
        selfDB.add(trabajdor).then((query) => {
            console.log(query.id)
            trabajador_id=query.id
            createContrato(contrato,trabajador_id)
            addCompi(trabajdor.correo)
        })
        return (trabajador_id)
    }

    const value = {
        trabajadores,
        createTrabajador,

    }
    


    return (
        <TrabajadorContext.Provider value={value}>
            
                {children}
            
        </TrabajadorContext.Provider>
    )
}