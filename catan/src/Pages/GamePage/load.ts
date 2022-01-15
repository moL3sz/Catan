import Kavics from "./../../Resources/kavics.png"
import Fa from "./../../Resources/fa.png"
import Tegla from "./../../Resources/tegla.png"
import Buza from "./../../Resources/buza.png"
import Birka from "./../../Resources/birka.png"
import exp from "constants"
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
        if(cornerId == 0 && tileId != 7){
            return ret
        }
        if(tileId != 7){
            return [...ret, tileId > 5 ? tileId - 4 : tileId - 3] // 2. sor két szélső
        }
        else{
            return [...ret, tileId-1, tileId-4]
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
            if(tileId != 12){
                return [...ret, tileId + 4, tileId + 5]
            }
            else{
                return [...ret, tileId + 4]
                
            }
        }
        else if (cornerId == 5) {
            return [...ret, tileId > 10 ? tileId + 4 : tileId + 5]
        }
        else if(cornerId == 0 && tileId != 8){
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
        if (cornerId == 0 ) {
            if(tileId == 13){
                return ret
            }
            return [...ret, tileId-1, tileId+3]
        }
    }
    //5sor össze PIPAAA
    if(tileId > 17){
        if(cornerId == 0){
            return [...ret, tileId-1]
        }
        return ret
    }
    return ret
}



