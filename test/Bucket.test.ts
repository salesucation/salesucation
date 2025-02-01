import { describe, it, expect, beforeAll } from "vitest";
import fs from "node:fs";
import Bucket from "../src/Bucket";
import {testPath} from "../src/Bucket";

describe('bucket tests', async () => {
    await fs.promises.mkdir(testPath, {recursive: true});
    it('does a put', async () => {
        const oBucket = await new Bucket({});
        await oBucket.put("k3p.io/rich.txt", "Rich was here");
        const sContents:string = await fs.promises.readFile(`${testPath}/k3p.io/rich.txt`, {encoding:"utf-8"});
        expect(sContents).toBe("Rich was here");
    }),
    it("does a get", async () =>{
        await fs.promises.writeFile(`${testPath}/k3p.io/rich2.txt`, "And also here");
        const oBucket = await new Bucket({});
        const sContents = (await oBucket.get("k3p.io/rich2.txt")as any).body.toString();
        expect(sContents).toBe("And also here");
    }),
    it("does a delete", async () =>{
        await fs.promises.writeFile(`${testPath}/k3p.io/rich3.txt`, "And also here");
        const oBucket = new Bucket({});
        await oBucket.delete("k3p.io/rich3.txt");
        let isPresent = false;
        try{
            await fs.promises.access(`${testPath}/k3p.io/rich3.txt`);
            isPresent = true;
        }catch{
            0;
        }
        expect(isPresent).toBe(false);
    }),
    it("does an unzip in to a bucket", async () => {
        const aZipFile = fs.promises.readFile("test/data/test.zip");
        const oBucket = new Bucket({});
        await oBucket.putZip("k3p.io", aZipFile);
        const sContents:string = await fs.promises.readFile(`${testPath}/k3p.io/index.html`, {encoding:"utf-8"});
        expect(sContents).toContain("Test Server");

    }),
    it("deletes preserving the .env file before doing an unzip", async () => {
        await fs.promises.writeFile(`${testPath}/k3p.io/.env`, "And also here");
        await fs.promises.writeFile(`${testPath}/k3p.io/sbgone.txt`, "And also here");
        const aZipFile = fs.promises.readFile("test/data/test.zip");
        const oBucket = new Bucket({});
        await oBucket.putZip("k3p.io", aZipFile);
        const sContents:string = await fs.promises.readFile(`${testPath}/k3p.io/.env`, {encoding:"utf-8"});
        expect(sContents).toBe("And also here");
        let isPresent = false;
        try{
            await fs.promises.access(`${testPath}/k3p.io/sbgone.txt`);
            isPresent = true;
        }catch{
            0;
        }
        expect(isPresent).toBe(false);
    })
});