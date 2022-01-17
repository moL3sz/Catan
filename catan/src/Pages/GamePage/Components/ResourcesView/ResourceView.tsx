import "./ResourceView.css"
import { Building, resourceImages, usePlayer, buildings } from "../../load"
import { Player } from "../../../HomePage/users"
import { useEffect, useState } from "react"
type ResourceViewType = {
    playerData: Player
}
export const ResourceIndexes = [
    "kavics",

    "fa",
    "buza",
    "tegla",

    "birka"
]

export default function ResourceView(props: ResourceViewType) {
    const [players] = usePlayer()
    const [bldings, setBuildings] = useState<Building[]>(buildings)
    useEffect(() => {
        //T odebug the current changes in the resources list
        //console.log(players[props.playerData.id])
    }, [players, props.playerData])
    return (
        <div className="resource-view absolute bg-yellow-600 p-2 pr-10 rounded-xl ml-2 -mt-2">
            <p className="bg-yellow-900 text-white w-fit p-2 rounded-xl py-1 sub-title mb-2">Épületek / Nyersanyagok</p>

            <div className="buildings grid grid-rows grid-cols-3 pl-5  w-fit gap-x-5 place-items-center mb-2">
                {
                    buildings.map(e => {
                        return (
                            <div className="building-item" style={{
                                width: e.src.includes("ut") ? "4vh" : "6vh",
                            }} key={Math.floor(Math.random() * 10000000)}>
                                <img src={e.src} alt="" />
                            </div>
                        )
                    })
                }
                {
                    buildings.map((e) => {
                        return (
                            <div className="building-count-item text-3xl font-serif font-semibold text-red-800 text-center" key={Math.floor(Math.random() * 10000000)}>
                                {e.counts}
                            </div>
                        )
                    })
                }
            </div>
            <div className="resources grid grid-rows-2 grid-cols-5 gap-x-5 pl-5 w-max place-items-center border-t-4 pt-2 border-yellow-900">
                {
                    resourceImages.map((e) => (
                        <div className="resource-item w-[50px]" key={Math.floor(Math.random() * 1000)}>
                            <img src={e} alt="" />
                        </div>
                    ))
                }
                {
                    players[props.playerData.id]?.resources.map(e => {
                        return (
                            <div className="resource-count-item text-3xl font-serif font-semibold text-red-800 text-center" id={e.id.toString()}>
                                {
                                    e.counts
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}