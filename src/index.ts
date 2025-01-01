import { Hono } from "hono";
import Bucket from "./Bucket";

const app = new Hono()

app.get('*', async (c) => {
  const sHost:string = c.req.header('Host')!;
  const oBucket = new Bucket(c.env);
  const sPath = c.req.path == "/"? "index.html": c.req.path;
  const object = await oBucket.get(`${sHost}/${sPath}`);

  if (object === null) {
    return new Response("Object Not Found, so proxying", { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);

  return new Response(object.body, {
    headers,
  });
})

export default app