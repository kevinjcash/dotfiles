# Path to your oh-my-zsh configuration.
ZSH=$HOME/.oh-my-zsh

autoload -U compinit
compinit

# Set name of the theme to load.
# Look in ~/.oh-my-zsh/themes/
# Optionally, if you set this to "random", it'll load a random theme each
# time that oh-my-zsh is loaded.
ZSH_THEME="steeef"

# Example aliases
alias zshconfig="vim ~/.zshrc"
alias ohmyzsh="vim ~/.oh-my-zsh"
alias la='ls -la'
alias -g ls='ls -l'

gd() { git diff $* | view -; }
gdc() { gd --cached $*; }
alias pygrep="grep --include='*.py' $*"
alias rbgrep="grep --include='*.rb' $*"
alias r=rails
alias t="script/test $*"
alias f="script/features $*"
alias g="bundle exec guard $*"
alias sr="screen -r"
alias gx="gitx"
alias gxa="gitx --all"
function mcd() { mkdir -p $1 && cd $1 }
alias misc="cd /Volumes/misc"
function cdf() { cd *$1*/ } # stolen from @topfunky

# By @ieure; copied from https://gist.github.com/1474072
#
# It finds a file, looking up through parent directories until it finds one.
# Use it like this:
#
#   $ ls .tmux.conf
#   ls: .tmux.conf: No such file or directory
#
#   $ ls `up .tmux.conf`
#   /Users/grb/.tmux.conf
#
#   $ cat `up .tmux.conf`
#   set -g default-terminal "screen-256color"
#
function up()
{
    if [ "$1" != "" -a "$2" != "" ]; then
        local DIR=$1
        local TARGET=$2
    elif [ "$1" ]; then
        local DIR=$PWD
        local TARGET=$1
    fi
    while [ ! -e $DIR/$TARGET -a $DIR != "/" ]; do
        DIR=$(dirname $DIR)
    done
    test $DIR != "/" && echo $DIR/$TARGET
}

# Uncomment following line if you want red dots to be displayed while waiting for completion
COMPLETION_WAITING_DOTS="true"

# Which plugins would you like to load? (plugins can be found in ~/.oh-my-zsh/plugins/*)
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
plugins=(git brew gem rails ruby rake rvm sublime)

JAVA_HOME=/usr/local/jdk1.7.0_51
ECLIPSE_HOME=/home/kcashman/Downloads/eclipse

# Set path, separate dirs with escaped newline
pathdirs=(
#add dirs on their own lines
~/bin
/usr/bin
/usr/bin/javacc-5.0/bin
$JAVA_HOME/bin
/home/kcashman/.local/lib/aws/bin/aws
)
for dir in $pathdirs; do
    if [ -d $dir ]; then
        path+=$dir
    fi
done

source $ZSH/oh-my-zsh.sh

#. /home/kcashman/.powerline/powerline/bindings/zsh/powerline.zsh
# start up tmux
# If not running interactively, do not do anything
#[[ $- != *i* ]] && return
#[[ $TERM != screen* ]] && exec tmux
#
#if which tmux 2>&1 >/dev/null; then
#    # if no session is started, start a new session
#    test -z ${TMUX} && tmux
#
#    # when quitting tmux, try to attach
#    while test -z ${TMUX}; do
#        tmux attach || break
#    done
#fi
