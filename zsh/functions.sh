setns() {
    export CONTEXT=$(kubectl config view | grep current-context | awk '{print $2}')
    kubectl config set-context $CONTEXT --namespace=$1
}

get_pod_env() {
    kubectl get pods -o json $1 | jq '.spec.containers[0].env[] | {(.name): (.value)}' | jq -s add
}

list_images () {
    kubectl get deploy --no-headers | awk '{print $1}' | xargs kubectl get deploy --output=json | jq '.items[].spec.template.spec.containers[] | {(.name): (.image)} ' | jq -s add
}

get_token () {
    kubectl -n kube-system get -o json secret $(kubectl -n kube-system get secret | grep admin-user | awk '{print $1}') | jq -r '.data.token' | base64 -D | pbcopy
}

ecr_login () {
    eval $(aws ecr get-login --no-include-email)
}

proxy () {
    PROJECT=$(jq --arg DB "$1" -r '.[$DB].project' ~/Documents/database_info.json)
    REGION=$(jq --arg DB "$1" -r '.[$DB].region' ~/Documents/database_info.json)
    NAME=$(jq --arg DB "$1" -r '.[$DB].name' ~/Documents/database_info.json)
    PORT=${2:-5432}

    cloud_sql_proxy --instances=$PROJECT:$REGION:$NAME=tcp:$PORT
}
