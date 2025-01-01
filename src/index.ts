import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  const sHost:string = c.req.header('Host')!;
  return c.text(`Hello ${sHost}!`)
})

export default app