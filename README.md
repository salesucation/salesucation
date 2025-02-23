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

I hope that this helps!

*Note

This command gets logs from all pods in a namespace:

```bash
kubectl get pods -n platform -o name | xargs -I{} kubectl logs -n platform --all-containers {}
```