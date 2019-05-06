const router = require('router');
router.use('sprayhead/', require('./sprayhead'));
router.use('test/', require('./test'));
module.exports = router;