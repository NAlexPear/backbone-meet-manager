// Libraries and Modules
import Backbone from "backbone";
import _ from "underscore";

// Backbone Components
import MeetCollection from "../../collections/meets";
import MeetListItemView from "./meet-list-item";
import MeetAdderView from "./meet-adder";

// Internal Components
import template from "text!template/components/meet-counter.html";

var MeetCounterView = Backbone.View.extend( {
    "className": "meet-counter",
    "template": _.template( template ),
    "events": {},
    "initialize": function initialize(){
        this.collection = new MeetCollection();
        this.adder = new MeetAdderView( {
            "collection": this.collection
        } );

        this.listenTo(
            this.collection,
            "remove:meet",
            function handleRemoveMeetEvent( data ){
                data.view.remove();
                data.model.destroy( {
                    "wait": true
                } );
            }
        );

        this.listenTo(
            this.collection,
            "list:meet",
            ( data ) => this.listMeet( data.model )
        );

        this.render();
    },
    "render": function render(){
        this.$el.html( this.template() );

        this.listAllMeets();
        this.adder.addtoTarget( this.$el );

        return this;
    },
    "listAllMeets": function listMeets(){
        this.collection.fetch( {
            "success": function handleCollection( collection ){
                _( collection.models ).each(
                    ( meet ) => meet.trigger( "list:meet", {
                        "model": meet
                    } )
                );
            }
        } );
    },
    "listMeet": function listMeetByModel( model ){
        var listItem = new MeetListItemView( {
            "model": model
        } );

        listItem.appendToTargetList(
            this.$el.find( "tbody.meet-list" )
        );
    }
} );

export default MeetCounterView;
