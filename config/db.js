var db = {};
db.uri = 'mongodb://caroso1222:Motovalle121@ds061777.mlab.com:61777/lemondb';
db.options = { 
	server: { 
		socketOptions: { 
			keepAlive: 3000, 
			connectTimeoutMS: 3000 
		} 
	}, 
    replset: { 
    	socketOptions: { 
    		keepAlive: 3000, 
    		connectTimeoutMS : 3000 
    	} 
    } 
};

module.exports = db;