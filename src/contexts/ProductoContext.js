import React, { useState, useEffect } from 'react';
import { database } from '../firebase'

const ProductoContext = React.createContext();



export function useProducto() {
    return React.useContext(ProductoContext)
}


export function ProductoProvider({ children }) {

    const [productos, setProductos] = React.useState();
    const [categorias, setCategorias] = React.useState();

    const value = {
        productos,
        categorias,
        loadProductoContext,
        upgradeProducto,
        upgradeProductoBulk
    }

    function loadProducto() {
        const productosRef = database.collection("productos")
        productosRef.get().then(querySnapshot => {
            console.log('Productos en db: ', querySnapshot.size);
            const lista = []
            querySnapshot.forEach(documentSnapshot => {
                lista.push({ id: documentSnapshot.id, ...documentSnapshot.data() })
            });
            setProductos(lista)

        }).catch(error => {
            console.log(error)
        });
    }

    function loadProductoContext() {
        loadProducto();
        database.collection("categorias_producto").get().then(query => {
            const lista = []
            query.forEach(document => { lista.push({ id: document.id, ...document.data() }) })
            console.log("Categorigas en bd :" + lista.length)
            setCategorias(lista)
        })
    }

    function upgradeProducto(prodID, data, deleteKey) {
        console.log(prodID)

        database.collection("productos").doc(prodID).update(data).
            then(() => {
                console.log("exito?")
                const newProductos = productos.map((producto) => {

                    const match = (producto.id == prodID)
                    data = deleteKey ? { categoria_id: undefined } : data
                    return match ? Object.assign({}, producto, data) : producto
                })
                console.log(newProductos)
                setProductos(newProductos)
            })
    }



    function upgradeProductoBulk(productosID, data, deleteKey) {
        const batch = database.batch()
        const nuevosProductos =[]
        
        productosID.forEach((prodID) => {
            
            const ref = database.collection("productos").doc(prodID)
            batch.update(ref, data)

            
            data = deleteKey ? { categoria_id: undefined } : data
            
            let producto =productos.find(p=>p.id==productosID)
            producto=Object.assign({},producto,data)
            nuevosProductos.push(producto)
            
        })

        batch.commit().then(()=>{
            console.log("***")
            let dataProductos=productos.map((producto)=>{
                const nuevoProducto =nuevosProductos.find((np)=>{return np.id===producto.id})
                nuevoProducto && console.log(nuevosProductos)
                return nuevoProducto? nuevoProducto:producto
            })

            setProductos(dataProductos)
        })



    }

    return (
        <ProductoContext.Provider value={value}>
            {children}
        </ProductoContext.Provider>
    )
}