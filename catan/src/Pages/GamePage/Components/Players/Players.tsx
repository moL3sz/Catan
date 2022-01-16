import { useEffect } from "react"
import { usePlayer } from "../../load"
import "./Players.css"
export default function Players() {
    const [players] = usePlayer()
    useEffect(() => {
    }, [])
    return (
        <div className="players-list absolute left-0 top-0 p-10 w-fit h-fit  ">
            <p className="font-medium -ml-5">Játékosok:</p>
            <div className="players -pl-2">
                {
                    players.map((e: any) => {
                        return (
                            <p>- {e.name}</p>
                        )
                    })
                }
            </div>
        </div>
    )

}