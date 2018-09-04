import React from "react";
import route from "can-route";
import Message from "../models/message";
import { connect, ObserveObject } from "ylem";
import { getAsync } from 'ylem/property-decorators';



class Store extends ObserveObject {
	@getAsync
	get messages() {
		return Message.getList({});
	}
	messageInfo = {
		name: "",
		body: ""
	}

	send = e => {
		e && e.preventDefault();
		new Message({
			name: this.messageInfo.name,
			body: this.messageInfo.body
		}).save().then(() => {
			this.messageInfo.body = "";
		});
	}
}

const Messages = ({messages, messageInfo, send}) => {
		console.log(messages)
		return (
			<div>
				<h1 className="page-header text-center">Chat Messages</h1>
				<h5><a href={route.url({ page: "home" })}>Home</a></h5>

				{ messages ? (
					messages.length > 0 ? (
						messages.map(({ name, body }, key) => (
							<div className="list-group-item" key={key}>
								<h4 className="list-group3--item-heading">{name}</h4>
								<p className="list-group-item-text">{body}</p>
							</div>
						))
					) : (
						<div className="list-group-item">
							<h4 className="list-group-item-heading">No messages</h4>
						</div>
					)
				) : null }

				<form className="row" onSubmit={send}>
					<div className="col-sm-3">
						<input
							type="text"
							className="form-control"
							placeholder="Your name"
							value={messageInfo.name}
							onChange={ (e) => messageInfo.name = e.target.value }
						/>
					</div>
					<div className="col-sm-6">
						<input
							type="text"
							className="form-control"
							placeholder="Your message"
							value={messageInfo.body}
							onChange={ (e) => messageInfo.body = e.target.value }
						/>
					</div>
					<div className="col-sm-3">
						<input type="submit" className="btn btn-primary btn-block" value="Send" />
					</div>
				</form>
			</div>
		);
}

export default connect(Store)(Messages);
