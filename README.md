# salesucation

## serverless ecosystem to enable autonomous teams to deploy [microfrontends](https://martinfowler.com/articles/micro-frontends.html)

TLDR;

IF you are using devcontainers, first set up a `.devcontainer/devcontainer.json` with:

```json
	"features": {
		"ghcr.io/devcontainers/features/docker-in-docker:2": {}
	},
	"runArgs": [
		"--cpus=2",
		"--memory=8g"
	],
	"containerEnv": {
		"K8S": "k3d"
	},

```
IF you are using a devcontainer wait until `docker ps` works and run:

ELSE just run:

```bash
bash <(curl -s https://raw.githubusercontent.com/salesucation/k3p/main/k3p)
```

This is an open source way to deploy a microfrontend. It uses knative to deploy source code from autonomous teams, like heroku or openshift 1 used to. salesucation works on any cloud compute provider. This repository is also a central place to share [issues or friction](https://github.com/salesucation/salesucation/issues) that you are having with the hosted deployment environment at [https://salesucation.ca](https://salesucation.ca). Please go to [https://salesucation.ca](https://salesucation.ca) for free or cheap and cheerful deployment for autonomous teams to just code without worrying about servers.

There is also a [discussion](https://github.com/salesucation/salesucation/discussions) feature here for sharing anything of interest to people trying to deploy with completely autonomous [2 large pizza](https://docs.aws.amazon.com/whitepapers/latest/public-sector-cloud-transformation/two-pizza-teams-from-ops-to-devops.html) teams.

## tests.py

### contains a unittest test of a `hello` microservice.

Get this on your local machine and change the Host header as you see fit. Then:

```bash
python tests.py
```
Build on this to create your own microservice.

Note: I didn't find a great way to port-forward the ksvc. My thinking is you will develop your service in the container with port-forward of mysql and minio if needed. Then you will use tests.py to make sure that your microfrontend/full stack web component works as a ksvc.

## Mysql

To install mysql in your namespace:

1. create the namespace `kubectl create namespace myservice`
1. install the persistent volume `kubectl apply -f mysqlpvc.yaml -n myservice`
1. deploy mysql (and the adminer sidecar) `kubectl apply -f mysql.yaml -n myservice`

To access mysql with the adminer sidecar get the pod: `kubectl get pods -n myservice`. Then port-forward adminer on the pod `kubectl port-forward mysql-6d544974d7-z4zph -n myservice 8080:8080`.

*BE sure* to create environment variables to consume in your microservice for DBUSER, DBPASSWD, DBNAME and DBHOST.


## S3 Compatible storage

There are good instructions for using minio with `k3s` at https://github.com/sleighzy/k3s-minio-deployment. Pay special attention to `100-pvc.yaml` and `400-deployment.yaml`. They should make sense after the `mysqlpvc.yaml` and `mysql.yaml` from this repository.

## Build and consume a docker image

To make your full stack web component in to a docker image:

1. use `docker build -t mymicrofrontend .`
1. use `k3d image import mymicrofrontend:latest -c k3d-cluster`
1. use `image: mymicrofrontend` in your yaml

You can write more tests in tests.py for your image if it is a ksvc like `hello`.

## Troubleshooting

### Signoz

Signoz is installed from the helm chart on this cluster. To access signoz:

```bash
kubectl port-forward svc/my-release-signoz-frontend -n platform 3301:3301
```
This command gets logs from all pods in a namespace. I found it helpfui when I was trying to get signoz working.

```bash
kubectl get pods -n platform -o name | xargs -I{} kubectl logs -n platform --all-containers {}
```

## Using in production

We are building this in to a public service mesh to create an ecosystem for full stack webcomponents. As such it is running on multiple nodes and with the excellent mysql operator, longhorn and minio. I have also been building full stack web components for a self service portal. These additions are for sale as an enterprise version of salesucation. Please contact us at https://salesucation.ca if you are interested in an enterprise version.

Thanks for reading this far. Micro-frontends/ full stack web components are an excellent way for autonomous teams to collaborate with much reduced interdendency. It is our hope that salesucation will start a cheap, cheerful and CAD ecosystem for microfrontend/ full stack web components.