import { useState } from "react"




export const useLogin = () : boolean =>{

    const [logged, setLogged] = useState<boolean>(false)
    return logged
}