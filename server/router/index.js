/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

const express = require('express');

const checkAuth = require('../middleware/checkAuth');
const authHandler = require('../handlers/auth');
const custHandler = require('../handlers/customer');
const orgHandler = require('../handlers/organization');
const verHandler = require('../handlers/verifier');
const userHandler = require('../handlers/user');
const metricsHandler = require('../handlers/metrics');
const configHandler = require('../handlers/configuration');
const uploadHander = require('../handlers/upload');
const statusHander = require('../handlers/status');
const profileHandler = require('../handlers/profiles');

const router = express.Router();

// proxy to the auth APIs
router.post('/login', authHandler.login);
router.put('/login', authHandler.forgotPW);
router.get('/logout', authHandler.logout);
router.get('/user_attributes', authHandler.attributes);

// customer CRUD
router.get('/customer', checkAuth, custHandler.getCustomers)
router.delete('/customer/:custid', checkAuth, custHandler.deleteCustomer)
router.post('/customer', checkAuth, custHandler.addCustomer)

// organization CRUD
router.get('/customer/:custid/org', checkAuth, orgHandler.getOrganizations)
router.delete('/customer/:custid/org/:orgid', checkAuth, orgHandler.deleteOrganization)
router.post('/customer/:custid/org', checkAuth, orgHandler.addOrganization)

// verifier CRUD
router.get('/customer/:custid/org/:orgid/verifier', checkAuth, verHandler.getVerifiers)
router.get('/customer/:custid/org/:orgid/verifier/:verifierid/credential', checkAuth, verHandler.getVerifier)
router.delete('/customer/:custid/org/:orgid/verifier/:verifierid', checkAuth, verHandler.deleteVerifier)
router.post('/customer/:custid/org/:orgid/verifier', checkAuth, verHandler.addVerifier)

router.post('/user', checkAuth, userHandler.addUser)
router.delete('/user', checkAuth, userHandler.deleteUser)
router.get('/user', checkAuth, userHandler.listUsers)
router.put('/user', checkAuth, userHandler.resetPassword)

router.post('/metrics/verifier/query', metricsHandler.queryMeteringAPI)

// configuration endpoints (legacy and new)
router.get('/config', configHandler.getConfigs)
router.get('/config/:id/:version', configHandler.getConfig)
router.delete('/config/:id/:version', profileHandler.deleteConfigFromProfile, configHandler.deleteConfig)
router.post('/config', configHandler.createConfig)
router.post('/config/value-sets', configHandler.createValueSet)

// profile endpoints
// router.post('/profile/:id', profileHandler.createProfile)
// router.get('/profile/:id', profileHandler.getProfile)
router.patch('/profile/:id/addconfig', profileHandler.createProfile, profileHandler.addConfigToProfile)
// router.patch('/profile/:id/deleteconfig', profileHandler.deleteConfigFromProfile)
// router.delete('/profile/:id', profileHandler.deleteProfile)

// DES
const multer = require('multer');
const storage = multer.diskStorage({
	filename: function (req, file, cb) {
		cb(null, file.originalname)
	}
})
const upload = multer({ storage: storage })
router.post('/registration', checkAuth, upload.single('file'), uploadHander.registration);
router.post('/results', checkAuth, upload.single('file'), uploadHander.results);
router.get('/status/:org/:role', checkAuth, statusHander.status);

module.exports = router;