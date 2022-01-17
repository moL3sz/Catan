import { useEffect, useState } from "react"
import { calculatePtrsFromIDS, Corner as CornerType, updateCorner} from "../../load"
import "./Corner.css"
import { isImportOrExportSpecifier } from "typescript"

export type corner = {
    id: number,
    tileId: number,
    x: number,
    y: number
    cornerData: CornerType
}

export default function Corner(props:corner){

    const scaleConnectedTiles = ()=>{
        updateCorner(0, props.tileId, props.cornerData.id)
    }
    useEffect(()=>{
    },[props.cornerData.tov])
    return (
        <div className="corner absolute" id={props.id.toString()} style={{
            left:  `${props.x}px`,
            top:  `${props.y}px`
        }} onClick={()=>{
            scaleConnectedTiles();
        }}>
            <div className="building w-full h-full" style={{
                backgroundColor: props.cornerData.tov == 0 ? "red" : "green"
            }}>
            </div>
        </div>
    )
}