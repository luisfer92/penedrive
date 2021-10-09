import React, { useEffect, useState } from 'react'
import { database } from '../firebase'
import firebase from "firebase/app";
import { useLocal } from './LocalContext';

import moment from 'moment';



export const ContratoContext = React.createContext();




export function useContrato() {
    return React.useContext(ContratoContext)
}
export function ContratoProvider({ children }) {

    const { local } = useLocal()
    const [contrato, setContrato] = useState()
    const [contratos, setContratos] = useState()
    const [selfDB, setDB] = useState()



    useEffect(() => {

        if (local) {
            const db = database.collection("locales").doc(local.id).collection("contratos")
            setDB(db)

        }


    }, [local])

    useEffect(() => {
        

            const contracts = []
            selfDB?.get().then(q => {

                q.forEach(c =>{ 
                    var _data=c.data()
                    _data.inicio=moment.utc(_data.inicio.seconds*1000)
                    _data.duracion=_data.duracion.seconds>0?moment.utc(_data.duracion.seconds*1000):undefined
                    contracts.push({ id: c.id, ..._data })
                })
                setContratos(contracts)
            })
        

    }, [selfDB])


    const getContratoByTrabajadorID = (trabajadorID) => {
        return contratos?.find(c => c.trabajador_id == trabajadorID)
    }


    const createContrato = (data, trabajador_id) => {
        var dataLimpia = data
        const { inicio, duracion } = data
        dataLimpia.inicio = firebase.firestore.Timestamp.fromMillis(Date.parse(inicio))
        dataLimpia.duracion = duracion != undefined ? firebase.firestore.Timestamp.fromMillis(Date.parse(duracion)) : firebase.firestore.Timestamp.fromMillis(0)
        if (!trabajador_id) {
            delete dataLimpia.trabajador_id
        } else {
            dataLimpia.trabajador_id = trabajador_id
        }
        console.log(dataLimpia)

        selfDB.add(data).then((query) => {
            console.log("contrato subido")
        })

    }

    const value = {
        contrato,
        contratos,
        createContrato,
        getContratoByTrabajadorID,

    }


    return (
        <ContratoContext.Provider value={value}>
            {children}
        </ContratoContext.Provider>
    )
}