import { doc, getDoc, getFirestore } from "firebase/firestore"
import { Corner, setResource, Tile } from "./load"
import { app } from "../../Misc/firebase"
import { ResourceIndexes } from "./Components/ResourcesView/ResourceView"



export const gameplay = () => {


    //here comes the gamplay.... 
}
//in this game we will throw a dice twice in a the same time so you'Ll get a number between( 2 <= x <= 12)
export const diceRoll = (): number[] => {
    const dice1 = Math.floor(Math.random() * 5 + 1)
    const dice2 = Math.floor(Math.random() * 5 + 1)



    giveResourcesToPlayer(dice1 + dice1)
    return [dice1, dice2, dice1 + dice2]
}
//this function will got called when somebody throw a dice, and if the number matches that sb threw
//the function will serve the correct type and correct amount of resources
export const giveResourcesToPlayer = async (rolledNumber: number) => {
    //here comes the sucking phase :D


    const corners: CornerFromRolled[] = await getCornersFromRolledNumber(rolledNumber) // got the Corners (Corner[])
    //loop through the cornes check if the playerID for each corner is not -1 so there is sb's building there and check if it town or farm
    for(const corner of corners){
        if(corner.corner.playerID !== -1){
            await setResource(ResourceIndexes.indexOf(corner.type),corner.corner.tov != -1 ? corner.corner.tov+1 : 0, corner.corner.playerID)
        }   
    }
}
type CornerFromRolled = {
    corner: Corner,
    type: string
}
export const getCornersFromRolledNumber = async (rolledNumber: number): Promise<CornerFromRolled[]> => {
    //make an algorith that get a rolled number and return the correct corners for each tiles
    //could get from the database and from the frontend as well,
    //if I want to get from the DOM we will also send a request to the firestore so we can directly req the firestore to serve all data 
    const tiles = ((await getDoc(doc(getFirestore(app), "/game/tiles"))).data())?.tiles as Tile[]
    const correctNumberedTiles = tiles.filter((e) => (e.number == rolledNumber))
    const correctTiles = tiles.filter((e) => { //worst case O(6*2) ... 6corners and 2 same numbered tiles best case O(2*2)
        for (const ctn of correctNumberedTiles) {
            for (const corner of e.corners) {
                if (corner.cts.includes(ctn.id)) {
                    return true
                }
            }
        }
        return false
    })
    const correctCorners = correctTiles.map((e) => (e.corners))
    var pCOT: CornerFromRolled[] = []
    for (const coT of correctCorners) {
        for (const corner of coT) {
            for (const nt of correctNumberedTiles) {
                if (corner.cts.includes(nt.id)) {
                    pCOT.push({
                        corner:corner,
                        type: nt.type
                    })
                }
            }
        }
    }
    return pCOT.filter(onlyUnique)
}
function onlyUnique(value: CornerFromRolled, index: number, self:CornerFromRolled[]) : boolean{
    return self.indexOf(value) === index;
  }