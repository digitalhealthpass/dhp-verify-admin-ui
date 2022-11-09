/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const noCache = require('nocache');
const compression = require('compression');

exports.initializeServer = (router) => {
	const app = express();
	const isProduction = process.env.NODE_ENV !== 'development';
	const corsConfig = isProduction ? { origin: false } : { origin: 'http://localhost:3000', credentials: true };
	app.set('trust proxy', 1);
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.use(cookieParser());

	app.use(cors(corsConfig));
	app.use(noCache());
	app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
	app.use(
		helmet.contentSecurityPolicy({
			directives: {
				defaultSrc: ["'self'"],
				imgSrc: ["'self'", 'data:'],
				styleSrc: ["'self'", "'unsafe-inline'"],
				objectSrc: ["'none'"],
				fontSrc: [
					"'self'",
					'https://fonts.gstatic.com/s/ibmplexmono/',
					'https://fonts.gstatic.com/s/ibmplexsans/',
					'https://fonts.gstatic.com/s/ibmplexsanscondensed/',
				],
				workerSrc: ["'self'", 'blob:'],
			},
		})
	);
	app.use(helmet.frameguard({ action: 'sameorigin' }));
	app.use(helmet.hsts());
	app.use(helmet.noSniff());
	app.use(helmet.xssFilter());
	app.use(compression());

	// Set up express router to serve all api routes
	app.get("/health", (req, res) => res.send({ message: "OK" }));

	// TODO: we should select one of these two statements depending local vs. cloud deployment
	app.use('/api', router);	// used when cloud deployed
	app.use('/verifier-admin/api', router);  // used in development node

	// Serve all static files from the ../client folder  - this is not used during development
	app.use(express.static(path.join(__dirname, '../client')));

	app.use((req, res) => {
		res.redirect('/verifier-admin/index.html');
	});

	return app;
};
