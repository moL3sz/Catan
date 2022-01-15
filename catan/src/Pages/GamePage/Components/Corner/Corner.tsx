import { useEffect, useState } from "react"
import { calculatePtrsFromIDS } from "../../load"
import "./Corner.css"
import { Player } from "../Player/Player"

export type corner = {
    id: number,
    tileId: number,
    x: number,
    y: number
}
export default function Corner(props:corner){
    const [ptrs, setPtrs] = useState<number[]>([props.id])


    const [player, setPlayer] = useState<typeof Player | null>()
    const scaleConnectedTiles = ()=>{

        //JUST FOR DEBUG
        console.log(ptrs)
        for(const ptr of ptrs){
            const tile = document.getElementById(ptr.toString()) as HTMLDivElement;
            tile.style.backgroundColor = "rgba(0,0,0,0.4)"
            console.log(tile)
        }
    }
    useEffect(()=>{
        setPtrs(calculatePtrsFromIDS(props.tileId,props.id))
    },[])
    return (
        <div className="corner absolute" id={props.id.toString()} style={{
            left:  `${props.x}px`,
            top:  `${props.y}px`
        }} onClick={()=>{
            scaleConnectedTiles();
        }}>

        </div>
    )
}