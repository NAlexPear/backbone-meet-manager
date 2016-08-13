// Libraries and Modules
import Backbone from "backbone";
import _ from "underscore";

// Backbone Components
import MeetCounterView from "../components/meet-counter";

// Internal Components
import template from "text!template/default.html";

var LandingPageView = Backbone.View.extend( {
    "className": "content",
    "template": _.template( template ),
    "initialize": function initialize( userId ){
        this.user = userId;

        this.render();
    },
    "render": function render(){
        this.$el.html( this.template( {
            "heading": "Meet Manager",
            "content": "Welcome to Meet Manager"
        } ) );

        this.addMeetCounter();

        return this;
    },
    "addMeetCounter": function addMeetCounter(){
        var meetCounter = new MeetCounterView( this.user );

        this.$el.append( meetCounter.$el );
    }
} );

export default LandingPageView;
