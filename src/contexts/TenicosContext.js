import React, { useEffect, useState } from 'react'
import  { database } from '../firebase'


import { useLocal } from './LocalContext';




export const TecnicosContext = React.createContext();




export function useTecnicos() {
    return React.useContext(TecnicosContext)
}
export function TecnicosProvider({ children }) {
    const { local } = useLocal()
    const [tecnicos, setTecnicos] = useState()
    const [selfDB, setDB] = useState()

  

    useEffect(() => {

        if(local){
             const db = database.collection("locales").doc(local.id).collection("tecnicos")
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
                setTecnicos(plantilla)
            })
        }

        return unsubscribe ? () => unsubscribe() : null
    }, [selfDB, setTecnicos])

    const createTecnico = (data) => {
        selfDB.add(data).then((query) => {
            console.log("lo subii")
        })
    }

    const value = {
        tecnicos,
        createTecnico,
        
    }


    return (
        <TecnicosContext.Provider value={value}>
            
                {children}
                      
        </TecnicosContext.Provider>
    )
}