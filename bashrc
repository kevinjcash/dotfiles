# Source global definitions
if [ -f /etc/bashrc ]; then
	. /etc/bashrc
fi

# Color and theme
#################

# Tell ls to be colourful
export CLICOLOR=1
export LSCOLORS=Exfxcxdxbxegedabagacad

# Run twolfson/sexy-bash-prompt
# https://github.com/twolfson/sexy-bash-prompt
. ~/.bash_prompt

# Aliases
#########
alias la='ls -lAXh --color=always'
alias ll='ls -lh --color=always'

