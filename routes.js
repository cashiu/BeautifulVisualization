module.exports = function(app) {

    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('/verlet', function(req, res) {
        res.render('verlet');
    });

}