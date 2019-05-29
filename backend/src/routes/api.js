const sprayheadController = require('../controllers/sprayheadController.js');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.send("It works!");
})

router.get('/sprayheads/', sprayheadController.getSprayheads);
router.get('/sprayheads/:id', sprayheadController.getById);
router.get('/sprayheads/lat/:lat', sprayheadController.getByLat);
router.post('/sprayheads/', sprayheadController.add);

module.exports = router;
// const routes = [
//     {
//         method: 'GET',
//         url:'/api/sprayheads',
//         handler: sprayheadController.getSprayheads
//     }, 
//     {
//         method: 'GET',
//         url:'/api/sprayheads/:id',
//         handler: sprayheadController.getById
//     },
//     {
//         method: 'POST',
//         url: '/api/sprayheads',
//         handler: sprayheadController.add
//     }
// ];

// module.exports = routes;