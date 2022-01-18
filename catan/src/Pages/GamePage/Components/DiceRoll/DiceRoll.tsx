import { useEffect, useState } from "react"
import Dice from "./Dice"
import "./DiceRoll.css"
import { diceRoll } from "../../gameplay"
import OldTexutre from "./../../../../Resources/old_texture.jpg"

export default function DiceRoll() {
    const [diceNumbers, setDiceNumbers] = useState<number[]>([1, 1])
    return (
        <div className="dice-roll absolute mt-2 mr-20">
            <div className="dice-content flex flex-row justify-center">
                {
                    diceNumbers.map((v) => (
                        <Dice value={v} key={0} />
                    ))
                }
            </div>
            <button className="bg-yellow-800 w-full py-2 text-3xl font-semibold dobj text-white rounded-xl duration-100 hover:scale-105" onClick={() => {
                const [roll1, roll2, sum] = diceRoll()
                setDiceNumbers(() => [roll1, roll2])
            }}>
                <div className="old-texture absolute h-[50px] w-full -mt-2 rounded-xl " style={{
                    backgroundImage: `url(${OldTexutre})`,
                    zIndex:2,
                    opacity:0.6
                }}>

                </div>
                
                <span className="dobj-text">Dobj!</span> 


            </button>
        </div>
    )
}