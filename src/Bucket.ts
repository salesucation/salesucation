import JSZip from "jszip";

export default class{
    get: (key:string) => any;
    delete: (key:string) => void;
    put: (key:string, body:any) => void;
    constructor(env:any){
        if(env.k3p){
            this.get = env.k3p.get.bind(env.k3p);
            this.put = env.k3p.put.bind(env.k3p);
            this.delete = env.k3p.delete.bind(env.k3p);
        }else if(env.fs){
            this.get = async (key:string) => {
                try{
                    await env.fs.promises.access(`${env.testPath}/${key}`);
                    return env.fs.promises.readFile(`${env.testPath}/${key}`);
                }catch{
                    return null;
                }
            },
            this.put = async (key:string, body:any) => {
                let aKey:string[] = key.split("/");
                aKey.pop();
                await env.fs.promises.mkdir(`${env.testPath}/${aKey.join('/')}`, {recursive: true});
                await env.fs.promises.writeFile(`${env.testPath}/${key}`, body);
            }
            this.delete = async (key:string) => {
                await env.fs.promises.rm(`${env.testPath}/${key}`, { recursive: true, force: true });
            }
        }
        else{
            this.get = (null as any);
            this.put = (null as any);
            this.delete = (null as any);
        }
    }
    async putZip(folderKey:string, body:any){
        const new_zip = new JSZip();
        // more files !
        const oResult = await new_zip.loadAsync(body);
        const oKeys = Object.keys(oResult.files);
        let sEnv = await this.get(`${folderKey}/.env`);
        await this.delete(folderKey);
        if(sEnv){
            await this.put(`${folderKey}/.env`, sEnv);
        }
        for (let key of oKeys) {
            const oItem = oResult.files[key];
            const contents = await oItem.async('uint8array');
            await this.put(`${folderKey}/${oItem.name}`, contents);
        }
        
    }
}