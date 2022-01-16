import "./GamePage.css"
import Terkep from "./../../Resources/terkep.png"
import Tile from "./Components/Tile/Tile"
import { useEffect, useState } from "react"
import { createImages, initGame, Tile as TileType, useSyncTileData, Corner as CornerType } from "./load"
import { Player } from "./Components/Player/Player"
import Players from "./Components/Players/Players"
export default function GamePage() {
    const [tiles, setTiles] = useState<TileType[]>()
    useEffect(() => {
        console.log(initGame())
    }, [])
    const [metaData] = useSyncTileData()


    //here we will use the useCollection hook to render the changes from the database for the realtime
    return (
        <div className="game-page">
            <Players players={["Réka", "Kristóf","Dorka"]}/>
            <div className="terkep absolute">
                <img src={Terkep} alt="" className="absolute" />
                <div className="items relative"> {
                    metaData?.tiles.map((e:any) => {
                        return (
                            <Tile type={e.type}  id={"tile"+e.id} corners={e.corners} key={e.id}/>
                        )
                    })
                }</div>
            </div>
        </div>
    )
}