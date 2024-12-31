import { serve, ServerType } from "@hono/node-server"
import app from './index'

declare global {
    var server: ServerType;
}

if(globalThis.server){
    await globalThis.server.close();
}

globalThis.server = serve({ ...app, port: 4000 }, info => {
    console.log(`Listening on http://localhost:${info.port}`);
  });