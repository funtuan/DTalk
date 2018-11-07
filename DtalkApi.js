function roomChatUpdate(){
	
	var postJosn = {
		token: "7s1qsy9jj5m",
		lasttime: "1541570700274"
	}
	Vue.http.post('http://chat-circle.com/dtalk/chatroom/10013',postJosn ).then((response) => {
		console.log(response.json);
	}, (response) => {
		console.log("失敗");
	});
}