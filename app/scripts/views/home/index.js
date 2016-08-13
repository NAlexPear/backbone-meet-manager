// Libraries and Modules
import Backbone from "backbone";
import _ from "underscore";

// Backbone Components
import LoginView from "../components/login";

// Internal Components
import template from "text!template/default.html";

var LandingPageView = Backbone.View.extend( {
    "className": "content",
    "template": _.template( template ),
    "initialize": function initialize(){
        this.render();
    },
    "render": function render(){
        this.$el.html( this.template( {
            "heading": "",
            "content": ""
        } ) );

        this.addLogin();

        return this;
    },
    "addLogin": function addLoginPrompt(){
        var loginPrompt = new LoginView();

        this.listenTo(
            loginPrompt.viewModel,
            "remove:login",
            ( userId ) => this.navigateToDashboard( userId )
        );

        this.$el.append( loginPrompt.$el );
    },
    "navigateToDashboard": function navigateToDashboard( userId ){
        window.router.navigate(
            `/dashboard/${userId}`,
            { "trigger": true }
        );
    }
} );

export default LandingPageView;
