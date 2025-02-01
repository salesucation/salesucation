kubectl patch configmap/config-network \
  --namespace knative-serving \
  --type merge \
  --patch '{"data":{"ingress-class":"kourier.ingress.networking.knative.dev"}}'
kubectl patch configmap/config-domain \
  --namespace knative-serving \
  --type merge \
  --patch '{"data":{"api.k3p.dev":""}}'
# from https://platform9.com/blog/how-to-set-up-knative-serving-on-kubernetes/
kubectl apply -f https://github.com/knative/net-http01/releases/download/knative-v1.1.0/release.yaml
kubectl patch configmap/config-network --namespace knative-serving --type merge --patch '{"data":{"certificate-class":"net-http01.certificate.networking.knative.dev"}}'
kubectl patch configmap/config-network --namespace knative-serving --type merge --patch '{"data":{"auto-tls":"Enabled"}}'

