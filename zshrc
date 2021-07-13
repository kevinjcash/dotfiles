if [ $(ps ax | grep ssh-agent | wc -l) -gt 0 ] ; then 
  true;
else 
  eval "$(ssh-agent -s)"
fi

# Enable Powerlevel10k instant prompt. Should stay close to the top of ~/.zshrc.
# Initialization code that may require console input (password prompts, [y/n]
# confirmations, etc.) must go above this block; everything else may go below.
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

# ZSH
export ZSH="/Users/cashman/.oh-my-zsh"

ZSH_THEME="powerlevel10k/powerlevel10k"

plugins=(git fancy-ctrl-z docker common-aliases osx zsh-kubectl-prompt)

# # Base16
BASE16_SHELL=$HOME/.config/base16-shell/
[ -n "$PS1" ] && [ -s $BASE16_SHELL/profile_helper.sh ] && eval "$($BASE16_SHELL/profile_helper.sh)"

source $ZSH/oh-my-zsh.sh
source $HOME/.zsh/variables.sh
source $HOME/.zsh/secrets.sh
source $HOME/.zsh/aliases.sh
source $HOME/.zsh/functions.sh
source $HOME/.zsh/util.sh
source $HOME/.zsh/fzf.sh


# Add RVM to PATH for scripting. Make sure this is the last PATH variable change.
export PATH="$PATH:$HOME/.rvm/bin"

# The next line updates PATH for the Google Cloud SDK.
if [ -f '/Users/cashman/google-cloud-sdk/path.zsh.inc' ]; then . '/Users/cashman/google-cloud-sdk/path.zsh.inc'; fi

# The next line enables shell command completion for gcloud.
if [ -f '/Users/cashman/google-cloud-sdk/completion.zsh.inc' ]; then . '/Users/cashman/google-cloud-sdk/completion.zsh.inc'; fi

[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh

# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh

# eval "$(register-python-argcomplete pipx)"

# Created by `userpath` on 2021-03-18 15:46:46
export PATH="$PATH:/Users/cashman/.local/bin"
eval "$(rbenv init -)"
