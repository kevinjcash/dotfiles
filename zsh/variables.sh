export GOPATH=$HOME/go
export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/bin:/usr/local/go/bin"
export PATH="/usr/local/opt/node@8/bin:$PATH"
export PATH=$HOME/bin:$PATH
export PATH=$PATH:$GOPATH/bin:$GOROOT/bin:/usr/local/sbin:/usr/local/opt/python/libexec/bin
export PATH="${KREW_ROOT:-$HOME/.krew}/bin:$PATH"
export PATH="/opt/homebrew/bin:$PATH"
export PATH="$PATH:/Users/kevincashman/.local/bin"
export ZSH=/Users/kevincashman/.oh-my-zsh
export SECRET_KEY_BASE=foo
export BAT_THEME="base16"
export CLOUDSDK_PYTHON=/opt/homebrew/opt/python@3.8/libexec/bin/python
export HELM_EXPERIMENTAL_OCI=1
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
