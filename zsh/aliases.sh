bindkey "[D" backward-word
bindkey "[C" forward-word
bindkey "^[a" beginning-of-line
bindkey "^[e" end-of-line

alias grin="grep -rIn"
alias ll="ls -lh"
alias vim="/opt/homebrew/Cellar/vim/9.0.0200/bin/vim"
alias vimconfig="vim ~/.vim/vimrc"
alias vimplugsync="vim +PlugInstall +PlugUpdate +PlugClean +qall"
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
alias proxy_rabbit="kubectl port-forward -n rabbitmq svc/rabbitmq 15672"
complete -F __start_kubectl k


# Git aliases
alias gs="git status"
alias ga="git add"
alias gc="git commit"
alias jbr='jira view $(git rev-parse --abbrev-ref HEAD)'

# Terraform
alias tf=terraform

# gCloud
alias gcp='gcloud config set project'
