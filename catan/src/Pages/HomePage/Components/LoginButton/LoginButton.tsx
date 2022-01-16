import { joinToGame } from "../../users"

export default function LoginButton(){



    const loginToGame = ()=>{
        //game join the player the the firestore database and set the player's data
       const l = async () =>{
           await joinToGame()
           window.location.pathname = "/game"
       }
       l()
    }
    return (
        <div className="login-button w-fit mx-auto my-auto">
            <button className="w-[30vh] py-2 bg-green-500 rounded-xl text-2xl font-light text-white active:bg-green-600 duration-100" onClick={()=>{
                //check for login
                loginToGame()
            }}>Login</button>
        </div>
    )
}