import React, { useEffect, useState } from 'react'
import firebase, { database, storage } from '../firebase'
import { useAuth } from './AuthContext';
import { useLocal } from './LocalContext';

function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => {
        images[item.replace('./', '').replace('.webp', '')] = r(item);

    });
    return images
}
const images = importAll(require.context('../assets/maquinaria/', false, /\.(png|jpe?g|svg|webp)$/));


const maquinasStandar = [
    { nombre: "cafetera", pic: images.cafetera.default },
    { nombre: "camara", pic: images.camara.default },
    { nombre: "expositor", pic: images.expositor.default },
    { nombre: "exprimidora", pic: images.exprimidora.default },
    { nombre: "freidora", pic: images.freidora.default },
    { nombre: "grifo cerveza", pic: images.grifo.default },
    { nombre: "heladera", pic: images.heladera.default },
    { nombre: "maquina hielo", pic: images.hielo.default },
    { nombre: "horno", pic: images.horno.default },
    { nombre: "impresora red", pic: images.impresora.default },
    { nombre: "pantalla pedidos", pic: images.kds.default },
    { nombre: "lavavajillas", pic: images.lavavajillas.default },
    { nombre: "baño maria", pic: images.maria.default },
    { nombre: "mesa fria", pic: images.mesa.default },
    { nombre: "microondas", pic: images.microondas.default },
    { nombre: "tpv", pic: images.tpv.default },







]



export const MaquinariaContext = React.createContext();




export function useMaquinaria() {
    return React.useContext(MaquinariaContext)
}
export function MaquinariaProvider({ children }) {
    const { local } = useLocal()
    const [maquinas, setMaquinas] = useState()
    const [selfDB, setDB] = useState()

    

    useEffect(() => {

        if(local){
             const db = database.collection("locales").doc(local.id).collection("maquinaria")
        setDB(db)

        }
       

    }, [local])

    useEffect(() => {
       
        let unsubscribe = null
        if (selfDB) {
            const maquinaria = []
           
            selfDB.orderBy("nombre").onSnapshot((snap) => {
                snap.forEach((m) => {
                    const _data = m.data()
                    
                    const data = Object.assign({}, _data, { pic: maquinasStandar.find(ms => ms.nombre == _data.nombre)?.pic })
                    
                    maquinaria.push({ id: m.id, ...data })
                })
                setMaquinas(maquinaria)
            })
        }

        return unsubscribe ? () => unsubscribe() : null
    }, [selfDB, setMaquinas])

    const createMaquina = (data) => {
        selfDB.add(data).then((query) => {
            console.log("maquinaria creada")
        })
    }

    const value = {
        maquinas,
        createMaquina,
        disponibles: maquinasStandar,
    }


    return (
        <MaquinariaContext.Provider value={value}>
            {children}
        </MaquinariaContext.Provider>
    )
}