# k3p

## serverless ecosystem to enable autonomous teams to deploy [microfrontends](https://martinfowler.com/articles/micro-frontends.html)

TLDR;

```bash
bash <(curl -s https://raw.githubusercontent.com/salesucation/k3p/rich-sprint1/stage1.sh)
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
