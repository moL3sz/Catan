import "./Players.css"




type players_list = {
    players: string[]
}


export default function Players(props: players_list){

    return (
        <div className="players-list absolute left-0 top-0 p-10 w-fit h-fit  ">
            <p className="font-medium -ml-5">Játékosok:</p>
            <div className="players -pl-2">
                {
                    props.players.map(e=>{
                        return (
                            <p>- {e}</p>
                        )
                    })
                }
            </div>
        </div>
    )

}