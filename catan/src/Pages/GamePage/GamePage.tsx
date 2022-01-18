import "./GamePage.css"
import Terkep from "./../../Resources/terkep.png"
import Tile from "./Components/Tile/Tile"
import { useEffect, useState } from "react"
import { getCurrentPlayer, initGame, useSyncTileData } from "./load"
import Players from "./Components/Players/Players"
import ResourceView from "./Components/ResourcesView/ResourceView"
import { defaultResourceData, Player } from "../HomePage/users"
import DiceRoll from "./Components/DiceRoll/DiceRoll"

export default function GamePage() {

    //creataa 

    const [currentPlayer, setCurrentPlayer] = useState<Player>({ id: -1, name: "", resources: defaultResourceData, points: -1 })
    useEffect(() => {
        const player = JSON.parse(window.sessionStorage.getItem("sessionData") || "{}") as Player;
        getCurrentPlayer(player.id).then((d) => {
            if (d) {
                setCurrentPlayer(() => d)
            }
        })
        initGame()
    }, [])
    //sync the whole map
    const [metaData] = useSyncTileData()
    return (
        <div className="game-page">
            <Players />
            <DiceRoll/>
            <div className="terkep absolute">
                <img src={Terkep} alt="" className="absolute" onDragStart={(e)=>{
                    e.preventDefault()
                    return false
                }}/>
                <div className="items relative"> {
                    metaData?.tiles.map((e: any) => {
                        return (
                            <Tile type={e.type} id={"tile" + e.id} corners={e.corners} key={e.id} number={e.number} />
                        )
                    })
                }</div>
            </div>
            <ResourceView playerData={currentPlayer} />
        </div>
    )
}