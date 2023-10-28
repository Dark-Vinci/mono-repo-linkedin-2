# start minikube
minikube start --driver=docker;
minikube dashboard;

sleep 4s;

# deployment for auth;
kubectl apply -f=../../kubernetes/host-pc.yaml;
kubectl apply -f=../../kubernetes/host-pvc.yaml;
kubectl apply -f=../../kubernetes/auth/environment.yaml;
kubectl apply -f=../../kubernetes/auth/service.yaml;
kubectl apply -f=../../kubernetes/auth/auth-deployment.yaml;



# display all services
minikube services
