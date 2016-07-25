// Libraries and Modules
import Backbone from "backbone";
import _ from "underscore";

// Backbone Components
import UserCounterView from "../components/user-counter";

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
            "content": "Welcome to your future landing page!"
        } ) );

        this.addUserCounter();

        return this;
    },
    "addUserCounter": function addUserCounter(){
        var userCounter = new UserCounterView();

        this.$el.append( userCounter.$el );
    }
} );

export default LandingPageView;
