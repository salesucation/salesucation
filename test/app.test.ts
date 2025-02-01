import { describe, it, expect } from 'vitest';
import fs from "node:fs";
import app from '../src/index';
import Bucket from "../src/Bucket"

describe('hono app test', async () => {
    const aZipFile = await fs.promises.readFile("test/data/test.zip");
    const oBucket = new Bucket({});
    await oBucket.putZip("k3p.io", aZipFile);
    
    it('gets /', async () => {
        const res = await app.request('/', {headers:{host:"k3p.io"}}, {});
        const text = await res.text()
        console.log(text);
        expect(res.status).toBe(200)
        expect(text).toContain('Test server')
    });
    it('puts /', async () => {
        const res = await app.request('/', {method: "PUT", headers:{host:"k3p.ca"}, body: aZipFile}, {});
        const text = await res.text()
        console.log(text);
        expect(res.status).toBe(200)
        expect(text).toContain('ok')
    });
    it('posts /', async() =>{
        const res = await app.request('/', {method: "POST", headers:{host:"k3p.dev"}}, {});
        const text = await res.text();
        console.log(text);
        expect(res.status).toBe(404);
    });
});