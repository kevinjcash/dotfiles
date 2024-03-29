if [ $(ps ax | grep ssh-agent | wc -l) -gt 0 ] ; then 
  true;
else 
  eval "$(ssh-agent -s)"
fi

# Base16
BASE16_SHELL=$HOME/.config/base16-shell/
[ -n "$PS1" ] && [ -s $BASE16_SHELL/profile_helper.sh ] && eval "$($BASE16_SHELL/profile_helper.sh)"

# Enable Powerlevel10k instant prompt. Should stay close to the top of ~/.zshrc.
# Initialization code that may require console input (password prompts, [y/n]
# confirmations, etc.) must go above this block; everything else may go below.
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

# ZSH
export ZSH="/Users/cashman/.oh-my-zsh"

ZSH_THEME="powerlevel10k/powerlevel10k"

source $HOME/.zsh/zsh_plugins.sh
source $ZSH/oh-my-zsh.sh
source $HOME/.zsh/variables.sh
# source $HOME/.zsh/secrets.sh
source $HOME/.zsh/aliases.sh
source $HOME/.zsh/functions.sh
source $HOME/.zsh/util.sh
source $HOME/.zsh/fzf.sh

plugins=(git fancy-ctrl-z docker common-aliases macos)

# Add RVM to PATH for scripting. Make sure this is the last PATH variable change.
export PATH="$PATH:$HOME/.rvm/bin"

[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh

# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh

eval "$(/opt/homebrew/bin/brew shellenv)"

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

export LDFLAGS="-L/opt/homebrew/opt/openssl@1.1/lib"
export CPPFLAGS="-I/opt/homebrew/opt/openssl@1.1/include"
export LDFLAGS="-L/opt/homebrew/opt/readline/lib"
export CPPFLAGS="-I/opt/homebrew/opt/readline/include"
export LDFLAGS="-L/opt/homebrew/opt/sqlite/lib"
export CPPFLAGS="-I/opt/homebrew/opt/sqlite/include"
export LDFLAGS="-L/opt/homebrew/opt/zlib/lib"
export CPPFLAGS="-I/opt/homebrew/opt/zlib/include"

# The next line updates PATH for the Google Cloud SDK.
if [ -f '/Users/cashman/google-cloud-sdk/path.zsh.inc' ]; then . '/Users/cashman/google-cloud-sdk/path.zsh.inc'; fi

# The next line enables shell command completion for gcloud.
if [ -f '/Users/cashman/google-cloud-sdk/completion.zsh.inc' ]; then . '/Users/cashman/google-cloud-sdk/completion.zsh.inc'; fi

. /opt/homebrew/opt/asdf/libexec/asdf.sh

source <(kubectl completion zsh)
