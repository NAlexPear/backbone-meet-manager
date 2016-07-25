// Libraries and Modules
import Backbone from "backbone";
import _ from "underscore";

// Internal Components
import template from "text!template/components/login.html";

var LoginView = Backbone.View.extend( {
    "className": "login crate",
    "template": _.template( template ),
    "initialize": function initialize(){
        this.render();
    },
    "render": function render(){
        this.$el.html( this.template( {
            "prompt": "Login",
            "alternative": "Sign Up"
        } ) );

        return this;
    }
} );

export default LoginView;
