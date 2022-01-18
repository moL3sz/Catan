import { useEffect, useState } from "react"
import Dice from "./Dice"
import "./DiceRoll.css"
import { diceRoll, giveResourcesToPlayer } from "../../gameplay"
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
            <div className="rolled-numbers-results text-center text-5xl font-serif flex flex-row place-items-center space-x-3">
                <span className="text-2xl">Dobás eredménye: </span>
                <span className="font-bold">
                     { diceNumbers[0] + diceNumbers[1]}
                </span>
            </div>
            <button className="bg-yellow-800 w-full py-2 text-3xl font-semibold dobj text-white rounded-xl duration-100 hover:scale-105" onClick={async () => {
                const [roll1, roll2, sum] = diceRoll()
                await giveResourcesToPlayer(roll1+roll2)
                setDiceNumbers(() => [roll1, roll2])
            }}>
                <div className="old-texture absolute h-[50px] w-full -mt-2 rounded-xl " style={{
                    backgroundImage: `url(${OldTexutre})`,
                    zIndex: 2,
                    opacity: 0.6
                }}>

                </div>

                <span className="dobj-text">Dobj!</span>


            </button>
        </div>
    )
}