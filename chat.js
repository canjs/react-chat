import React from "react";
import ReactDOM from "react-dom";
import route from "can-route";
import DefineMap from "can-define/map/";
import reactViewModel from "react-view-model";
import Messages from "./components/messages";

const AppVM = DefineMap.extend({
	page: "string",
	message: {
		type: "string",
		value: "Chat Home",
		serialize: false
	},
	addExcitement: function() {
		this.message = this.message + "!";
	}
});

const App = reactViewModel(AppVM, (props) => (
	<div className="container">
		<div className="row">
			<div className="col-sm-8 col-sm-offset-2">
				{ props.page === "home" ? (
					<div>
						<h1
							className="page-header text-center"
							onClick={ () => props.addExcitement() }
						>{props.message}</h1>
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
));

var div = document.createElement('div');
document.body.appendChild(div);

ReactDOM.render(<App ref={register} />, div);

function register(app) {
	route.data = app.viewModel;
	route("{page}", { page: "home" });
	route.ready();
}
