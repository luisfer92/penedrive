import React, { useEffect, useState } from 'react'
import { database, storage } from '../firebase'
import { useAuth } from './AuthContext';
import { useCompis } from './CompisContext';
import { useLocal } from './LocalContext'
import firebase from "firebase/app";

import moment from 'moment'
import 'moment/locale/es';

moment.locale("es")


export const MesageContext = React.createContext();




export function useMesage() {
    return React.useContext(MesageContext)
}
export function MessageProvider({ children }) {
    const { local } = useLocal()
    const { userAPI } = useAuth()
    const [localRef, setLocalRef] = useState()

    const [mensajes, setMensajes] = useState()
    const [misMensajes, setMisMensajes] = useState()



    useEffect(() => {
        let msgs = null
        if (local) {
            msgs = database.collection("locales").doc(local.id).collection("mensajes").orderBy('date').onSnapshot((query) => {
                const newMsg = []
                const myMsg = []
                query.forEach(m => {
                    const id = m.id
                    const _data = m.data()
                    const date=moment.utc(_data.date.seconds*1000)
                    
                    const data=Object.assign({},_data,{date})
                    const { from } = data
                    if ((from === userAPI)) {
                        myMsg.push({ id, ...data })
                    }
                    newMsg.push({ id, ...data })


                })
                setMensajes(newMsg)
                setMisMensajes(myMsg)
            })
        }
        return msgs ? () => msgs() : null
    }, [setMensajes, local, userAPI])

    const sendMensaje = (data) => {
        const author = userAPI.correo

        const date = firebase.firestore.Timestamp.fromDate(new Date())
        database.collection("locales").doc(local.id).collection("mensajes").add({ author, date, ...data })
    }

    const value = {
        mensajes,
        sendMensaje,
    }


    return (
        <MesageContext.Provider value={value}>
            {children}
        </MesageContext.Provider>
    )
}