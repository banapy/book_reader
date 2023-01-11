import MyHeader from "@/components/Header";
import { useSpring, animated } from "@react-spring/web";

export default function Index(props) {
	const styles = useSpring({
		to: [{ opacity: 1 }],
		from: { opacity: 0 },
	});
	return (
		<div>
			<MyHeader></MyHeader>
			<div className="m-auto mt-5 xs:w-11/12">
				<animated.div style={styles}>{props.children}</animated.div>
			</div>
		</div>
	);
}
