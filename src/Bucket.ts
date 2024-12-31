export default class{
    get: (key:string) => void;
    delete: (key:string) => void;
    put: (key:string, body:any) => void;
    constructor(env:any){
        if(env.k3p){
            this.get = env.k3p.get.bind(env.k3p);
            this.put = env.k3p.put.bind(env.k3p);
            this.delete = env.k3p.delete.bind(env.k3p);
        }else if(env.fs){
            env.fs.mkdir("test/bucket", {recursive: true});
            this.get = async (key:string) => {
                try{
                    await env.fs.promises.access(`test/bucket/${`test/bucket/${key}`}`);
                    return env.fs.promises.readFile(`test/bucket/${key}`);
                }catch{
                    return null;
                }
            },
            this.put = async (key:string, body:any) => {
                await env.fs.promises.writeFile(`test/bucket/${key}`, body);
            }
            this.delete = async (key:string) => {
                await env.fs.promises.rm(`test/bucket/${key}`);
            }
        }
        else{
            this.get = (null as any);
            this.put = (null as any);
            this.delete = (null as any);
        }
    }
}