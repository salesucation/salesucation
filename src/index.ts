import { Hono } from "hono";
import Bucket from "./Bucket";

const app = new Hono()

const proxy = async (_:any) =>{
  return new Response("Object Not Found, so proxying", { status: 404 });
}

app.get('*', async (c) => {
  const sHost:string = c.req.header('Host')!.replace(/:[0-9]*$/, "");
  const oBucket = new Bucket(c.env);
  const sPath = c.req.path.endsWith("/")? "index.html": c.req.path;
  const object = await oBucket.get(`${sHost}/${sPath}`);

  if (object === null) {
    return proxy(c);
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);

  return new Response(object.body, {
    headers,
  });
});

app.put("/", async (c)=>{
  const body = await c.req.arrayBuffer();
  const sHost:string = c.req.header('Host')!.replace(/:[0-9]*$/, "");
  const oBucket = new Bucket(c.env);
  await oBucket.putZip(sHost, body);
  return new Response("ok");
});

app.all("*", async (c) =>{
  return proxy(c);
});

export default app