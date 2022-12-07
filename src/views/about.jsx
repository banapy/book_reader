import MyHeader from "@/components/Header";
import { Container } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
export default function Index() {
	const msg = `
#### 愿景
我还处于成长期🐣，但有个大大的梦想，就是人们在空闲时首先想到的是阅读📚，而不是刷短视频📷，玩游戏🎮。有此想法的朋友，请关注我的成长吧。❤️

#### 特性
- 是一个在线的私人书房📚，可导入epub格式的书籍、向好友分享🚀、在线阅读、随时随地记笔记🗈。
- 目前只支持epub格式的书籍⚠️，网站全部功能完成后，仍会支持其它格式。
#### 未来计划
1. 完成web端的全部功能
2. 开发微信公众号，公众号不定期分享书籍，可向公众号发送epub文件，实现导入书籍的功能。
3. 开发小程序端，方便在微信中分享书籍、书摘、笔记等功能

#### 为什么不是微信阅读
微信阅读是个很不错的阅读生态，有资源丰富的在线书城，便捷好用的阅读软件。微信阅读将自己定位于社交阅读，初心是在和朋友的阅读时长的比较中激励阅读，
但在发展中强化社交属性，使自己偏离了激励阅读的本质，正逐渐成为一个社交大于阅读的付费软件。

本网站由众多阅读爱好者，书香社会建设者共同开发，所有功能开源，免费，除了开发支持便捷阅读的功能外，仍不停的和各位同仁探索激励社会阅读的方法，并付出实践。

#### 为网站注入一点力量
##### 1. 参与开发
我要为网站开发注入力量。[github](https://github.com/banapy/book_reader)
##### 2. 升级服务器
服务器太烂了，我要给你升级。***暂时还不知道如何接受支持，有想法的请联系站长。***

#### 贡献者
感谢github中所有的参与者❤️

[![贡献者](https://contrib.rocks/image?repo=banapy/book_reader "Shiprock")](https://github.com/banapy/book_reader/graphs/contributors)

#### 站长
只是一名小小的程序员，不要给予太多关注。
	`;
	return (
		<Container>
			<MyHeader></MyHeader>
			<ReactMarkdown>{msg}</ReactMarkdown>
		</Container>
	);
}
