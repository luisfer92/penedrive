import React, { useEffect } from 'react'
import { database } from '../firebase'
import { useAuth } from './AuthContext';
import { CompisProvider } from './CompisContext';
import { ContratoProvider } from './ContratoContext';
import { MaquinariaProvider } from './MaquinariaContext';
import { MessageProvider } from './MessageContext'
import { TecnicosProvider } from './TenicosContext';
import { TrabajadorProvider } from './TrabajadorContext';

const LocalContext = React.createContext();



export function useLocal() {
    return React.useContext(LocalContext)
}


export function LocalProvider({ children }) {

    const { userAPI } = useAuth()
    const [locales, setLocales] = React.useState()
    const [local, setLocal] = React.useState(null);
    const [categorias, setCategorias] = React.useState();

   

    useEffect(() => {
        let unsubscribre = null
        if (local) {
            unsubscribre = database.
                collection('locales').
                doc(local.id).
                onSnapshot(
                    snap => {
                        const newLocal = { id: snap.id, ...snap.data() }
                        setLocal(newLocal)
                        window.localStorage.setItem('rerovaji_local', JSON.stringify(newLocal))
                    }
                )
        } else {
            const newLocal = window.localStorage.getItem('rerovaji_local')
            console.log("local guardado en localstorage")
            newLocal && setLocal(JSON.parse(newLocal))
        }
        return unsubscribre ? () => unsubscribre() : null
    }, [setLocal])


    useEffect(() => {
        if (userAPI) {

            const load = []
            database.collection("locales").
                where('allowed_users', 'array-contains', userAPI.correo).
                get().then((query) => {
                    query.forEach(doc => {
                        load.push({ id: doc.id, ...doc.data() })

                    })
                    const size = load.length
                    console.log(size)
                    setLocales(load)
                    size == 1 && setLocal(load[0])
                })

        }
    }, [userAPI])


    const addCompi = (correo) => {
        if (local) {
            var { allowed_users } = local
            allowed_users.push(correo)
            database.collection("locales").doc(local.id).update({allowed_users})
        }

    }


    const value = {
        local,
        locales,
        abandonarLocal: () => { setLocal(null) },
        setLocal,
        setLocales,
        addCompi
    }

    return (
        <LocalContext.Provider value={value}>
            <TecnicosProvider>

                <MaquinariaProvider>

                    <CompisProvider>
                        <ContratoProvider>
                            <TrabajadorProvider>

                                <MessageProvider>
                                    {children}
                                </MessageProvider>

                            </TrabajadorProvider>
                        </ContratoProvider>
                    </CompisProvider>

                </MaquinariaProvider>

            </TecnicosProvider>




        </LocalContext.Provider>
    )
}