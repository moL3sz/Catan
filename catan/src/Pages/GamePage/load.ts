import Kavics from "./../../Resources/kavics.png"
import Fa from "./../../Resources/fa.png"
import Tegla from "./../../Resources/tegla.png"
import Buza from "./../../Resources/buza.png"
import Birka from "./../../Resources/birka.png"

//import the resource imgages (from views)


import Kavics_Resource from "./../../Resources/kavics_re.png"
import Fa_Resource from "./../../Resources/fa_re.png"
import Buza_Resource from "./../../Resources/buza_re.png"
import Tegla_Resource from "./../../Resources/tegla_re.png"
import Birka_Resource from "./../../Resources/birka_re.png"


import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore"
import { getFirestore, getDocs, collection, query, orderBy, doc, getDoc, setDoc } from "firebase/firestore"
import { addTilesToFirestore, app } from "../../Misc/firebase"
import { useEffect, useState } from "react"
import { getPlayers, Player, Resource } from "../HomePage/users"
import { consumers } from "stream"
export type pos = {
    x: number,
    y: number
}
export const images: { [name: string]: any } = {}
export const createImages = async () => {
    const kavics = new Image();
    kavics.src = Kavics

    const fa = new Image();
    fa.src = Fa

    const tegla = new Image();
    tegla.src = Tegla

    const buza = new Image();
    buza.src = Buza

    const birka = new Image();
    birka.src = Birka


    images["kavics"] = kavics;
    images["fa"] = fa;
    images["birka"] = birka;
    images["buza"] = buza;
    images["tegla"] = tegla;
}
export const counts = {
    "birka": 4,
    "fa": 4,
    "buza": 4,
    "ko": 3,
    "tegla": 3
}
export const resourceImages: string[] = [
    Kavics_Resource,
    Fa_Resource,
    Buza_Resource,
    Tegla_Resource,
    Birka_Resource
]
export const tilePositions: pos[] = [
    { x: 475, y: 145 },
    { x: 475 + 260, y: 145 },
    { x: 475 + 260 + 260, y: 145 },
    { x: 475 - 131, y: 145 + 222 },

    { x: 475 - 131 + 262, y: 145 + 222 },
    { x: 475 - 131 + 262 + 262, y: 145 + 222 },
    { x: 475 - 131 + 262 + 262 + 262, y: 145 + 222 },
    { x: 475 - 262, y: 145 + 222 + 222 },
    { x: 475, y: 145 + 222 + 222 },
    { x: 475 + 262, y: 145 + 222 + 222 },
    { x: 475 + 262 + 262, y: 145 + 222 + 222 },
    { x: 475 + 262 + 262 + 262, y: 145 + 222 + 222 },
    { x: 475 - 131, y: 145 + 222 + 222 + 222 },
    { x: 475 + 131, y: 145 + 222 + 222 + 222 },
    { x: 475 + 131 + 262, y: 145 + 222 + 222 + 222 },
    { x: 475 + 131 + 262 + 262, y: 145 + 222 + 222 + 222 },
    { x: 475, y: 145 + 222 + 222 + 222 + 222 },
    { x: 475 + 260, y: 145 + 222 + 222 + 222 + 222 },
    { x: 475 + 260 + 260, y: 145 + 222 + 222 + 222 + 222 },
]

export const calculatePtrsFromIDS = (tileId: number, cornerId: number): number[] => {
    const ret: number[] = [tileId]
    // első sor PIPIAAAAA
    if (tileId > 1 && tileId < 4) {
        if (cornerId == 0) {
            return [...ret, tileId - 1]
        }
        return ret
    }
    //2. sor PIPAAAAA
    if (tileId >= 4 && tileId <= 7) {
        if (tileId > 4 && tileId < 7) {
            if (cornerId == 0) {
                return [...ret, tileId - 1, tileId - 4]
            }
            else if (cornerId == 1) {
                return [...ret, tileId - 3, tileId - 4]
            }
        }
        if (cornerId == 0 && tileId != 7) {
            return ret
        }
        if (tileId != 7) {
            return [...ret, tileId > 5 ? tileId - 4 : tileId - 3] // 2. sor két szélső
        }
        else {
            return [...ret, tileId - 1, tileId - 4]
        }
    }
    //3 sor (2sor, 4sor) PIPAAAA
    if (tileId >= 8 && tileId <= 12) {
        if (tileId > 8 && tileId < 12) {
            if (cornerId == 0) {
                return [...ret, tileId - 5, tileId - 4]
            }
            if (cornerId == 1) {
                return [...ret, tileId + 1, tileId - 4]
            }
            if (cornerId == 2) {
                return [...ret, tileId + 1, tileId + 5]
            }
            if (cornerId == 3) {
                return [...ret, tileId + 4, tileId + 5]
            }
        }
        if (cornerId == 1 && tileId != 12) {
            return [...ret, tileId > 10 ? tileId - 5 : tileId - 4]
        }
        else if (cornerId == 2 && tileId != 12) {
            return [...ret, tileId + 1, tileId - 4]
        }
        else if (cornerId == 4) {
            return [...ret, tileId + 1, tileId + 5]
        }
        else if (cornerId == 3) {
            if (tileId != 12) {
                return [...ret, tileId + 4, tileId + 5]
            }
            else {
                return [...ret, tileId + 4]

            }
        }
        else if (cornerId == 5) {
            return [...ret, tileId > 10 ? tileId + 4 : tileId + 5]
        }
        else if (cornerId == 0 && tileId != 8) {
            return [...ret, tileId - 5]
        }
    }
    //4sor + 5sor PIPAAA
    if (tileId >= 13 && tileId <= 16) {
        if (tileId > 13 && tileId < 16) {
            if (cornerId == 0) {
                return [...ret, tileId - 1, tileId + 3]
            }
            if (cornerId == 1) {
                return [...ret, tileId + 3, tileId + 4]
            }
        }
        if (cornerId == 1) {
            return [...ret, tileId > 14 ? tileId + 3 : tileId + 4]
        }
        if (cornerId == 0) {
            if (tileId == 13) {
                return ret
            }
            return [...ret, tileId - 1, tileId + 3]
        }
    }
    //5sor össze PIPAAA
    if (tileId > 17) {
        if (cornerId == 0) {
            return [...ret, tileId - 1]
        }
        return ret
    }
    return ret
}

export type Corner = {
    id: number,
    playerID: number,
    cts: number[],
    tov: number
}
export type Tile = {
    id: number,
    type: string
    isTheft: boolean
    corners: Corner[],
}

function shuffleArray(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export const createCornersFromTileID = (tileID: number) => {
    var corners: pos[] = []
    if (tileID < 8) {
        const pre: pos[] = [
            { x: -5, y: 65 },
            { x: 102, y: -8 },
        ]
        if (tileID == 3 || tileID == 7) {
            pre.push({ x: 215, y: 65 },)
        }
        corners = pre
    }
    else if (tileID >= 8 && tileID <= 12) {
        if (tileID == 8) {
            corners = [
                { x: -5, y: 65 },
                { x: 102, y: -8 },
                { x: 215, y: 65 },

                { x: -68, y: 215 },
                { x: 173, y: 215 },
                { x: 24, y: 288 },
            ]
        }
        else {
            corners =
                [
                    { x: 122, y: -8 },
                    { x: 225, y: 65 },

                    { x: 213, y: 215 },
                    { x: 64, y: 288 },
                ]

        }

    }
    else if (tileID > 12 && tileID <= 19) {
        const pre: pos[] = [
            { x: -8, y: 215 },
            { x: 104, y: 288 },
        ]
        if (tileID == 16 || tileID == 19) {

            pre.push({ x: 213, y: 215 })
        }
        corners = pre
    }
    return corners
}
//init the game with random tiles
export const initGame = async () => {
    const gameOver = await getGameOver()
    console.log(gameOver)
    if (!gameOver) {
        return
    }
    const tileTypes = ["birka", "birka", "birka", "birka", "buza", "buza", "buza", "buza", "fa", "fa", "fa", "fa", "kavics", "kavics", "kavics", "tegla", "tegla", "tegla"]
    const tiles: Tile[] = []
    shuffleArray(tileTypes)
    tileTypes.forEach((t, i) => {
        const crs = createCornersFromTileID(i + 1)
        var cid = 0
        const T: Tile = {
            id: i + 1,
            type: t,
            isTheft: false,
            corners: crs.map(e => {
                return {
                    id: cid++,
                    playerID: -1,
                    cts: calculatePtrsFromIDS(i + 1, cid),
                    tov: -1,
                }
            })
        }
        tiles.push(T)
    })
    //call the funciton to add the tiles into the firestore database
    addTilesToFirestore(tiles)
    //set gameOver false, means
    await setGameOver(false)
    return tiles
}
export function useSyncTileData() {

    const tilesRef = doc(getFirestore(app), "/game/tiles")
    const [tiles] = useDocumentData(tilesRef)
    return [tiles]
}

//update corner data -> in progress (just for test)
export const updateCorner = async (tov: number, TID: number, cornerID: number) => {
    const dd = await getDoc(doc(getFirestore(app), `/game/tiles`)) //get the actual data from the firestore
    const p = dd.data()
    const d = p?.tiles as Tile[]
    d[TID - 1].corners[cornerID].tov = tov
    await setDoc(doc(getFirestore(app), "/game/tiles"), { tiles: d })
}
//hook for each player that joins
export const usePlayer = (): [Player[]] => {
    const playersRef = doc(getFirestore(app), "/game/players");
    var plys: any[] = [];
    useEffect(() => {
        (async () => {
            const a = (await getDoc(playersRef)).data()
            plys = a?.players
        })()
    }, [])

    const [players] = useDocumentData(playersRef)
    return [players?.players || plys]
}
export const useGameOver = (): [boolean, (gameover: boolean) => any] => {
    const gameDataRef = doc(getFirestore(app), "/game/gameData")
    const [gameData] = useDocumentData(gameDataRef)
    const setGameOver = (gameover: boolean) => {
        (async () => {
            await setDoc(doc(getFirestore(app), "/game/gameData"), {
                gameover: gameover
            })
        })()
    }
    return [gameData?.gameover, setGameOver]
}
//get the gameover data
export const getGameOver = async (): Promise<boolean> => {
    const gameDataRef = doc(getFirestore(app), "/game/gameData")
    const d = (await getDoc(gameDataRef)).data()
    return d?.gameover || false
}
//set game over in firestore
export const setGameOver = async (go: boolean) => {
    const gameDataRef = doc(getFirestore(app), "/game/gameData")
    await setDoc(gameDataRef, { gameover: go })
}

    //we can manually set the game over to debug
    ; (window as any).setGameOver = async (go: boolean) => {
        await setGameOver(go)
    }

export const getCurrentPlayer = async (playerID: number) => {
    const playersDoc = (await getDoc(doc(getFirestore(app), "/game/players"))).data()
    const playersList: Player[] = playersDoc?.players;
    return playersList.find(e => (e.id === playerID))
}



export const setResource = async (resourceId: number, changes: number, playerId: number) => {
    const players = await getPlayers()//changes means how the resource counts changes
    //make the changes

    players[playerId].resources[resourceId].counts += changes
    console.log(players)

    //commit the changes
    await setDoc(doc(getFirestore(app),"/game/players"),{players:players})
}