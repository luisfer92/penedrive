import React, { useEffect, useState } from 'react'
import  firebase,{ database } from '../firebase'

import { useLocal } from './LocalContext';
import { useTrabajador } from './TrabajadorContext';




export const ContratoContext = React.createContext();




export function useContrato() {
    return React.useContext(ContratoContext)
}
export function ContratoProvider({ children }) {
    const { trabajadores } = useTrabajador()
    const {local}=useLocal()
    const [contrato,setContrato]=useState()
    const [contratos, setContratos] = useState()
    const [selfDB, setDB] = useState()
    
    console.log(local)

    useEffect(() => {

        if(local){
             const db = database.collection("locales").doc(local.id).collection("contratos")
        setDB(db)

        }
       

    }, [local])

    useEffect(()=>{
        if(trabajadores){
            const t_ids=trabajadores.map((t)=>t.id)
            const contracts=[]
            selfDB.
                where("trabajador_id","in",t_ids).
                where("activo","==",true).
                get().
                then(c=>{
                    contracts.append({id:c.id,...c.data()})
                })
        }
        
    },[trabajadores])

    
    const createContrato = (data) => {
        selfDB.add(data).then((query) => {
            console.log("lo subii")
        })
    }

    const value = {
        contrato,
        contratos,
        createContrato,
        
    }


    return (
        <ContratoContext.Provider value={value}>
            {children}
        </ContratoContext.Provider>
    )
}