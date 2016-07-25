// Libraries and Modules
import $ from "jquery";

// Internal Components
import LandingPageView from "views/home/index";

var routes = {
    "/": LandingPageView
};

var App = function App(){
    this.load = function loadRoute( route ){
        var Page = routes[ route ];
        var pageView = new Page();

        $( "#container" ).html( pageView.$el );
    };
    this.start = function startApplication(){
        this.load( "/" );
    };
};

export default App;
