filetype off                  " required
" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
" let Vundle manage Vundle, required
Plugin 'gmarik/Vundle.vim'

Plugin 'Lokaltog/vim-easymotion'          " Vim motions on speed!
Plugin 'Raimondi/delimitMate'             " Vim plugin, provides insert mode auto-completion for quotes, parens, brackets, etc.
Plugin 'bling/vim-airline'                " Lean & mean status/tabline for vim that's light as air
Plugin 'chrisbra/NrrwRgn'                 " A Vim plugin for focussing on a selected region
Plugin 'dag/vim-fish'                     " Vim support for editing fish scripts
Plugin 'junegunn/rainbow_parentheses.vim' " Rainbow braces for better readability
Plugin 'elzr/vim-json'                    " A better JSON for Vim: distinct highlighting of keywords vs values, JSON-specific (non-JS) warnings, quote concealing.
Plugin 'godlygeek/tabular'                " Vim script for text filtering and alignment
Plugin 'kana/vim-textobj-user'            " Create your own text objects
Plugin 'majutsushi/tagbar'                " Vim plugin that displays tags in a window, ordered by scope
Plugin 'maxbrunsfeld/vim-yankstack'       " A lightweight implementation of emacs's kill-ring for vim
Plugin 'ntpeters/vim-better-whitespace'   " Better whitespace highlighting for Vim
Plugin 'parkr/vim-jekyll'                 " Jekyll tools
Plugin 'plasticboy/vim-markdown'          " Syntax highlighting, matching rules and mappings for the original Markdown and extensions.
Plugin 'terryma/vim-multiple-cursors'     " True Sublime Text style multiple selections for Vim
Plugin 'wikimatze/hammer.vim'             " Vim, your markup language of choice, and your browser of choice.
Plugin 'chikamichi/mediawiki.vim'         " Mediawiki syntax

" Tim Pope gets his own section
Plugin 'tpope/vim-bundler'      " Lightweight support for Ruby's Bundler
Plugin 'tpope/vim-commentary'   " Comment things out
Plugin 'tpope/vim-eunuch'       " Helpers for UNIX
Plugin 'tpope/vim-fugitive'     " Git wrapper
Plugin 'tpope/vim-rails'        " Ruby on Rails power tools
Plugin 'tpope/vim-surround'     " Wrap objects with stuff
Plugin 'tpope/vim-unimpaired'   " Pairs of handy bracket mappings

" File navigation
Plugin 'git://git.wincent.com/command-t.git' " File finder
Plugin 'kien/ctrlp.vim'                      " Fuzzy file, buffer, mru, tag, etc finder.  http://kien.github.com/ctrlp.vim
Plugin 'nixprime/cpsm'                       " A CtrlP matcher, specialized for paths.
Plugin 'jeetsukumaran/vim-buffergator'       " Vim plugin to list, select and switch between buffers.

" tmux
Plugin 'sjl/vitality.vim'               " Make Vim play nicely with iTerm 2 and tmux.
Plugin 'christoomey/vim-tmux-navigator' " Seamless navigation between tmux panes and vim splits

" Python
Plugin 'bps/vim-textobj-python'          " Text objects for python
Plugin 'Yggdroot/indentLine'

" Javascript
Plugin 'jelera/vim-javascript-syntax'
Plugin 'lukeyeager/JavaScript-Indent'

" Pretty Colors
Plugin 'w0ng/vim-hybrid'                    " A dark colour scheme for Vim & gVim
Plugin 'altercation/vim-colors-solarized'   " Solarized
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
