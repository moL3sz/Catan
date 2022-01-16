import LoginButton from "./Components/LoginButton/LoginButton";
import "./HomePage.css"
export default function HomePage() {
    return (
        <div className="homepage">
            <div className="title">
                <p className="text-red-700 mx-auto text-9xl font-serif font-semibold border-b-4 px-2 w-fit border-red-800">Catan</p>
                <p className="text-red-700 text-center text-5xl font-serif font-medium">Telepesei</p>
            </div>
            <div className="login p-5 bg-red-700 rounded-xl w-fit flex flex-col mx-auto mt-[20vh] space-y-5">
                <div className="username">
                    <p className="text-xl font-light text-white">Jatékosnév: </p>
                    <input type="text" className="p-2 w-[30vh]" id="player-name"/>

                </div>
                <LoginButton />

            </div>
        </div>
    )
}