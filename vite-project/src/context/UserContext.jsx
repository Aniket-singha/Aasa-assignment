import { createContext, useContext, useState } from "react";

const UserContext=createContext()

function UserProvider({children}){

const [currentUser,setCurrentUser]=useState(null);


return <UserContext.Provider value={{currentUser,setCurrentUser}}>
{children}
</UserContext.Provider>


}

function useUser(){
    const context=useContext(UserContext)
    if(context===undefined) throw new Error('Context was used outside')
return context;
}

export {UserProvider,useUser}
