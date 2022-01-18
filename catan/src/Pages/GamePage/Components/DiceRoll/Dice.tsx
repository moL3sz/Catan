import "./Dice.css";

const Pip = () => <span className="pip" />;



type face = {
	children: JSX.Element[]
}
const Face = (props: face) => <div className="face">{
	props.children.map(v=>(v))
}</div>;


type dice = {
	value: number
}
const Dice = (props: dice) => {
	let pips = Number.isInteger(props.value)
		? Array(props.value)
			.fill(0)
			.map((_, i) => <Pip key={i} />)
		: [];
	return <Face children={pips}/>
};

export default Dice;
