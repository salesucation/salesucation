import JSZip from "jszip";
import mime from "mime";

export const testPath = "test/bucket";

export default class {
    async get(key: string){
        if(this.env.k3p){
            return await this.env.k3p.get(key);
        }else{
            const fs = (await import("node:fs")).default;
            try {
                await fs.promises.access(`${testPath}/${key}`);
                const mime_type = mime.getType(key)
                return {
                    body: await fs.promises.readFile(`${testPath}/${key}`),
                    writeHttpMetadata: (headers: any) => {
                        headers.set("Content-Type", mime_type);
                    },
                    httpEtag: "V1"

                };
            } catch {
                return null;
            }
        }
    }
    async delete(key: string){
        if(this.env.k3p){
            return await this.env.k3p.delete(key);
        }else{
            const fs = (await import("node:fs")).default;
            await fs.promises.rm(`${testPath}/${key}`, { recursive: true, force: true });
        }
    }
    async put(key: string, body: any){
        if(this.env.k3p){
            return await this.env.k3p.put(key, body);
        }else{
            const fs = (await import("node:fs")).default;
            let aKey: string[] = key.split("/");
            aKey.pop();
            await fs.promises.mkdir(`${testPath}/${aKey.join('/')}`, { recursive: true });
            await fs.promises.writeFile(`${testPath}/${key}`, body);
        }

    }
    env:any;
    constructor(env:any) {
        this.env = env;
    }
    async putZip(folderKey: string, body: any) {
        const new_zip = new JSZip();
        // more files !
        const oResult = await new_zip.loadAsync(body);
        const oKeys = Object.keys(oResult.files);
        let sEnv = await this.get(`${folderKey}/.env`);
        await this.delete(folderKey);
        if (sEnv && sEnv.body) {
            await this.put(`${folderKey}/.env`, sEnv.body);
        }
        for (let key of oKeys) {
            const oItem = oResult.files[key];
            const contents = await oItem.async('uint8array');
            await this.put(`${folderKey}/${oItem.name}`, contents);
        }

    }
}