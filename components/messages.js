import React from "react";
import route from "can-route";
import DefineMap from "can-define/map/";
import Component from "react-view-model/component";
import PromiseViewModel from "react-view-model/helpers/promise";
import Message from "../models/message";

export const ViewModel = DefineMap.extend('MessagesVM', {
	messagesPromise: {
		Type: PromiseViewModel,
		value: () => Message.getList({}),
	},
	name: {
		type: "string",
		value: ""
	},
	body: {
		type: "string",
		value: ""
	}
});

export default class Messages extends Component {
	send(e) {
		e && e.preventDefault();

		new Message({
			name: this.viewModel.name,
			body: this.viewModel.body
		}).save().then(() => {
			this.viewModel.body = "";
		});
	}

	render() {
		return (
			<div>
				<h1 className="page-header text-center">Chat Messages</h1>
				<h5><a href={route.url({ page: "home" })}>Home</a></h5>

				{ this.viewModel.messagesPromise.isPending ? (
					<div className="list-group-item list-group-item-info">
						<h4 className="list-group-item-heading">Loading...</h4>
					</div>
				) : null }

				{ this.viewModel.messagesPromise.isRejected ? (
					<div className="list-group-item list-group-item-danger">
						<h4 className="list-group3--item-heading">Error</h4>
						<p className="list-group-item-text">{this.viewModel.messagesPromise.reason}</p>
					</div>
				) : null }

				{ this.viewModel.messagesPromise.isResolved ? (
					this.viewModel.messagesPromise.value ? (
						this.viewModel.messagesPromise.value.map(({ name, body }, key) => (
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

				<form className="row" onSubmit={ (e) => this.send(e) }>
					<div className="col-sm-3">
						<input
							type="text"
							className="form-control"
							placeholder="Your name"
							value={this.viewModel.name}
							onChange={ (e) => this.viewModel.name = e.target.value }
						/>
					</div>
					<div className="col-sm-6">
						<input
							type="text"
							className="form-control"
							placeholder="Your message"
							value={this.viewModel.body}
							onChange={ (e) => this.viewModel.body = e.target.value }
						/>
					</div>
					<div className="col-sm-3">
						<input type="submit" className="btn btn-primary btn-block" value="Send" />
					</div>
				</form>
			</div>
		);
	}
}

Messages.ViewModel = ViewModel;
