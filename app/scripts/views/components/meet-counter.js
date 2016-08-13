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
    "initialize": function initialize( userId ){
        this.children = [];
        this.collection = new MeetCollection( { "id": userId } );
        this.adder = new MeetAdderView( {
            "collection": this.collection
        } );

        this.listenTo(
            this.collection,
            "remove:meet",
            function handleRemoveMeetEvent( data ){
                this.children = _( this.children ).without( data.view );
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

        this.listenTo(
            this.collection,
            "editing:meet",
            function handleEditingMeetEvent( data ){
                var otherMeets = _( this.children ).without( data.view );

                _( otherMeets ).each(
                    ( meet ) => meet.disable()
                );
            }
        );

        this.listenTo(
            this.collection,
            "revert:meet",
            function handleStopEditingMeetEvent( data ){
                var otherMeets = _( this.children ).without( data.view );

                _( otherMeets ).each(
                    ( meet ) => meet.enable()
                );
            }
        );

        this.listenTo(
            this.collection,
            "save:meet",
            function handleSaveMeetEvent( data ){
                data.view.model.save( data.newData, {
                    "success": function onModelSave(){
                        data.view.model.trigger( "revert:meet", {
                            "view": data.view
                        } );
                    }
                } );
            }
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

        this.children.push( listItem );

        listItem.appendToTargetList(
            this.$el.find( "tbody.meet-list" )
        );
    }
} );

export default MeetCounterView;
