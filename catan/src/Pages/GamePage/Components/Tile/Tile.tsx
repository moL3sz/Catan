import { ExportBundleInfo } from "firebase-functions/v1/analytics"
import { parse } from "path/posix"
import { useEffect, useState } from "react"
import { text } from "stream/consumers"
import { images, createImages, pos, tilePositions } from "../../load"
import Corner from "../Corner/Corner"
import "./Tile.css"
type tile = {
    id: string
    type: string
}
export default function Tile(props: tile) {
    const [texture, setTexture] = useState<HTMLImageElement>()
    const [pos, setPos] = useState<pos>({ x: 0, y: 0 })

    const [cornerPositions, setCorners] = useState<pos[]>([])
    useEffect(() => {
        const ID = parseInt(props.id)
        createImages()
        setTexture(images[props.type])
        setPos(() => tilePositions[parseInt(props.id) - 1])
        if (ID < 8) {
            const pre: pos[] = [
                { x: -5, y: 65 },
                { x: 102, y: -8 },
            ]
            if (ID == 3 || ID == 7) {
                pre.push({ x: 215, y: 65 },)
            }
            setCorners(pre)
        }
        else if (ID >= 8 && ID <= 12) {
            if(ID == 8){
                setCorners([
                    { x: -5, y: 65 },
                    { x: 102, y: -8 },
                    { x: 215, y: 65 },
    
                    { x: -68, y: 215 },
                    { x: 173, y: 215 },
                    { x: 24, y: 288 },
                ])
            }
            else{
                setCorners(
                    [
                        { x: 122, y: -8 },
                        { x: 225, y: 65 },
        
                        { x: 213, y: 215 },
                        { x: 64, y: 288 },
                    ]
                )
            }
            
        }
        else if (ID > 12 && ID <= 19) {
            const pre: pos[] = [
                { x: -8, y: 215 },
                { x: 104, y: 288 },
            ]
            if (ID == 16 || ID == 19) {

                pre.push({ x: 213, y: 215 })
            }
            setCorners(pre)
        }

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
                            <Corner x={e.x} y={e.y} id={cornerPositions.indexOf(e)} tileId={parseInt(props.id)}/>
                        )
                    })
                }
            </div>
        </div>
    )
}