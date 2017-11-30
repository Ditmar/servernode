var express = require('express');
var router = express.Router();
var multer = require("multer");
var upload = multer({dest: "./public/images"});
var db = require("mysql_orm");
var settings = {
    host : "0.0.0.0",
    user : "root",
    password : "simple",
    database : "android",
    port : "3306"
}
var query = db.mysql(settings);
/* GET home page. */
router.get('/', function(req, res, next) {
	query.get("users").execute(function(rows) {
		rows.images.all(function(r){
			res.send(rows);
		});
	});

});

router.post("/createuser", function(req, res) {
	var name = req.body.name;
	
	query.save("users", req.body, function(result){
		if(!result) {
			res.send({result:false});
			return;
		}
		res.send(result);
	});
});
router.post("/sendimage", upload.any(), function(request, response){
	var idus = request.body.idus;
	console.log(request);
	console.log("ID US  -> " + idus);
	var url = request.files[0].path.replace(/public/g,"http://localhost:3000");
	var obj = {
		url: url, 
		name: request.files[0].filename,
		idus: idus
	}
	query.save("images", obj, function(result){
		if(!result) {
			response.send({result:false});
			return;
		}
		response.send(request.files);	
	});
});
router.post("/sendcoords", function(req, res) {
	var cadena = req.body;
	console.log(cadena);
	var exp = /[{]{1,1}[0-9.,-]{1,}[}]{1,1}/g 
	var exp2 = /[0-9-.]{1,}/g
	var r = cadena.coor.match(exp);
	var coordenadas = new Array();
	for (var i = 0 ; i < r.length; i++) {
		var n = r[i].match(exp2);
		coordenadas.push({lat: n[0], lng: n[1]});
	}
	for(var i = 0; i < coordenadas.length; i++){
		query.save("coordenadas", coordenadas[i], function(r){
		});
	}
	
	res.send({result:true});
});
router.get("/getCoors", function(req, res) {
	query.get("coordenadas").execute(function(results) {
		res.send(results.result);
	})
});



module.exports = router;
