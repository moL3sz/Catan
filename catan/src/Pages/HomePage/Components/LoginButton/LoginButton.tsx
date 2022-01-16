export default function LoginButton(){



    const loginToGame = ()=>{
        window.location.pathname = "/game"

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