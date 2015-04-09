filetype off                  " required
" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
" let Vundle manage Vundle, required
Plugin 'gmarik/Vundle.vim'

Plugin 'Lokaltog/vim-easymotion' " Vim motions on speed!
Plugin 'Raimondi/delimitMate' " Vim plugin, provides insert mode auto-completion for quotes, parens, brackets, etc.
Plugin 'bling/vim-airline' " lean & mean status/tabline for vim that's light as air
Plugin 'chrisbra/NrrwRgn' " A Vim plugin for focussing on a selected region
Plugin 'dag/vim-fish' " Vim support for editing fish scripts
Plugin 'junegunn/rainbow_parentheses.vim' " rainbow braces for better readability
Plugin 'elzr/vim-json' " A better JSON for Vim: distinct highlighting of keywords vs values, JSON-specific (non-JS) warnings, quote concealing.
Plugin 'godlygeek/tabular' " Vim script for text filtering and alignment
Plugin 'majutsushi/tagbar' " Vim plugin that displays tags in a window, ordered by scope
Plugin 'maxbrunsfeld/vim-yankstack' " A lightweight implementation of emacs's kill-ring for vim
Plugin 'ntpeters/vim-better-whitespace' " Better whitespace highlighting for Vim
Plugin 'parkr/vim-jekyll' " jekyll tools
Plugin 'plasticboy/vim-markdown' " Syntax highlighting, matching rules and mappings for the original Markdown and extensions.
Plugin 'terryma/vim-multiple-cursors' " True Sublime Text style multiple selections for Vim
Plugin 'tpope/vim-eunuch' " helpers for UNIX
Plugin 'tpope/vim-fugitive' " git wrapper
Plugin 'tpope/vim-unimpaired' " pairs of handy bracket mappings
Plugin 'wikimatze/hammer.vim' " vim, your markup language of choice, and your browser of choice.

" File navigation
Plugin 'git://git.wincent.com/command-t.git' " file finder
Plugin 'kien/ctrlp.vim' " Fuzzy file, buffer, mru, tag, etc finder.  http://kien.github.com/ctrlp.vim
Plugin 'jeetsukumaran/vim-buffergator' " Vim plugin to list, select and switch between buffers.

" tmux
Plugin 'sjl/vitality.vim' " Make Vim play nicely with iTerm 2 and tmux.
Plugin 'christoomey/vim-tmux-navigator' " Seamless navigation between tmux panes and vim splits

" Rails
Plugin 'tpope/vim-rails' " Ruby on Rails power tools
Plugin 'tpope/vim-bundler' " Lightweight support for Ruby's Bundler

" Pretty Colors
Plugin 'w0ng/vim-hybrid' " A dark colour scheme for Vim & gVim
Plugin 'chriskempson/base16-vim' " Colorscheme collection

call vundle#end()            " required
filetype plugin indent on    " required
" To ignore plugin indent changes, instead use:
"filetype plugin on
"
" Brief help
" :PluginList       - lists configured plugins
" :PluginInstall    - installs plugins; append `!` to update or just :PluginUpdate
" :PluginSearch foo - searches for foo; append `!` to refresh local cache
" :PluginClean      - confirms removal of unused plugins; append `!` to auto-approve removal
"
" see :h vundle for more details or wiki for FAQ
