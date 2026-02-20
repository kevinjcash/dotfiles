export GOPATH=$HOME/go
export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/bin:/usr/local/go/bin"
export PATH="/usr/local/opt/node@8/bin:$PATH"
export PATH=$HOME/bin:$PATH
export PATH=$PATH:$GOPATH/bin:$GOROOT/bin:/usr/local/sbin:/usr/local/opt/python/libexec/bin
export PATH="${KREW_ROOT:-$HOME/.krew}/bin:$PATH"
export PATH="/opt/homebrew/bin:$PATH"
export PATH="$PATH:/Users/cashman/.local/bin"
export PATH="$PATH:/Applications/MacVim.app/Contents/bin"
export PATH="$PATH:/Users/cashman/sdk/go1.24.5/bin"
export PATH="/opt/homebrew/opt/libpq/bin:$PATH"
export ZSH=/Users/cashman/.oh-my-zsh
export BAT_THEME="base16"
export HELM_EXPERIMENTAL_OCI=1
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
export RUBY_CONFIGURE_OPTS="--with-openssl-dir=$(brew --prefix openssl@1.1)"
export USE_GKE_GCLOUD_AUTH_PLUGIN=True
