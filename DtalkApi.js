function roomChatUpdate(i){
	
	var postJosn = {
		token: app.userid,
		lasttime: "1541570700274"
	};
	Vue.http.post('https://chat-circle.com/dtalk/chatroom/' + app.roomid, postJosn,{ emulateJSON: true }).then((response) => {
		console.log(response.body);
		viewDataupdate(response.body);
	}, (response) => {
		console.log("連接失敗重新嘗試");
		setTimeout(function(){roomChatUpdate(++i)},3000);
	});
}

function viewDataupdate(json){
	if(json.type == "roomchat"){
		var chat = json.data;
		for(var i = 0; i < chat.length; i++){
			if(chat[i].articleId == app.chatLastUser){
				app.chatJson[app.chatJson.length-1].className = "PostAuthorHeader";
			}else{
				app.chatJson.push({
					type: "name",
					className: "PostAuthorName",
					content: chat[i].name,
					time: chat[i].time
				});
			}
			app.chatJson.push({
				type: "message",
				className: "PostAuthorHeader " + chat[i].icon + "Icon",
				content: chat[i].message,
				time: chat[i].time
			});
			app.chatLastUser = chat[i].articleId;
			app.chatLastTime = chat[i].time;
		}
	}
}