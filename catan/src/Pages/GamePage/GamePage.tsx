import "./GamePage.css"
import Terkep from "./../../Resources/terkep.png"
import Tile from "./Components/Tile/Tile"
import { useEffect, useState } from "react"
import { createImages } from "./load"
export default function GamePage() {
    useEffect(() => {
        createImages()
    }, [])

    //here we will use the useCollection hook to render the changes from the database for the realtime
    const [tiles, setTiles] = useState<JSX.Element[]>(
        [
            <Tile id="1" type="fa" key={0} />,
            <Tile id="2" type="buza" key={1} />,
            <Tile id="3" type="kavics" key={2} />,

            <Tile id="4" type="tegla" key={3} />,
            <Tile id="5" type="birka" key={4} />,
            <Tile id="6" type="birka" key={4} />,
            <Tile id="7" type="birka" key={4} />,
            <Tile id="8" type="birka" key={4} />,
            <Tile id="9" type="birka" key={4} />,
            <Tile id="10" type="birka" key={4} />,
            <Tile id="11" type="birka" key={4} />,
            <Tile id="12" type="birka" key={4} />,
            <Tile id="13" type="birka" key={4} />,
            <Tile id="14" type="birka" key={4} />,
            <Tile id="15" type="birka" key={4} />,
            <Tile id="16" type="birka" key={4} />,
            <Tile id="17" type="birka" key={4} />,
            <Tile id="18" type="birka" key={4} />,
            <Tile id="19" type="birka" key={4} />,
        ])
    return (
        <div className="game-page">
            <div className="terkep absolute">
                <img src={Terkep} alt="" className="absolute" />
                <div className="items relative"> {
                    tiles.map(e => e)
                }</div>
            </div>
        </div>
    )
}