import React from "react";
import ReactDOM from "react-dom";
import route from "can-route";
import DefineMap from "can-define/map/";
import Messages from "./components/messages";
import { connect, ObserveObject } from "ylem";

class Store extends ObserveObject { 

}

const Chat = () => {
	return(
			<div className="container">
				<div className="row">
					<div className="col-sm-8 col-sm-offset-2">
						{ route.data.page === "home" ? (
							<div>
								<h1
									className="page-header text-center"
								>Chat Home</h1>
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

const App = connect(Store)(Chat);
export default App;

route.data = Store;
route.register( "{page}", { page: "home" } );
route.start();

var div = document.createElement('div');
document.body.appendChild(div);

ReactDOM.render(<App />, div);
