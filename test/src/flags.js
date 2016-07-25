// Libraries
import _ from "underscore";

var flags = {};

export default function flagTests( testFunctionArray ){
    var testsToRun = _( testFunctionArray ).filter( ( test ) => {
        var isPresent = _( Object.keys( flags ) ).contains( test.name );
        var isTrue = flags[ test.name ];

        return isPresent && isTrue;
    } );

    return testsToRun;
}
