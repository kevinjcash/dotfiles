# Source global definitions
if [ -f /etc/bashrc ]; then
	. /etc/bashrc
fi

# Color and theme
#################

# Tell ls to be colourful
export CLICOLOR=1
export LSCOLORS=Exfxcxdxbxegedabagacad

# Tell grep to highlight matches
export GREP_OPTIONS='--color=auto'

# Run twolfson/sexy-bash-prompt
# https://github.com/twolfson/sexy-bash-prompt
. ~/.bash_prompt

# Aliases
#########
alias la='ls -lAXh --color=always'
alias ll='ls -lh --color=always'

alias s='serviced'
alias ss='serviced service'
alias ssa='serviced service attach'
alias sse='serviced service edit'
alias ssaz='serviced service attach zope'
alias ssl='serviced service list'
alias ssr='serviced service run'
alias ssrz='serviced service run zope'
alias sss='serviced service status'
alias st='serviced template'
alias stl='serviced template list'
alias std='serviced template deploy'
alias zendmd='serviced service attach zope su zenoss -l -c "zendmd"'
alias zope='serviced service attach zope su zenoss -l'

source $(zendev bootstrap)
