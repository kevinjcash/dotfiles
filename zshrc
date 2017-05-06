ZSH_THEME="lambda-mod"
plugins=(git sublime fancy-ctrl-z docker common-aliases)
BASE16_SHELL=$HOME/.config/base16-shell/
[ -n "$PS1" ] && [ -s $BASE16_SHELL/profile_helper.sh ] && eval "$($BASE16_SHELL/profile_helper.sh)"


export ZSH=/Users/cashman/.oh-my-zsh
export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/bin"
export KUBE_EDITOR="/usr/local/bin/vim"
export HOMEBREW_GITHUB_API_TOKEN=54c63339ea1efefdea47956a7f95e05593866212
export GOROOT=/usr/local/opt/go/libexec
export GOPATH=$HOME/go
export PATH=$PATH:$GOPATH/bin
export VAULT_ADDR="http://vault.wayblazer.systems:8200"

source $ZSH/oh-my-zsh.sh

# # Antigen plugin manager
# source "$HOME/.antigen/antigen.zsh"

# antigen-use oh-my-zsh
# antigen-bundle arialdomartini/oh-my-git
# antigen theme arialdomartini/oh-my-git-themes oppa-lana-style

# antigen-apply

# eval $(docker-machine env default)

alias ll="ls -lh"
alias zshconfig="vim ~/.zshrc"
alias git="/usr/local/bin/git"
alias vundlesync="vim +PluginInstall +PluginUpdate +PluginRemove +qall"
alias grin="grep -rIn"
alias vimconfig="vim ~/.vim/vimrc"
alias k="kubectl"
alias kd="kubectl describe"
alias kg="kubectl get"
alias kc="kubectl create"
alias kdel="kubectl delete"
alias ke="kubectl exec -it"
alias editvim="vim ~/.vim/vimrc"
alias kdes="kubectl describe"
alias kl="kubectl logs"
alias kuc="kubectl config use-context"

setns() {
    export CONTEXT=$(kubectl config view | grep current-context | awk '{print $2}')
    kubectl config set-context $CONTEXT --namespace=$1
}

get_pod_env() {
    kubectl get pods -o json $1 | jq '.spec.containers[0].env[] | {(.name): (.value)}' | jq -s add
}
