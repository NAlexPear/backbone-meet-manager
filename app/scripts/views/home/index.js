// Libraries and Modules
import Backbone from "backbone";
import _ from "underscore";

// Backbone Components
import LoginView from "../components/login";
import UserCounterView from "../components/user-counter";
import MeetCounterView from "../components/meet-counter";

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
            "heading": "Meet Manager",
            "content": "Welcome to Meet Manager"
        } ) );

        this.addLogin();

        return this;
    },
    "addLogin": function addLoginPrompt(){
        var loginPrompt = new LoginView();

        this.listenTo(
            loginPrompt.collection,
            "remove:login",
            this.addMeetCounter
        );

        this.$el.append( loginPrompt.$el );
    },
    "addUserCounter": function addUserCounter(){
        var userCounter = new UserCounterView();

        this.$el.append( userCounter.$el );
    },
    "addMeetCounter": function addMeetCounter(){
        var meetCounter = new MeetCounterView();

        this.$el.append( meetCounter.$el );
    }
} );

export default LandingPageView;
