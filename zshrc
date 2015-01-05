# Path to your oh-my-zsh configuration.
ZSH=$HOME/.oh-my-zsh

autoload -U compinit
compinit

# Base16 Shell
BASE16_SHELL="$HOME/.config/base16-shell/base16-default.dark.sh"
[[ -s $BASE16_SHELL ]] && source $BASE16_SHELL

# Set name of the theme to load.
# Look in ~/.oh-my-zsh/themes/
# Optionally, if you set this to "random", it'll load a random theme each
# time that oh-my-zsh is loaded.
ZSH_THEME="ys"

alias zshconfig="vim ~/.zshrc"
alias ohmyzsh="vim ~/.oh-my-zsh"
alias la='ls -la'
alias -g ls='ls -l'
alias ops='cd ~/Documents/datacloud/datacloud-ops/trunk'
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

# Amazon Aliases
s3_stage_script_server='s3://datasolutions-dstest/amiaddons/scriptServer/scripts/'

# Pacman alias examples
alias pacupg='sudo pacman -Syu'         # Synchronize with repositories and then upgrade packages that are out of date on the local system.
alias pacin='sudo pacman -S'            # Install specific package(s) from the repositories
alias pacins='sudo pacman -U'           # Install specific package not from the repositories but from a file 
alias pacre='sudo pacman -R'            # Remove the specified package(s), retaining its configuration(s) and required dependencies
alias pacrem='sudo pacman -Rns'         # Remove the specified package(s), its configuration(s) and unneeded dependencies
alias pacrep='pacman -Si'               # Display information about a given package in the repositories
alias pacreps='pacman -Ss'              # Search for package(s) in the repositories
alias pacloc='pacman -Qi'               # Display information about a given package in the local database
alias paclocs='pacman -Qs'              # Search for package(s) in the local database
alias paclo="pacman -Qdt"               # List all packages which are orphaned
alias pacc="sudo pacman -Scc"           # Clean cache - delete all not currently installed package files
alias paclf="pacman -Ql"                # List all files installed by a given package
alias pacexpl="pacman -D --asexp"       # Mark one or more installed packages as explicitly installed 
alias pacimpl="pacman -D --asdep"       # Mark one or more installed packages as non explicitly installed

# '[r]emove [o]rphans' - recursively remove ALL orphaned packages
alias pacro="pacman -Qtdq > /dev/null && sudo pacman -Rns \$(pacman -Qtdq | sed -e ':a;N;$!ba;s/\n/ /g')"

# Additional pacman alias examples
alias pacupd='sudo pacman -Sy && sudo abs'         # Update and refresh the local package and ABS databases against repositories
alias pacinsd='sudo pacman -S --asdeps'            # Install given package(s) as dependencies
alias pacmir='sudo pacman -Syy'                    # Force refresh of all package lists after updating /etc/pacman.d/mirrorlist

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
PANEL_FIFO=/tmp/panel-fifo

# Set path, separate dirs with escaped newline
pathdirs=(
#add dirs on their own lines
~/bin
/usr/bin
/usr/bin/javacc-5.0/bin
$JAVA_HOME/bin
/home/kevin/.local/lib/aws/bin/aws
/home/kevin/.config/bspwm/panel
/home/kevin/.config/bspwm/panel
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
