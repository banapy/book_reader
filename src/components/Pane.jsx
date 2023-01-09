import { useSpring, animated } from "@react-spring/web";
import useMeasure from "react-use-measure";
export default function Index(props) {
	const [menuRef, menuMeasure] = useMeasure();
	const l_open = {
		from: { x: -1 * menuMeasure.width },
		to: { x: 0 },
	};
	const l_close = {
		from: { x: 0 },
		to: { x: -1 * menuMeasure.width },
	};
	const styles = useSpring(props.show ? l_open : l_close);
	return (
		<animated.div className="h-full absolute w-96" style={styles} ref={menuRef}>
			{props.children}
		</animated.div>
	);
}
