import React, { useEffect, useState } from 'react'
import { FaPython } from 'react-icons/fa'
import { database } from '../firebase'
import { useCompis } from './CompisContext'
import moment from 'moment'

const generaSemana = (i, trabajadores, tramos) => {


    const inicio = i.clone().startOf('day')

    let dias = []
    for (let c = 0; c != 7; c++) {
        const ni = inicio.clone().add("days", c)
        const nombre= ni.format("dddd")
        const abbr=nombre==="miércoles"?'x':nombre.charAt(0)
      
        dias.push({
            i: ni,
            nombre,
            abbr,
            trabajadores,
            errores: [],
            horas: 0,
            tramos: generaTramos(ni, tramos)
        })
    }
    return { horas: 0, dias, errores: [] }
}

const generaTramos = (inicio, tramos) => {
    let momentedTramos=[]

    if (tramos) {
        const inicioTramoM = moment(inicio.format("YYYY-MM-DD") + " " + tramos[0].i)
        const finTramoM = moment(inicio.format("YYYY-MM-DD") + " " + tramos[0].f)
        const tramoM={i:inicioTramoM,f:finTramoM,abbr:"M"}

        const inicioTramoN = moment(inicio.format("YYYY-MM-DD") + " " + tramos[1].i)
        const finTramoN = moment(inicio.format("YYYY-MM-DD") + " " + tramos[1].f)
        const tramoN={i:inicioTramoN,f:finTramoN,abbr:"N"}

       momentedTramos=[tramoM,tramoN]

    }




    return momentedTramos

}


export const HorarioEditorContext = React.createContext();




export function useHorarioEditorContext() {
    return React.useContext(HorarioEditorContext)
}

export function HorarioEditorProvider(props) {
    const { children, i, t } = props
    const { compis } = useCompis()
    const [incio, setInicio] = useState(i)

    const [semana, setSemana] = useState(generaSemana(i, [], t))
    const [semanaAnterior, setSemanaAnterior] = useState(generaSemana(i.clone().add("days", 7), compis))
    const [tramoHorario, setTramoHorario] = useState()

    useEffect(() => {
        //console.log(compis)
        compis && setInicio(generaSemana(i, [],t))
    }, [compis])

    useEffect(() => {
        console.log("tramo horario " + tramoHorario?.i.format("(dddd) DD-MM-YYYY HH:mm")+" a "+tramoHorario?.f.format("HH:mm") || "vacio")
    }, [tramoHorario])

    const value = {
        incio,
        semana,
        semanaAnterior,
        tramoHorario,
        setTramoHorario

    }


    return (
        <HorarioEditorContext.Provider value={value}>

            {children}

        </HorarioEditorContext.Provider>
    )
}