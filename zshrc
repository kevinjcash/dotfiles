# Path to your oh-my-zsh configuration.
ZSH=$HOME/.oh-my-zsh

autoload -U compinit
compinit

# Set name of the theme to load.
# Look in ~/.oh-my-zsh/themes/
# Optionally, if you set this to "random", it'll load a random theme each
# time that oh-my-zsh is loaded.
ZSH_THEME="ys"

alias zshconfig="vim ~/.zshrc"
alias ohmyzsh="vim ~/.oh-my-zsh"
alias la='ls -la'
alias ll='la -lh'
alias -g ls='ls -l'
gd() { git diff $* | view -; }
gdc() { gd --cached $*; }
alias pygrep="grep --include='*.py' $*"
function cdf() { cd *$1*/ } # stolen from @topfunky

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

# Uncomment following line if you want red dots to be displayed while waiting for completion
COMPLETION_WAITING_DOTS="true"

# Which plugins would you like to load? (plugins can be found in ~/.oh-my-zsh/plugins/*)
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
plugins=(git brew sublime)

# For lemonboy's Bar in arch
# PANEL_FIFO=/tmp/panel-fifo

# Set path, separate dirs with escaped newline
pathdirs=(
#add dirs on their own lines
~/bin
/usr/bin
)
for dir in $pathdirs; do
    if [ -d $dir ]; then
        path+=$dir
    fi
done

source $ZSH/oh-my-zsh.sh
