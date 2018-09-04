import DefineMap from "can-define/map/";
import DefineList from "can-define/list/";
import realtimeRestModel from "can-realtime-rest-model";

const Message = DefineMap.extend("Message", {
	id: "number",
	name: "string",
	body: "string",
	created_at: "date"
});

Message.List = DefineList.extend("MessageList", {
	"#": Message
});

Message.connection = realtimeRestModel({
	url: {
		resource: "https://chat.donejs.com/api/messages",
		contentType: "application/x-www-form-urlencoded"
	},
	Map: Message,
	List: Message.List,
});

export default Message;
