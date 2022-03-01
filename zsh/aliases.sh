bindkey "[D" backward-word
bindkey "[C" forward-word
bindkey "^[a" beginning-of-line
bindkey "^[e" end-of-line

alias grin="grep -rIn"
alias ll="ls -lh"
# alias vim="/usr/local/bin/vim"
alias vimconfig="vim ~/.vim/vimrc"
alias vimplugsync="vim +PlugInstall +PlugClean +qall"
alias zshconfig="vim ~/.zshrc"
alias watch='watch '

# Kubernetes aliases
alias k="kubectl"
alias ka="kubectl apply"
alias kc="kubectl create"
alias kd="kubectl describe"
alias kdel="kubectl delete"
alias kdes="kubectl describe"
alias ke="kubectl exec -it"
alias kg="kubectl get"
alias kl="kubectl logs"
alias kuc="kubectl config use-context"
alias kp="kubectl get pods"
alias kt="kubetail"
complete -F __start_kubectl k


# Git aliases
alias gs="git status"
alias ga="git add"
alias gc="git commit"
alias jbr='jira view $(git rev-parse --abbrev-ref HEAD)'

# Terraform
alias tf=terraform

# gCloud
alias kprod="gcloud config set project rigup-production && genie kubectl:switch production"
alias kstaging="gcloud config set project rigup-staging && genie kubectl:switch staging"
alias kdev="gcloud config set project rigup-development && genie kubectl:switch development"
alias kplatform="gcloud config set project rigup-platform && gcloud container clusters get-credentials spinnaker --zone us-central1-c --project rigup-platform"
alias ksand="gcloud config set project rigup-sandbox && gcloud container clusters get-credentials argotest --zone us-central1-c --project rigup-sandbox"
alias gcp='gcloud config set project'
