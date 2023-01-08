import React from "react";

const importAll = (requireContext) =>
	requireContext.keys().forEach(requireContext);
try {
	importAll(require.context("../assets/imgs/svgs/", true, /\.svg$/));
} catch (error) {
	console.log(error);
}
function SvgIcon(props) {
	return (
		<svg
			style={{ display: "inline-block", width: "25px", height: "25px" }}
			{...props}
		>
			<use xlinkHref={"#" + props.name} />
		</svg>
	);
}

export default SvgIcon;
