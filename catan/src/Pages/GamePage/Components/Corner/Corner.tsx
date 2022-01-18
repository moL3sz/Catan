import { useEffect, useState } from "react"
import { calculatePtrsFromIDS, Corner as CornerType, updateCorner, buildings } from "../../load"
import "./Corner.css"
import { isImportOrExportSpecifier } from "typescript"
import { Player } from "../../../HomePage/users"

export type corner = {
    id: number,
    tileId: number,
    x: number,
    y: number
    cornerData: CornerType
}

export default function Corner(props: corner) {
    const scaleConnectedTiles = () => {
        const playerID = (JSON.parse(window.sessionStorage.getItem("sessionData") || "{}") as Player).id

        //check if theres an other players building
        if (props.cornerData.playerID === -1 || props.cornerData.playerID === playerID) {
            updateCorner(props.cornerData.tov == -1 ? 0 : 1, props.tileId, props.cornerData.id, playerID)
        }
    }
    useEffect(() => {
    }, [props.cornerData.tov])
    return (
        <div className="corner absolute" id={props.id.toString()} style={{
            left: `${props.x}px`,
            top: `${props.y}px`
        }} onClick={() => {
            scaleConnectedTiles();
        }}>
            <div className="building w-full h-full" style={{
                border: props.cornerData.tov == -1 ? "1px solid black" : "",
                transform: props.cornerData.tov == -1 ? "scale(1.2)" : "",
                boxShadow: props.cornerData.tov == -1 ? "0px 0px 5px rgb(32,18,18)" : ""
            }}>
                {
                    props.cornerData.playerID != -1 ? <img src={
                        props.cornerData.tov == 0 ? buildings[(props.cornerData.playerID + 1) * 3 - 2].src : props.cornerData.tov == 1 ? buildings[(props.cornerData.playerID + 1) * 3 - 3].src : ""
                    } alt="" /> : ""
                }
            </div>
        </div>
    )
}