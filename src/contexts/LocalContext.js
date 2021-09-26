import React, { useEffect } from 'react'
import { database } from '../firebase'
import { useAuth } from './AuthContext';
import { CompisProvider } from './CompisContext';
import { MaquinariaProvider } from './MaquinariaContext';
import { MessageProvider } from './MessageContext'
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

    const value = {
        local,
        locales,
        abandonarLocal: () => { setLocal(null) },
        setLocal,
        setLocales
    }

    useEffect(() => {
        let unsubscribre = null
        if (local) {
            unsubscribre = database.
                collection('locales').
                doc(local.id).
                onSnapshot(
                    snap => {
                        setLocal({ id: snap.id, ...snap.data() })
                    }
                )
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


    return (
        <LocalContext.Provider value={value}>
            <MaquinariaProvider>
                <CompisProvider>
                    <TrabajadorProvider>
                        <MessageProvider>
                            {children}
                        </MessageProvider>
                    </TrabajadorProvider>

                </CompisProvider>
            </MaquinariaProvider>



        </LocalContext.Provider>
    )
}