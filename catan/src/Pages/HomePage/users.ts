import { getFirestore, getDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
import Cookies from 'universal-cookie';

import { app } from "../../Misc/firebase"

export type Resource = {
    id: number
    type: string,
    counts: number
}
export type Building = {
    id: number,
    points: number
}
export type Player = {
    id: number,
    name: string,
    resources: Resource[]
    points: number,
}
const generateID = async (): Promise<number> => {
    const d = await getDoc(doc(getFirestore(app), "/game/players"))
    const dp = d.data()
    const dd = dp?.players as Player[]
    if (dd.length > 0) {

        const reID = dd[dd.length - 1].id + 1
        ;(document as any).pID = reID;
        return reID
    }
    ; (window as any).currentPlayerID = 0;
    console.log((window as any).currentPlayerID)
    return 0
}

export const getPlayers = async (): Promise<Player[]> => {
    const d = await getDoc(doc(getFirestore(app), "/game/players"))
    const dp = d.data()
    const dd = dp?.players as Player[]
    return dd
}
export const defaultResourceData: Resource[] = [
    {
        id: 0,
        counts: 0,
        type: "buza"
    }, {
        id: 0,
        counts: 0,
        type: "fa"
    }, {
        id: 0,
        counts: 0,
        type: "tegla"
    }, {
        id: 0,
        counts: 0,
        type: "kavics"
    }, {
        id: 0,
        counts: 0,
        type: "birka"
    }
]
export const joinToGame = async ()=> {


    const inputField = document.getElementById("player-name") as HTMLInputElement;
    const playerName = inputField.value || `Guest#${Math.floor(Math.random() * 9999 + 1000)}`;

    //create the actual player data
    const genID = await generateID()
    const playerData: Player = {
        id: genID,
        name: playerName,
        resources: defaultResourceData,
        points: 0
    }


    //store the actual playerData in a cookie
    window.sessionStorage.setItem("sessionData",JSON.stringify(playerData))

    const parsedData = [...await getPlayers(), playerData]
    //when the game ends, the game will automatically truncate the list of players -> tho we should not care about the last session
    //make a firestore changes to store the actual player data
    await setDoc(doc(getFirestore(app), "/game/players"), {
        players: parsedData
    })
}


