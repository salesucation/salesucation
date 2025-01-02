import { serve, ServerType } from "@hono/node-server"
import app from './index';
import fs from "node:fs";
import Bucket from "./Bucket"

const aZipFile = fs.promises.readFile("test/data/test.zip");
const oBucket = new Bucket({});
await oBucket.putZip("localhost", aZipFile);


declare global {
    var server: ServerType;
}

if(globalThis.server){
    await globalThis.server.close();
}

globalThis.server = serve({ ...app, port: 4000 }, info => {
    console.log(`Listening on http://localhost:${info.port}`);
  });