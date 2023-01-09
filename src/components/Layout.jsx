import MyHeader from "@/components/Header";
// import { Container } from "react-bootstrap";
import { useSpring, animated } from "@react-spring/web";

export default function Index(props) {
	const styles = useSpring({
		to: [{ opacity: 1 }],
		from: { opacity: 0 },
	});
	return (
		<div>
			<MyHeader></MyHeader>
			<div className="m-auto mt-5 w-3/5">
				<animated.div style={styles}>{props.children}</animated.div>
			</div>
		</div>
	);
}
