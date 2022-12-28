const authentication = require('../middlewares/Authentication');

module.exports.starts = async function (server, client) {
    var routes = require('./app/config/routes')
	for (var route in routes) {
	  if (route.split(' ').length > 1) {
		var method = route.split(' ')[0]
		var url = route.split(' ')[1]
	  } else {
		var method = 'get'
		var url = route
	  }
	  if (typeof routes[route] === 'string') {
		var controller = routes[route].split('.')[0]
		var action = routes[route].split('.')[1]
	  } else {
		var controller = routes[route].function.split('.')[0]
		var action = routes[route].function.split('.')[1]
	
		if (routes[route].protected) { 
		  server[method](url, authentication, require('./app/controllers/' + controller)[action])
		  continue
		}
	  }
	  // init route
	  server[method](url, require('./app/controllers/' + controller)[action])
	}
}