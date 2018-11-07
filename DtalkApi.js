function roomChatUpdate(i,callback){
	
	var postJosn = {
		token: app.userid,
		lasttime: app.chatLastTime
	};
	Vue.http.post('https://chat-circle.com/dtalk/chatroom/' + app.roomid, postJosn,{ emulateJSON: true }).then((response) => {
		//console.log(response.body);
		viewDataupdate(response.body,callback);
	}, (response) => {
		console.log("連接失敗重新嘗試");
		if(i <= 3){
			setTimeout(function(){roomChatUpdate(++i,callback)},3000);
		}else{
			//callback();
		}
	});
}

function viewDataupdate(json,callback){
	if(json.type == "roomchat"){
		var chat = json.data;
		for(var i = 0; i < chat.length; i++){
			if(chat[i].articleId != app.useridsha){
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
	if(json.type == "error"){
		app.errorShow(json.message);
	}
	document.body.scrollTop = 100000;
	callback();
}

function sellMessage(i,message){
	
	if(app.userid == app.chatLastUser){
		app.chatJson[app.chatJson.length-1].className = "PostAuthorHeader";
	}else{
		app.chatJson.push({
			type: "name",
			className: "PostAuthorName",
			content: app.name,
			time: new Date().getTime()
		});
	}
	app.chatJson.push({
		type: "message",
		className: "PostAuthorHeader " + app.icon + "Icon",
		content: message,
		time: new Date().getTime()
	});
	app.chatLastUser = app.userid;
	app.chatLastTime = new Date().getTime();
	
	var postJosn = {
		name: app.name,
		icon: app.icon,
		token: app.userid,
		message: message
	};
	
	function sellApi(i){
		console.log(postJosn);
		Vue.http.post('https://chat-circle.com/dtalk/chatSell/' + app.roomid, postJosn,{ emulateJSON: true }).then((response) => {
			console.log(response.body);
			document.body.scrollTop = 100000;
		}, (response) => {
			console.log("連接失敗重新嘗試");
			if(i <= 3){
				sellApi(++i);
			}else{
				//callback();
			}
		});
	
	}
	sellApi(0);
}