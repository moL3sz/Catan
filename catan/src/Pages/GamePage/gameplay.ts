



export const gameplay = () => {

}

//in this game we will throw a dice twice in a the same time so you'Ll get a number between( 2 <= x <= 12)
export const diceRoll = (): number[] => {
    const dice1 = Math.floor(Math.random() * 5 + 1)
    const dice2 = Math.floor(Math.random() * 5 + 1)



    giveResourcesToPlayer(dice1 + dice1)
    return [dice1, dice2, dice1 + dice2]
}
//this function will got called when somebody throw a dice, and if the number matches that sb threw, the function will serve the correct type and correct amount of resources
export const giveResourcesToPlayer = (tileID: number) => {

}