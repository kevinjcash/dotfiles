filetype off                  " required
" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
" let Vundle manage Vundle, required
Plugin 'gmarik/Vundle.vim'

" Plugin 'lokaltog/vim-easymotion'          " Vim motions on speed!
Plugin 'raimondi/delimitmate'             " Vim plugin, provides insert mode auto-completion for quotes, parens, brackets, etc.
Plugin 'valloric/youcompleteme'           " Code completion
Plugin 'gabrielelana/vim-markdown'
Plugin 'godlygeek/tabular'                " Vim script for text filtering and alignment
Plugin 'kana/vim-textobj-user'            " Create your own text objects
Plugin 'w0rp/ale'                         " Async Linting Engine

" Syntax Highlighting
Plugin 'elzr/vim-json'                    " A better JSON for Vim: distinct highlighting of keywords vs values, JSON-specific (non-JS) warnings, quote concealing.
Plugin 'saltstack/salt-vim'               " Highlighting for salt files
Plugin 'chr4/nginx.vim'                   " Nginx
Plugin 'stephpy/vim-yaml'                 " Yaml syntax

" Snippets
Plugin 'sirver/ultisnips'                 " Snippets
Plugin 'honza/vim-snippets'

" Go
Plugin 'fatih/vim-go'

" Tim Pope gets his own section
" Plugin 'tpope/vim-bundler'      " Lightweight support for Ruby's Bundler
Plugin 'tpope/vim-commentary'   " Comment things out
Plugin 'tpope/vim-dispatch'     " Dispatch build and test jobs
Plugin 'tpope/vim-eunuch'       " Helpers for UNIX
Plugin 'tpope/vim-fugitive'     " Git wrapper
Plugin 'tpope/vim-rhubarb'      " Github
Plugin 'tpope/vim-sensible'     " Sensible defaults
Plugin 'tpope/vim-surround'     " Wrap objects with stuff
Plugin 'tpope/vim-unimpaired'   " Pairs of handy bracket mappings
Plugin 'tpope/vim-vinegar'      " Directory browsing
Plugin 'speeddating.vim'        " Use CTRL-A/X to increment dates, times, and more

" UI
Plugin 'airblade/vim-gitgutter'           " Git diff
Plugin 'vim-airline/vim-airline'          " Lean & mean status/tabline for vim that's light as air
Plugin 'vim-airline/vim-airline-themes'   " Lean & mean status/tabline for vim that's light as air
Plugin 'majutsushi/tagbar'                " Vim plugin that displays tags in a window, ordered by scope
Plugin 'ntpeters/vim-better-whitespace'   " Better whitespace highlighting for Vim

" File navigation
Plugin 'junegunn/fzf.vim'                       " fuh zee find

" tmux
Plugin 'sjl/vitality.vim'               " Make Vim play nicely with iTerm 2 and tmux.
Plugin 'christoomey/vim-tmux-navigator' " Seamless navigation between tmux panes and vim splits

" orgmode
Plugin 'jceb/vim-orgmode'
Plugin 'utl.vim' " Universal text linking https://www.vim.org/scripts/script.php?script_id=293
Plugin 'mattn/calendar-vim'
Plugin 'SyntaxRange' " SyntaxRange http://www.vim.org/scripts/script.php?script_id=4168

" Python
Plugin 'Yggdroot/indentLine'
Plugin 'bps/vim-textobj-python'          " Text objects for python
Plugin 'tell-k/vim-autopep8'
Plugin 'python-mode/python-mode'

" Javascript
Plugin 'jelera/vim-javascript-syntax'
Plugin 'lukeyeager/JavaScript-Indent'

" Pretty Colors
Plugin 'flazz/vim-colorschemes'             " beaucoup colors
Plugin 'altercation/vim-colors-solarized'   " Solarized
Plugin 'chriskempson/base16-vim'
Plugin 'junegunn/rainbow_parentheses.vim' " Rainbow braces for better readability

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
