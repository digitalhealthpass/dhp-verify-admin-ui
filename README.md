## Readme

# Verifer Administration User Interface

[↳ Introduction](#introduction)

[↳ Installation](#installation)

[↳ General Environment Variables](#general-environment-variables)

[↳ Authorization and Authentication](#authorization-and-authentication)

[↳ Library Licenses](#library-licenses)

## Introduction
This web user interface for use by Digital Health Pass administrators.  This interface provides the following key functions for administrators:
- System Administrator can create and delete Customers and Customer Administrators  
- Customer Administrators can create and delete Organizations and Organization Administartors
- Customer Administatrators can create, modify and manage validation Rules
- Customer and Organization Administrators can create or revoke Verifier Credentials (used byt the Verifer mobile app)

[↑ Top](#readme)

## Installation

The runtime toplogy is different when running on a local development environment vs a production deployment. To get started in either mode:

#### `npm install`

This will install all 3rd party dependencies in the root folder as well as in the `/client` and `/server` folders.

### Local Development

In _local development_ mode, the start script runs **two** processes:

- create-react-app starts the React UI Client on port `3000`.
- Server (node express server) is started on port `5000`.

#### `npm run dev`

This will start both the UI client and Server in `development` mode.

#### Local Development Configuration

In _local development_ mode, both the UI Client and the Server are run on localhost. The UI Client communicates with the Server and the Server communicates with the APIs (running remotely). The port configurations for the UI Client and Server can be found in `/client/.env` and `/server/.env` respectively.

UI Client (3000) --> Server (5000) --> API (see below)

You can must either configure `API_HOST` and `API_PORT` in `/server/.env` to point to your remote API endpoint or you must implement your own mock server for local testing and development.

### Production

In _production_ mode, we run **one process** inside the Docker container, the Server process. The Server process services requests for _both_ static web assets (webpacked react app) and backend requests to services - requests to `/api/*` are proxied to actual backend service(s) by the Server process. `node ./server/index.js` is run by the Docker container to start the Server process. The path to the backend services is provided by Helm Chart files.

#### `npm run build`

This will output the built client code into `dist/client` and copy the server code into `dist/server` it will also copy the `/charts` folder into `dist/charts`. This step is typically performed prior to running a `docker build`

[↑ Top](#readme)
## General Environment Variables

The following environment variables must be set before starting the application regardless of the executing environment.

| Environment Variable | Value                                                                                          |
| -------------------- | ---------------------------------------------------------------------------------------------- |
| PORT                 | Port used by Express Server (default: 5000)                                                    |
| USE_HTTPS            | true or false.  If true, then endpoints must be accessed via https, otherwise http             |
| NODE_ENV             | 'development' or 'production'                                                                  |                                                                                   |
| VERIFIER_API_URL     | The url of the DHP Verifier API                                                                |
| CONFIG_API_URL       | The url of the DHP Verifier Configuration API                                                  |
| METERING_API_URL     | The url of the DHP Metering API                                                                |

[↑ Top](#readme)

## Authorization and Authentication

This user interface provides a login function which authenticates and authorizes a user via the Verifier API endpoint.  There are 3 defined roles with associated scopes as follows:
- System Administrator
- Customer Administrator
- Organization Administrator


| Scopes                  | Purpose                                                                 |
| ----------------------- | ----------------------------------------------------------------------- |
| sysadmin                | Access for administring customers, organization, rules and credentials  |
| custadmin               | Access for administring organizations and credentials                   |
| orgadmin                | Access for administoring credentials                                    |

[↑ Top](#readme)

## Library Licenses

This section lists open source libraries used in this SDK. 

**Table 3: Libraries and sources for this SDK** 

| Library                   | Source                                                                |
| ------------------------- | --------------------------------------------------------------------- |
| `cross-env`               | MIT License (https://www.npmjs.com/package/cross-env)                 |
| `axios`             	    | MIT License (https://www.npmjs.com/package/axios)                     |
| `compression`             | MIT License (https://www.npmjs.com/package/compression)               |
| `cookie-parser`           | MIT License (https://www.npmjs.com/package/cookie-parser)             |
| `cors`             	    | MIT License (https://www.npmjs.com/package/cors)                      |
| `dotenv`             	    | BSD-2-Clause License (https://www.npmjs.com/package/dotenv)           |
| `dotenv-expand`           | BSD-2-Clause License (https://www.npmjs.com/package/dotenv-expand)    |
| `eslint`             	    | MIT License (https://www.npmjs.com/package/eslint)                    |
| `eslint-plugin-prettier`  | MIT License (https://www.npmjs.com/package/eslint-plugin-prettier)    |
| `express`                 | MIT License (https://www.npmjs.com/package/express)                   |
| `helmet`             	    | MIT License (https://www.npmjs.com/package/helmet)                    |
| `form-data`          	    | MIT License (https://www.npmjs.com/package/form-data)                 |
| `log4js`             	    | Apache-2.0 License (https://www.npmjs.com/package/log4js)             |
| `moment`             	    | MIT License (https://www.npmjs.com/package/moment)                    |
| `multer`             	    | MIT License (https://www.npmjs.com/package/multer)                    |
| `nocache`                 | MIT License (https://www.npmjs.com/package/nocache)                   |
| `nodemon`             	 | MIT License (https://www.npmjs.com/package/nodemon)                   |
| `rsync`             	    | MIT License (https://www.npmjs.com/package/rsync)                     |
| `@carbon/colors`							| Apache-2.0 License (https://www.npmjs.com/package/@carbon/colors)   |
| `@carbon/icons`							 	| Apache-2.0 License (https://www.npmjs.com/package/@carbon/icons)   |
| `@carbon/icons-react`						| Apache-2.0 License (https://www.npmjs.com/package/@carbon/icons-react)   |
| `@carbon/layout`							| Apache-2.0 License (https://www.npmjs.com/package/@carbon/layout)   |
| `@carbon/themes`							| Apache-2.0 License (https://www.npmjs.com/package/@carbon/themes)   |
| `@carbon/type`							 	| Apache-2.0 License (https://www.npmjs.com/package/@carbon/type)   |
| `@ibm/plex`							 		| OFL-1.1 License (https://www.npmjs.com/package/@ibm/plex)   |
| `@testing-library/jest-dom`				| MIT License (https://www.npmjs.com/package/@testing-library/jest-dom)   |
| `@testing-library/react`					| MIT License (https://www.npmjs.com/package/@testing-library/react)   |
| `@testing-library/user-event`			| MIT License (https://www.npmjs.com/package/@testing-library/user-event)   |
| `carbon-components`						| Apache-2.0 License (https://www.npmjs.com/package/carbon-components)   |
| `carbon-components-react`				| Apache-2.0 License (https://www.npmjs.com/package/carbon-components-react)   |
| `carbon-icons`							 	| Apache-2.0 License (https://www.npmjs.com/package/carbon-icons)   |
| `i18next`							 			| MIT License (https://www.npmjs.com/package/i18next)   |
| `i18next-browser-languagedetector`	| MIT License (https://www.npmjs.com/package/i18next-browser-languagedetector)   |
| `i18next-http-backend`					| MIT License (https://www.npmjs.com/package/i18next-http-backend)   |
| `node-sass`							 		| MIT License (https://www.npmjs.com/package/node-sass)   |
| `react`							 			| MIT License (https://www.npmjs.com/package/react)   |
| `react-dom`							 		| MIT License (https://www.npmjs.com/package/react-dom)   |
| `react-i18next`							 	| MIT License (https://www.npmjs.com/package/react-i18next)   |
| `react-router-dom`							| MIT License (https://www.npmjs.com/package/react-router-dom)   |
| `react-scripts`							 	| MIT License (https://www.npmjs.com/package/react-scripts)   |
| `styled-components`						| MIT License (https://www.npmjs.com/package/styled-components)   |
| `babel-eslint`							 	| MIT License (https://www.npmjs.com/package/babel-eslint)   |
| `eslint-config-airbnb`					| MIT License (https://www.npmjs.com/package/eslint-config-airbnb)   |
| `eslint-config-prettier`					| MIT License (https://www.npmjs.com/package/eslint-config-prettier)   |
| `eslint-plugin-import`					| MIT License (https://www.npmjs.com/package/eslint-plugin-import)   |
| `eslint-plugin-jsx-a11y`					| MIT License (https://www.npmjs.com/package/eslint-plugin-jsx-a11y)   |
| `eslint-plugin-prettier`					| MIT License (https://www.npmjs.com/package/eslint-plugin-prettier)   |
| `eslint-plugin-react`						| MIT License (https://www.npmjs.com/package/eslint-plugin-react)   |
| `eslint-plugin-react-hooks`				| MIT License (https://www.npmjs.com/package/eslint-plugin-prettier-hooks)   |
| `prettier`							 		| MIT License (https://www.npmjs.com/package/prettier)   |
| `uuid`							 				| MIT License (https://www.npmjs.com/package/uuid)   |
| `@sendgrid/mail`							| MIT License (https://www.npmjs.com/package/@sendgrid/mail)   |
| `njwt`							 				| Apache-2.0  License (https://www.npmjs.com/package/njwt)   |
| `@babel/preset-react`				 		| MIT License (https://www.npmjs.com/package/@babel/preset-react)   |
| `@carbon/charts`					 		| Apache-2.0  License (https://www.npmjs.com/package/@carbon/charts)   |
| `@carbon/charts-react`			 		| Apache-2.0  License (https://www.npmjs.com/package/@carbon/charts-react)   |
| `d3`							 				| ISC License (https://www.npmjs.com/package/3)   |
| `lodash` 							 			| MIT License (https://www.npmjs.com/package/lodash)   |
| `moment`							 			| MIT License (https://www.npmjs.com/package/moment)   |
| `object-hash`							 	| MIT License (https://www.npmjs.com/package/object-hash)   |
| `qrcode`							 			| MIT License (https://www.npmjs.com/package/qrcode)   |
| `react-checkbox-tree`				 		| MIT License (https://www.npmjs.com/package/react-checkbox-tree)   |
| `react-csv`							 		| MIT License (https://www.npmjs.com/package/react-csv)   |
| `react-icons`						 		| MIT License (https://www.npmjs.com/package/react-icons)   |
| `react-to-print`					 		| MIT License (https://www.npmjs.com/package/react-to-print)   |
| `semver`							 			| ISC License (https://www.npmjs.com/package/semver)   |


[↑ Top](#readme)
