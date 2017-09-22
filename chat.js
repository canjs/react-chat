import React from "react";
import ReactDOM from "react-dom";
import route from "can-route";
import DefineMap from "can-define/map/";
import Component from "react-view-model/component";
import Messages from "./components/messages";

export const ViewModel = DefineMap.extend('AppVM', {
	page: "string",
	message: {
		type: "string",
		value: "Chat Home",
		serialize: false
	}
});

export default class App extends Component {
	addExcitement() {
		this.viewModel.message = this.viewModel.message + "!";
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-8 col-sm-offset-2">
						{ this.viewModel.page === "home" ? (
							<div>
								<h1
									className="page-header text-center"
									onClick={ () => this.addExcitement() }
								>{this.viewModel.message}</h1>
								<a
									href={route.url({ page: "chat" })}
									className="btn btn-primary btn-block btn-lg"
								>Start chat</a>
							</div>
						) : (
							<Messages />
						) }
					</div>
				</div>
			</div>
		);
	}
}

App.ViewModel = ViewModel;

var div = document.createElement('div');
document.body.appendChild(div);

ReactDOM.render(<App ref={register} />, div);

function register(app) {
	route.data = app.viewModel;
	route("{page}", { page: "home" });
	route.ready();
}
