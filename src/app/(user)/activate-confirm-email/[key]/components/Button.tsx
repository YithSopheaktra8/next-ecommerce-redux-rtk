import style from "./style.module.css";
type Props = {
	title: string;
	onClick?: () => void;
	classname?: string;
};

export default function Button({ title, onClick, classname }: Props) {
	return (
		<button onClick={onClick} className={`${style.container} ${classname}`}>
			{title}
		</button>
	);
}
