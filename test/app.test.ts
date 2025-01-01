import { describe, it, expect } from 'vitest';
import fs from "node:fs";
import app from '../src/index';
import Bucket from "../src/Bucket"

describe('hono app test', async () => {
    let env:any = {
        fs, testPath: "test/bucket"
    }
    const aZipFile = env.fs.promises.readFile("test/data/test.zip");
    const oBucket = new Bucket(env);
    await oBucket.putZip("k3p.io", aZipFile);
    
    it('/', async () => {
        const res = await app.request('/', {headers:{host:"k3p.io"}}, env);
        const text = await res.text()
        console.log(text);
        expect(res.status).toBe(200)
        expect(text).toContain('Test server')
    })
});