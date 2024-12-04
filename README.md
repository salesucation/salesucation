# knative-pages

## serverless ecosystem for when servers are too expensive or unavailable because of a business interuption

TLDR;

```bash
python -m coverage run -m unittest tests.py
python -m coverage report -m
```

This is an open source way to deploy a serverless app, microservice or microfrontend. It uses knative and a git repository to build and deploy your source code, like heroku or openshift 1 used to. It is also a central place to share [issues or friction](https://github.com/salesucation/salesucation/issues) that you are having with the hosted deployment environment at [https://salesucation.com](https://salesucation.com). Please go to [https://salesucation.com](https://salesucation.com) to see how serverless can save your web presence when your current solution is too expensive or faces business interruption.

There is also a [discussion](https://github.com/salesucation/salesucation/discussions) feature here for sharing anything of interest to people faced with an expensive, unsupported or just broken web presence.

## tests.py

### will contain unittest tests

My idea is that it will test `stage1` (bash) using docker to emulate yum, apt and dnf environments. `stage2.py` will be tested in the more normal way, as well as with docker to test with GKS, AKS and EKS.

## Testing backend

There is a `testing-backend/docker-compose.yml` and subfolders for [notty](https://github.com/JCarlosLucio/notty), [signoz](https://github.com/SigNoz/signoz/) and [atomic-crm](https://github.com/marmelab/atomic-crm). 
