import "./ResourceView.css"
import { resourceImages, usePlayer } from "../../load"
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
    useEffect(() => {
        //T odebug the current changes in the resources list
        //console.log(players[props.playerData.id])
    }, [players,props.playerData])
    return (
        <div className="resource-view absolute mt-">
            <div className="resources grid grid-rows-2 grid-cols-5 gap-x-5 pl-10 w-max">
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