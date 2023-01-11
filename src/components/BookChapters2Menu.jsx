import { ReactTree } from "@naisutech/react-tree";
import { useEffect, useRef, useState } from "react";

function recurse(toc, parentId, treeData) {
	if (Array.isArray(toc) && toc.length) {
		for (let tocItem of toc) {
			const node = {
				id: tocItem.id,
				label: tocItem.label,
				parentId: parentId,
				tocItem: tocItem,
			};
			if (tocItem.subitems.length) {
				node.items = [];
			}
			treeData.push(node);
			recurse(tocItem.subitems, tocItem.id, treeData);
		}
		return treeData;
	} else {
		return;
	}
}
export default function Index(props) {
	const [realTreeData, set_realTreeData] = useState([]);
	const [defaultOpenNodes, set_defaultOpenNodes] = useState([]);
	const [loading, set_loading] = useState(false);
	useEffect(() => {
		set_loading(true);
		be.on("renderBook", (book) => {
			const treeData = recurse(book.metaData.toc, null, []);
			set_loading(false);
			set_realTreeData(treeData);
			let openNodeIdList = new Set();
			for (let i of treeData) {
				if (i.parentId !== null) {
					openNodeIdList.add(i.parentId);
				}
			}
			openNodeIdList = Array.from(openNodeIdList);
			set_defaultOpenNodes(openNodeIdList);
		});
	}, []);
	const onToggleSelectedNodes = (nodeIdList) => {
		if (!nodeIdList.length) return;
		const nodeId = nodeIdList[0];
		const nodeData = realTreeData.find((x) => x.id === nodeId);
		be.goChapter(nodeData.tocItem.href);
	};
	return (
		<div className="fixed left-0 overflow-auto lg:w-96 xs:w-full" style={{ height: "95%" ,zIndex:1}}>
			<ReactTree
				openNodes={defaultOpenNodes}
				nodes={realTreeData}
				loading={loading}
				showEmptyItems={false}
				noIcons={true}
				onToggleSelectedNodes={onToggleSelectedNodes}
			></ReactTree>
		</div>
	);
}
