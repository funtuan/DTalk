var app = new Vue({
	el: '#app',
	data: {
	
		chatJson: [{
			type: "status",
			className: "PostAuthorStatus",
			content: "中興大學185 加入聊天室",
			time: new Date()
		},
		{
			type: "name",
			className: "PostAuthorName",
			content: "話多女子 is Myname",
			time: new Date()
		},
		{
			type: "message",
			className: "PostAuthorHeader",
			content: "1.好想成為文章的主角……",
			time: new Date()
		},
		{
			type: "message",
			className: "PostAuthorHeader femaleIcon",
			content: "2.可惜差少一個男主角(´･ω･`)",
			time: new Date()
		},
		{
			type: "name",
			className: "PostAuthorName",
			content: "東吳男子",
			time: new Date()
		},
		{
			type: "message",
			className: "PostAuthorHeader",
			content: "!!!!",
			time: new Date()
		},
		{
			type: "message",
			className: "PostAuthorHeader maleIcon",
			content: "XDDD",
			time: new Date()
		}
		]
	}
})