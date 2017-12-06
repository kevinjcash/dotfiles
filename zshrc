ZSH_THEME="lambda-mod"
plugins=(git sublime fancy-ctrl-z docker common-aliases osx)
BASE16_SHELL=$HOME/.config/base16-shell/
[ -n "$PS1" ] && [ -s $BASE16_SHELL/profile_helper.sh ] && eval "$($BASE16_SHELL/profile_helper.sh)"

# INTERNAL UTILITY FUNCTIONS {{{1

# Returns whether the given command is executable or aliased.
_has() {
  return $( whence $1 >/dev/null )
}

# Returns whether the given statement executed cleanly. Try to avoid this
# because this slows down shell loading.
_try() {
  return $( eval $* >/dev/null 2>&1 )
}

# Returns whether the current host type is what we think it is. (HOSTTYPE is
# set later.)
_is() {
  return $( [ "$HOSTTYPE" = "$1" ] )
}

# Returns whether out terminal supports color.
_color() {
  return $( [ -z "$INSIDE_EMACS" -a -z "$VIMRUNTIME" ] )
}


export ZSH=/Users/cashman/.oh-my-zsh
export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/bin"
export KUBE_EDITOR="/usr/local/bin/vim"
export HOMEBREW_GITHUB_API_TOKEN=54c63339ea1efefdea47956a7f95e05593866212
export GOROOT=/usr/local/opt/go/libexec
export GOPATH=$HOME/go
export PATH=$PATH:$GOPATH/bin:/usr/local/sbin

source $ZSH/oh-my-zsh.sh

# # Antigen plugin manager
# source "$HOME/.antigen/antigen.zsh"

# antigen-use oh-my-zsh
# antigen-bundle arialdomartini/oh-my-git
# antigen theme arialdomartini/oh-my-git-themes oppa-lana-style

# antigen-apply

# eval $(docker-machine env default)

alias git="/usr/local/bin/git"
alias grin="grep -rIn"
alias ll="ls -lh"
alias vimconfig="vim ~/.vim/vimrc"
alias vundlesync="vim +PluginInstall +PluginUpdate +PluginRemove +qall"
alias zshconfig="vim ~/.zshrc"

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

# Git aliases
alias gs="git status"
alias ga="git add"
alias gc="git commit"
alias gco="git checkout"
alias gp="git pull"

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

# fzf via Homebrew
if [ -e /usr/local/opt/fzf/shell/completion.zsh ]; then
  source /usr/local/opt/fzf/shell/key-bindings.zsh
  source /usr/local/opt/fzf/shell/completion.zsh
fi

# fzf via local installation
if [ -e ~/.fzf ]; then
  _append_to_path ~/.fzf/bin
  source ~/.fzf/shell/key-bindings.zsh
  source ~/.fzf/shell/completion.zsh
fi

# fzf + ag configuration
if _has fzf && _has ag; then
  export FZF_DEFAULT_COMMAND='ag --nocolor -g ""'
  export FZF_CTRL_T_COMMAND="$FZF_DEFAULT_COMMAND"
  export FZF_ALT_C_COMMAND="$FZF_DEFAULT_COMMAND"
  # export FZF_DEFAULT_OPTS='
  # --color fg:242,bg:236,hl:65,fg+:15,bg+:239,hl+:108
  # --color info:108,prompt:109,spinner:108,pointer:168,marker:168
  # '
fi
