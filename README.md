# salesucation

## serverless ecosystem to enable autonomous teams to deploy [microfrontends](https://martinfowler.com/articles/micro-frontends.html)

TLDR;

```bash
bash <(curl -s https://raw.githubusercontent.com/salesucation/k3p/main/stage1.sh)
```

This is an open source way to deploy a microfrontend. It uses knative to deploy source code from autonomous teams, like heroku or openshift 1 used to. salesucation works on any cloud compute provider. This repository is also a central place to share [issues or friction](https://github.com/salesucation/salesucation/issues) that you are having with the hosted deployment environment at [https://salesucation.ca](https://salesucation.ca). Please go to [https://salesucation.ca](https://salesucation.ca) for free or cheap and cheerful deployment for autonomous teams to just code without worrying about servers.

There is also a [discussion](https://github.com/salesucation/salesucation/discussions) feature here for sharing anything of interest to people trying to deploy with completely autonomous [2 large pizza](https://docs.aws.amazon.com/whitepapers/latest/public-sector-cloud-transformation/two-pizza-teams-from-ops-to-devops.html) teams.

## tests.py

### contains a unittest test of a `hello` microservice.

Get this on your local machine and change the Host header as you see fit. Then:

```bash
python -m coverage run -m unittest tests.py
python -m coverage report -m
```

I hope that this helps!