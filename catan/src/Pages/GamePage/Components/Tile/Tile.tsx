import { ExportBundleInfo } from "firebase-functions/v1/analytics"
import { parse } from "path/posix"
import { useEffect, useState } from "react"
import { text } from "stream/consumers"
import { images, createImages, pos, tilePositions, createCornersFromTileID, Corner as CornerType } from "../../load"
import Corner from "../Corner/Corner"
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
        createImages()
        setTexture(images[props.type])
        setPos(() => tilePositions[ID - 1])
        setCorners(() => createCornersFromTileID(ID))
        //add the tile data to metadata
    }, [])

    return (
        <div className="tile w-[265px] h-[265px] absolute" id={props.id}

            style={{
                left: `${pos?.x}px`,
                top: `${pos?.y}px`,
            }}>

            <img src={texture?.src} alt="" className="absolute" />
            <div className="corners absolute">

                {
                    cornerPositions.map(e => {
                            return (
                                <Corner x={e.x} y={e.y} id={cornerPositions.indexOf(e)} tileId={parseInt(props.id.slice(4))} cornerData={props.corners[index++]} />
                            )
                })
                }
            </div>
        </div>
    )
}