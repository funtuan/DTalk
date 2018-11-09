function getCookie(cname)
{
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) 
  {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
}

if(!("userid" in Cookies.get())){
	Cookies.set("userid" , Math.random().toString(36).substring(2));
}

var app = new Vue({
	el: '#app',
	data: {
		setting: false,
		online: 0,
		mispage: true,
		errorMessage: "",
		errorView: false,
		mispageMessage: "該怎麼稱呼呢？",
		myname: "",
		sexSelectView: false,
		name: "No",
		icon: "",
		userid: "",
		useridsha: "",
		roomid: "",
		message: "",
		chatLastUser: "",
		chatLastTime: new Date().getTime().toString(),
		setNameView: false,
		chatJson: [{
			type: "status",
			className: "PostAuthorStatus",
			content: "貼心小提示：左下角那個會動的東西是功能鍵喔！！",
			time: new Date()
		}
		]
	},
	methods:{
		startCheck: function(){//讀取cookie 初始化
			
			const startmessage = [
			"貼心小提示：左下角那個會動的東西是功能鍵喔！！",
			"貼心小提示：輸入#加數字就能開小房間喔（範例:#123456)"
			];
			this.chatJson[0].content = startmessage[Math.floor(startmessage.length * Math.random())];
			
			if("name" in Cookies.get()){
				if(stringBytes(Cookies.get("name")) >= 3 && stringBytes(Cookies.get("name")) <= 20 ){
					this.roomid = location.hash.substr(1,location.hash.length-1);
					this.name = Cookies.get("name");
					this.icon = Cookies.get("icon");
					this.userid = Cookies.get("userid");
					this.useridsha = sha1(this.userid);
				}else{
					
				}
			}else{
				
			}
			
			function searchChat(){
				roomChatUpdate(0,function(){
					setTimeout(searchChat,1000);
				});
			}
			searchChat();
			
		},
		sellChat: function(){//發送訊息
			if(stringBytes(this.message) > 0 && stringBytes(this.message) < 150){
				sellMessage(0,this.message);
				this.message = "";
				//console.log("訊息發送");
			}else{
				if(stringBytes(this.message) > 0)this.errorShow("訊息長度需在150個字元以內");
			}
		},
		errorShow: function(Message){
			this.errorMessage = Message;
			this.errorView = true;
			setTimeout(function(){app.errorView = false;},2000);
		},
		nameEnter: function(){
			if(stringBytes(this.myname) >= 3 && stringBytes(this.myname) <= 20 ){
				Cookies.set("name" , this.myname);
				this.mispageMessage = "性別？";
				this.sexSelectView = true;
			}else{
				this.errorShow("暱稱長度需介於3～20個字元");
			}
		},
		sexSelectSet: function(sex){
			//console.log(sex);
			Cookies.set("icon" , sex);
			app.startCheck();
			this.mispage = false;
		},
		setbutton: function(){
			this.setting = !this.setting;
		},
		resetuser: function(){
			Cookies.remove('name');
			Cookies.remove('icon');
			window.location.reload();
		},
		openurl: function(){
			window.open('https://funtuan.github.io/DTalk/chatroom.html#' + this.roomid);
		}
	},
	watch: {
	   chatJson() {
		 //console.log("chatlog change");
		 this.$nextTick(() => {
		   var container = this.$el.querySelector("#chatContainer");
		   //console.log(container);
			document.body.scrollTop = 100000;
		 })
		 //  document.getElementById('chatContainer').scrollTop = document.getElementById('chatContainer').scrollHeight+150;

	   }
	 }
})

if("name" in Cookies.get() && "icon" in Cookies.get()){
	app.startCheck();
	app.mispage = false;
}
	


function stringBytes(c){
  var n=c.length,s;
  var len=0;
  for(var i=0; i <n;i++){
   s=c.charCodeAt(i);
   while( s > 0 ){
	  len++;
	  s = s >> 8;
   }
  }
  return len;
}