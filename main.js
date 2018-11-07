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
		name: "No",
		icon: "",
		userid: "",
		roomid: "",
		message: "",
		chatLastUser: "",
		chatLastTime: new Date().getTime().toString(),
		setNameView: false,
		chatJson: [{
			type: "status",
			className: "PostAuthorStatus",
			content: "打開 DTalk 奇遇之旅",
			time: new Date()
		}
		]
	},
	methods:{
		startCheck: function(){//讀取cookie 初始化
			if("name" in Cookies.get()){
				if(stringBytes(Cookies.get("name")) >= 3 && stringBytes(Cookies.get("name")) <= 20 ){
					this.roomid = location.hash.substr(1,location.hash.length-1);
					this.name = Cookies.get("name");
					this.icon = Cookies.get("icon");
					this.userid = Cookies.get("userid");
				}else{
					
				}
			}else{
				
			}
			
		},
		sellChat: function(){//發送訊息
			if(stringBytes(this.message) > 0 && stringBytes(this.message) < 150){
				sellMessage(0,this.message);
				this.message = "";
				console.log("訊息發送");
			}
		}
	}
})

setTimeout(function(){
	Cookies.set("name" , "KP team根本沒關係");
	Cookies.set("icon" , "female");
	app.startCheck();
	function searchChat(){
		roomChatUpdate(0,function(){
			setTimeout(searchChat,1000);
		});
	}
	searchChat();
},1000);



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