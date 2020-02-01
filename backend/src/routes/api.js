const sprayheadController = require('../controllers/sprayheadController.js');
const commandController = require('../controllers/commandController.js');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.send("It works!");
})

// For devices
router.get('/sprayheads/', sprayheadController.getSprayheads);
router.get('/sprayheads/:id', sprayheadController.getByNodeID);
router.get('/sprayheads/lat/:lat', sprayheadController.getByLat);
router.post('/sprayheads/', sprayheadController.add);

// For commands
router.get('/commands/', commandController.getCommands);
router.post('/commands/', commandController.add);

// Export 
module.exports = router;
