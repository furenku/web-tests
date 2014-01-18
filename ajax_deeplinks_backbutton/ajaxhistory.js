var contenidos = ["contenido inicial","contenido uno", "contenido dos", "contenido tres"];

var contenedor = $('#contenedor');

var cargar_contenido = function(){
    var State = History.getState(); // Note: We are using History.getState() instead of event.state
    History.log('statechange:', State.data, State.title, State.url);
    
    var index = State.data.index;
    if(!index) index = queryStringToJSON(State.url).state;
    if(!index) index = 0;
    
    var contenido = contenidos[index];
    contenedor.html( contenido );
};


// Initialize history plugin.
(function(window,undefined){
    // Check Location
    if ( document.location.protocol === 'file:' ) {
	alert('The HTML5 History API (and thus History.js) do not work on files, please upload it to a server.');
    }
    
    // Establish Variables
    var State = History.getState(); // Note: We are using History.getState() instead of event.state
    cargar_contenido();
    
    
    // Log Initial State
    History.log('initial:', State.data, State.title, State.url);
    
    // Bind to State Change
    History.Adapter.bind(window,'statechange',cargar_contenido);
    
})(window);



jQuery(document).ready(function($){
    
    var cargando = $('#imagen_cargando');

    $('#links li').click(function(e){
	contenedor.html( cargando.clone().show() );
    	var index = $(this).index();
	History.pushState({state:index,index:index+1}, index, "?state="+index);
	e.preventDefault();
	return false;
    });
    
    
});


function queryStringToJSON(string) {            
    var qs = string.split('?');
    if(qs.length<=1) {
	return false;
    }
    else {
	var pairs = qs[1].split('&');
	var result = {};
	pairs.forEach(function(pair) {
	    pair = pair.split('=');
	    result[pair[0]] = decodeURIComponent(pair[1] || '');
	});
	
	return JSON.parse(JSON.stringify(result));
    }
}
