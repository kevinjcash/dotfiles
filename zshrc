# ZSH
ZSH_THEME="lambda-mod"
plugins=(git fancy-ctrl-z docker common-aliases osx virtualenvwrapper virtualenv)

# Base16
BASE16_SHELL=$HOME/.config/base16-shell/
[ -n "$PS1" ] && [ -s $BASE16_SHELL/profile_helper.sh ] && eval "$($BASE16_SHELL/profile_helper.sh)"

source $ZSH/oh-my-zsh.sh
source $HOME/.zsh/aliases.sh
source $HOME/.zsh/functions.sh
source $HOME/.zsh/variables.sh
source $HOME/.zsh/util.sh
source $HOME/.zsh/fzf.sh

function virtualenv_info {
    [ $VIRTUAL_ENV ] && echo '('`basename $VIRTUAL_ENV`') '
}

eval "$(ssh-agent -s)"
ssh-add -K ~/.ssh/salt