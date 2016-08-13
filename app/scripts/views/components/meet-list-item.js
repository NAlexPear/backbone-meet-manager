// Libraries and Modules
import Epoxy from "epoxy";
import _ from "underscore";

// Internal Components
import template from "text!template/components/meet-list-item.html";

var MeetListItemView = Epoxy.View.extend( {
    "tagName": "tr",
    "template": _.template( template ),
    "bindings": {
        "button.delete": "toggle:not(isEditing)",
        "button.edit": "toggle:not(isEditing)",
        "button.save": "toggle:isEditing",
        "button.cancel": "toggle:isEditing",
        "input.new-date": "toggle:isEditing, attr:{value:parsedDate}",
        "span.current-date": "toggle:not(isEditing),text:parsedDate",
        "td.name": "attr:{contenteditable:isEditing},text:name"
    },
    "computeds": {
        "parsedDate": {
            "deps": [ "date" ],
            "get": function parseDate( date ){
                return date.split( "T" )[0];
            }
        }
    },
    "events": {
        "click button.delete": function deleteMeet( event ){
            event.preventDefault();

            this.model.trigger( "remove:meet", {
                "view": this,
                "model": this.model
            } );
        },
        "click button.edit": function editMeet( event ){
            event.preventDefault();

            this.model.trigger( "editing:meet", {
                "view": this
            } );

            this.$el.children( "td.name" ).focus();

            this.toggleEditing();
        },
        "click button.cancel": function cancelEditMeet( event ){
            event.preventDefault();

            this.model.trigger( "revert:meet", {
                "view": this
            } );

            this.toggleEditing();
        },
        "click button.save": function saveMeet( event ){
            var date = this.$el.find( "input.new-date" ).val();

            var data = {
                "name": this.getNewMeetName(),
                "date": date,
                "adminId": this.getAdminId()
            };

            event.preventDefault();

            this.model.trigger( "save:meet", {
                "view": this,
                "newData": data
            } );
        }
    },
    "initialize": function initialize( data ){
        this.viewModel = new Epoxy.Model( {
            "isEditing": false
        } );

        this.model = data.model;

        this.listenTo(
            this.model,
            "save:meet",
            ( eventData ) => {
                this.model.set( "date", eventData.newData.date );
                this.toggleEditing();
            }
        );

        this.render();
    },
    "render": function render(){
        this.$el.html( this.template() );

        return this;
    },
    "appendToTargetList": function appendToTargetList( $tbody ){
        $tbody.append( this.$el );
    },
    "toggleEditing": function toggleEditingState(){
        var editingState = this.viewModel.get( "isEditing" );

        this.viewModel.set( "isEditing", !editingState );
    },
    "disable": function disableListItem(){
        var $buttons = this.$el.find( "button.edit, button.delete" );

        $buttons.attr( "disabled", true );
        this.$el.addClass( "disabled" );
    },
    "enable": function enableListItem(){
        var $buttons = this.$el.find( "button.edit, button.delete" );

        $buttons.attr( "disabled", false );
        this.$el.removeClass( "disabled" );
    },
    "getNewMeetName": function getNewMeetName(){
        return this.$el
                    .children( "td.name" )
                    .text()
                    .replace( /[\r]+/g, "" )
                    .trim();
    },
    "getAdminId": function getAdminId(){
        return window.location.pathname.split( "/" ).pop();
    }
} );

export default MeetListItemView;
