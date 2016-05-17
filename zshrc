ZSH_THEME="robbyrussell"
plugins=(git)

export ZSH=/Users/cashman/.oh-my-zsh
export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/bin"

source $ZSH/oh-my-zsh.sh
# eval $(docker-machine env local)

alias zshconfig="vim ~/.zshrc"
alias git="/usr/local/bin/git"
alias vundlesync="vim +PluginInstall +PluginUpdate +PluginRemove +qall"
alias girn="grep -Irn"
alias k="kubectl"
alias kd="kubectl describe"
alias kg="kubectl get"
alias kc="kubectl create"
alias kdel="kubectl delete"
alias editvim="vim ~/.vim/vimrc"
alias kdes="kubectl describe"
