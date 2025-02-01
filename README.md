# k3p

## serverless ecosystem to enable autonomous teams to deploy [microfrontends](https://martinfowler.com/articles/micro-frontends.html)

TLDR;

```bash
bash <(curl -s https://raw.githubusercontent.com/salesucation/k3p/main/stage1.sh)
```

This is an open source way to deploy a serverless app, microservice or microfrontend. It uses knative and a git repository to build and deploy source code from autonomous teams, like heroku or openshift 1 used to. k3p provides a supabase backend and works on linux, AKS, GKE and EKS. This repository is also a central place to share [issues or friction](https://github.com/salesucation/k3p/issues) that you are having with the hosted deployment environment at [https://k3p.io](https://k3p.io). Please go to [https://k3p.io](https://k3p.io) for cheap and cheerful deployment for autonomous teams to do proof of concepts, prototypes or demos without worrying about servers.

There is also a [discussion](https://github.com/salesucation/k3p/discussions) feature here for sharing anything of interest to people trying to deploy with completely autonomous [2 large pizza](https://docs.aws.amazon.com/whitepapers/latest/public-sector-cloud-transformation/two-pizza-teams-from-ops-to-devops.html) teams.

## tests.py

### will contain unittest tests

My idea is that it will test `stage1` (bash) using docker to emulate yum, apt, apk and dnf environments. `stage2.py` will be tested in the more normal way, as well as with docker to test with GKS, AKS and EKS.

```bash
python -m coverage run -m unittest tests.py
python -m coverage report -m
```

## k3p-frontend
### cloudflare ingress for k3p

TLDR;

```bash
npm install
npm run dev
```

or to run in the debugger 

```bash
```

To deploy this to cloudflare workers run:

```bash
npm run deploy
```

You will need to login with wrangler to your cloudflare account. You need to add a `*` cname for your cloudflare worker, and a route to your worker `*.k3p.io/*` for instance. 

This serves static code that is uploaded as a .zip at deployment time to a cloudflare r2 bucket folder with the same name as the host header. Meta information, like the backend to proxy to is stored in a .env file in the usual format.

If there is a GET request it tries to serve the resource from the s3 bucket. If this fails we proxy to the backend in the .env file. 

If there is a put request for the root resource that contains a .zip in it with an auth header matching a secret in the .env it will unpack the .zip to the folder. 

If the .zip file contains a .env file in it with a io.k3p.image value, that image will be put in the backend under the repository owner name as namespace and the repository name as name.

This is meant as a cheap and cheerful way for autonomous teams to provide microfrontends for each other.

