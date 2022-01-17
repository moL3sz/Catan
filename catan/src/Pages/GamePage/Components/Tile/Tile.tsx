import { ExportBundleInfo } from "firebase-functions/v1/analytics"
import { parse } from "path/posix"
import { useEffect, useState } from "react"
import { text } from "stream/consumers"
import { Player } from "../../../HomePage/users"
import { images, createImages, pos, tilePositions, createCornersFromTileID, Corner as CornerType, setResource } from "../../load"
import Corner from "../Corner/Corner"
import { ResourceIndexes } from "../ResourcesView/ResourceView"
import "./Tile.css"
type tile = {
    id: string,
    type: string,
    corners: CornerType[]
}
export default function Tile(props: tile) {
    const [texture, setTexture] = useState<HTMLImageElement>()
    const [pos, setPos] = useState<pos>({ x: 0, y: 0 })
    const [cornerPositions, setCorners] = useState<pos[]>([])
    var index = 0;
    useEffect(() => {
        index = 0;
        const ID = parseInt(props.id.slice(4))
        //cache the images and create it
        createImages()
        //set the appropriate texture of each tile
        setTexture(images[props.type])
        setPos(() => tilePositions[ID - 1])
        setCorners(() => createCornersFromTileID(ID))
    }, [])
    const testResourceChange = ()=>{

        const player = JSON.parse(window.sessionStorage.getItem("sessionData") || "{}") as Player
        setResource(ResourceIndexes.indexOf(props.type),1,player.id)
    }
    return (
        <div className="tile w-[265px] h-[265px] absolute" id={props.id}
            style={{
                left: `${pos?.x}px`,
                top: `${pos?.y}px`,
            }}>
            <img src={texture?.src} alt="" className="absolute" onDragStart={(e) => {
                e.preventDefault();
                return false;
            }}
            
            onClick={()=>{
                testResourceChange()
            }}
            />
            <div className="corners absolute">
                {
                    cornerPositions.map(e => {
                        return (
                            <Corner x={e.x} y={e.y} id={cornerPositions.indexOf(e)} tileId={parseInt(props.id.slice(4))} cornerData={props.corners[index++]} key={index} />
                        )
                    })
                }
            </div>
        </div>
    )
}