import {Socket, Presence} from "phoenix"
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
let socket = new Socket("/socket", {params: {token: window.userToken}})


socket.connect()

// Now that you are connected, you can join channels with a topic:
let channel = socket.channel("room", {});
let message = $('#message-input');
let nickName = 'Nickname';
let chatMessages = document.getElementById('chat-messages');

let presences = {};
let onlineUsers = document.getElementById('online-users');

let listUsers = user => {
	return {
		user:user
	};
};

let renderUsers = presences => {
  onlineUsers.innerHTML = Presence.list(presences, listUsers)
  .map(presence => `
    <li>${presence.user}</li>`).join("")
}

message.focus();

message.on('keypress', event => {
	
	if (event.keyCode == 13) {
		//enter key
		channel.push('message:new', {
			message: message.val(),
			user: nickName
		});
		message.val('');
	}
});

channel.on('message:new', payload => {
	console.log('received new message');
	console.log(payload);
	let template = document.createElement('div');
	template.innerHTML = `<b>${payload.user}</b>:
							${payload.message}<br>`;
	chatMessages.appendChild(template);
	//it isn't really a template..
	chatMessages.scrollTop = chatMessages.scrollHeight;
});

channel.on('presence_state', state => {
	console.log('presence_state');
	presences = Presence.syncState(presences, state);
	renderUsers(presences);
	//@TODO refactor me
});

channel.on('presence_diff', diff => {
	console.log('presence_diff');
	presences = Presence.syncDiff(presences, diff);
	renderUsers(presences);
	//console.log(presences);
});
channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })

export default socket
