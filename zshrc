ZSH_THEME="lambda-mod"
plugins=(git sublime fancy-ctrl-z docker common-aliases)

export ZSH=/Users/cashman/.oh-my-zsh
export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/bin"
export KUBE_EDITOR="/usr/local/bin/vim"
export HOMEBREW_GITHUB_API_TOKEN=54c63339ea1efefdea47956a7f95e05593866212

source $ZSH/oh-my-zsh.sh
# eval $(docker-machine env local)

alias zshconfig="vim ~/.zshrc"
alias git="/usr/local/bin/git"
alias vundlesync="vim +PluginInstall +PluginUpdate +PluginRemove +qall"
alias grin="grep -rIn"
alias k="kubectl"
alias kd="kubectl describe"
alias kg="kubectl get"
alias kc="kubectl create"
alias kdel="kubectl delete"
alias ke="kubectl exec -it"
alias editvim="vim ~/.vim/vimrc"
alias kdes="kubectl describe"
alias kl="kubectl logs"

setns() {
    export CONTEXT=$(kubectl config view | grep current-context | awk '{print $2}')
    kubectl config set-context $CONTEXT --namespace=$1
}
