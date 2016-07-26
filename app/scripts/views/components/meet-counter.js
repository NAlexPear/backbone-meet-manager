// Libraries and Modules
import Backbone from "backbone";
import _ from "underscore";
import $ from "jquery";

// Backbone Components
import MeetCollection from "../../collections/meets";
import MeetModel from "../../models/meet";
import MeetListItemView from "./meet-list-item";

// Internal Components
import template from "text!template/components/meet-counter.html";

var MeetCounterView = Backbone.View.extend( {
    "className": "meet-counter",
    "template": _.template( template ),
    "events": {
        "submit form.add-meet": function submitMeet( event ){
            var model = new MeetModel( {
                "name": $( ".name" ).val(),
                "date": $( ".date" ).val()
            } );

            event.preventDefault();

            this.collection.add( model );
            this.listMeet( model );
        }
    },
    "initialize": function initialize(){
        this.collection = new MeetCollection();

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

        model.save();

        listItem.appendToTargetList(
            this.$el.find( "tbody.meet-list" )
        );
    }
} );

export default MeetCounterView;
