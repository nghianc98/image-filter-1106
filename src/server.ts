// import express from 'express';
const express = require('express');
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

    // Init the Express application
    const app = express();

    // Set the network port
    const port = process.env.PORT || 8082;

    // Use the body parser middleware for post requests
    app.use(bodyParser.json());

    app.get("/filteredimage", async (req: any, res:any) => {
        let image_url = req.query.image_url.toString();
        if (!image_url) {
            res.status(400).send("image_url is required")
        }
        let filterdpath = await filterImageFromURL(image_url);
        res.status(200).sendfile(filterdpath, () => {
            deleteLocalFiles([filterdpath]);
        })
    });


    app.get("/", async (req:any, res:any) => {
        res.send("try GET /filteredimage?image_url={{}}")
    });


    // Start the Server
    app.listen(port, () => {
        console.log(`server running http://localhost:${port}`);
        console.log(`press CTRL+C to stop server`);
    });
})();