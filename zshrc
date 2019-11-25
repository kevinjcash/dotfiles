# ZSH
export ZSH="/Users/cashman/.oh-my-zsh"

ZSH_THEME="lambda"

# plugins=(git fancy-ctrl-z docker common-aliases osx)

# Base16
BASE16_SHELL=$HOME/.config/base16-shell/
[ -n "$PS1" ] && [ -s $BASE16_SHELL/profile_helper.sh ] && eval "$($BASE16_SHELL/profile_helper.sh)"

source $ZSH/oh-my-zsh.sh
source $HOME/.zsh/aliases.sh
source $HOME/.zsh/functions.sh
source $HOME/.zsh/variables.sh
source $HOME/.zsh/util.sh
source $HOME/.zsh/fzf.sh

eval "$(ssh-agent -s)"

# Add RVM to PATH for scripting. Make sure this is the last PATH variable change.
export PATH="$PATH:$HOME/.rvm/bin"

# The next line updates PATH for the Google Cloud SDK.
if [ -f '/Users/cashman/google-cloud-sdk/path.zsh.inc' ]; then . '/Users/cashman/google-cloud-sdk/path.zsh.inc'; fi

# The next line enables shell command completion for gcloud.
if [ -f '/Users/cashman/google-cloud-sdk/completion.zsh.inc' ]; then . '/Users/cashman/google-cloud-sdk/completion.zsh.inc'; fi
