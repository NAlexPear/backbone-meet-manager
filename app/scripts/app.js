// Libraries and Modules
import $ from "jquery";
import Backbone from "backbone";

// Internal Components
import LoginPageView from "views/home/index";
import DashboardPageView from "views/home/dashboard";

var Workspace = Backbone.Router.extend( {
    "routes": {
        "dashboard/:userId": "dashboard"
    },

    "dashboard": function viewDashboard( userId ){
        var dashboard = new DashboardPageView( userId );

        $( "#container" ).html( dashboard.$el );
    }
} );


var App = function App(){
    this.load = function loadInitialPage(){
        var pageView = new LoginPageView();

        $( "#container" ).html( pageView.$el );
    };
    this.start = function startApplication(){
        this.load();
        Backbone.history.start( { "pushState": true } );
    };
};

window.router = new Workspace();

export default App;
