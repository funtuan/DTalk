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
	
		chatJson: [{
			type: "status",
			className: "PostAuthorStatus",
			content: "中興大學183 加入聊天室",
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
			content: "我要講一大堆話我要講一大堆話我要講一大堆話我要講一大堆話我要講一大堆話我要講一大堆話我要講一大堆話我要講一大堆話我要講一大堆話我要講一大堆話我要講一大堆話我要講一大堆話",
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
		}
		]
	}
})