# Path to your oh-my-fish.
set fish_path $HOME/.oh-my-fish

# Path to your custom folder (default path is ~/.oh-my-fish/custom)
#set fish_custom $HOME/dotfiles/oh-my-fish

# Load oh-my-fish configuration.
. $fish_path/oh-my-fish.fish

# Base16 Shell
eval sh $HOME/.config/base16-shell/base16-solarized.light.sh

set -x JAVA_HOME /Library/Java/JavaVirtualMachines/jdk1.8.0_31.jdk/Contents/Home
set -x EDITOR vim
set -x GHC_DOT_APP "/Applications/ghc-7.10.1.app"
set fish_user_paths ~/.cabal/bin $GHC_DOT_APP/Contents/bin

Theme 'l'

Plugin 'theme'
Plugin 'git-flow'
Plugin 'brew'
Plugin 'tmux'
Plugin 'sublime'
Plugin 'osx'
Plugin 'pbcopy'
