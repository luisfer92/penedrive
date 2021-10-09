import React, { useEffect } from 'react'



import { useProducto } from './ProductoContext';
import firebase,{auth,database,storage} from '../firebase'

const AuthContext = React.createContext();



export function useAuth() {
    return React.useContext(AuthContext)
}


export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = React.useState(auth.currentUser);
    const [loggedOut,setLoggedOut]=React.useState(false)
    const [loading, setLoading] = React.useState(true);
    const {loadProductoContext} = useProducto();
    const [userAPI,setUserApi]=React.useState()

    const value = {
        currentUser,
        userAPI,
        loggedOut,
        loading,
        login,
        logout,
        loadUserData,
       
        
    }

 
    function  loadUserData (usuairo) {
        const uid=usuairo.uid
        database.collection("usuarios").doc(uid).get().then(queryResult=>{
            const data=queryResult.data()
           
            
            queryResult.exists && storage.ref('fotos_perfil/'+uid+".png").getDownloadURL().
                then((url)=>setUserApi(Object.assign({},data,{id:uid,profileUrl:url})))
        })
    }

    function login(email, password) {
        

        return auth.setPersistence("local")
            .then(() => {
                // Existing and future Auth states are now persisted in the current
                // session only. Closing the window would clear any existing state even
                // if a user forgets to sign out.
                // ...
                // New sign-in will be persisted with session persistence.
                setLoading(true)
                return firebase.auth().signInWithEmailAndPassword(email, password);
            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                (errorCode && errorMessage) && console.log(`error:${errorCode} \n ${errorMessage}`)
            });
       
       
    }

    function logout() {
        setLoggedOut(true)
        return auth.signOut();
    }

    useEffect(() => {
        
        
        const unsubscribre = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            user && loadUserData(user)
            user && loadProductoContext()
        })
        

        return unsubscribre;
    }, [])

    useEffect(()=>{
        currentUser && setLoading(false)
        
    },[currentUser])


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}