# About

Node CMS is a combined HTTP / Socket server CMS. It uses Node.js, Express, Socket.io, Mongo, Twig, and a handful of other Node modules. The idea is to create a single page CMS application that allows for events to be captured from the CMS user and the site user. This way, both the client and CMS client can be alerted to events happening between them.

I have built in an http server to serve the routes for the CMS pages. This allows for main pages to be accessible without first hitting the single page index. Once inside the app a socket connection takes over and page requests are handled via Socket.io and JSON page objects.

Ideally this should be separated into three server environments when moving to production.

	1) Main Site HTTP
	2) Socket.io
	3) CMS HTTP
	**4) Mongo

** I am using Mongo, but the data can come from anywhere

The Main site client and the CMS client would then connect to the same socket server to allow event communication between them.

The file nodeCms.appData.json contains the only mongo collection document that this application currently uses.

### Docs

TODO