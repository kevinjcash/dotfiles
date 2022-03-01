call plug#begin('~/.vim/plugged')

Plug 'raimondi/delimitmate'
Plug 'w0rp/ale'
Plug 'neoclide/coc.nvim', {'branch': 'release'}
Plug 'pangloss/vim-javascript'
Plug 'leafgarland/typescript-vim'
Plug 'fatih/vim-go'
Plug 'cespare/vim-toml'
Plug 'towolf/vim-helm'
Plug 'honza/vim-snippets'
Plug 'yegappan/grep'
Plug 'tweekmonster/braceless.vim'
Plug 'jeetsukumaran/vim-indentwise'
Plug 'easymotion/vim-easymotion'
Plug 'jxnblk/vim-mdx-js'
Plug 'vimwiki/vimwiki'
Plug 'michal-h21/vim-zettel'
Plug 'plasticboy/vim-markdown'
Plug 'equal-l2/vim-base64'
Plug 'amiorin/vim-fenced-code-blocks'
Plug 'godlygeek/tabular'
Plug 'wesQ3/vim-windowswap'
Plug 'chr4/nginx.vim'
Plug 'szw/vim-maximizer'
Plug 'andrewstuart/vim-kubernetes'

" Tim pope section
Plug 'tpope/vim-commentary'   " Comment things out
Plug 'tpope/vim-dispatch'     " Dispatch build and test jobs
Plug 'tpope/vim-eunuch'       " Helpers for UNIX
Plug 'tpope/vim-fugitive'     " Git wrapper
Plug 'tpope/vim-rhubarb'      " Github
" Plug 'tpope/vim-sensible'     " Sensible defaults
Plug 'tpope/vim-surround'     " Wrap objects with stuff
Plug 'tpope/vim-unimpaired'   " Pairs of handy bracket mappings
Plug 'tpope/vim-vinegar'      " Directory browsing
Plug 'tpope/vim-rails'
Plug 'tpope/vim-bundler'
Plug 'tpope/vim-speeddating'  " Use CTRL-A/X to increment dates, times, and more
Plug 'tpope/vim-abolish'      " Coercions and stuff'
Plug 'tpope/vim-ragtag'
Plug 'tpope/vim-endwise'

" Junegunn section
Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
Plug 'junegunn/fzf.vim'
Plug 'junegunn/vim-peekaboo'
Plug 'junegunn/rainbow_parentheses.vim' " Rainbow braces for better readability
Plug 'junegunn/seoul256.vim'

Plug 'preservim/tagbar'
Plug 'mhinz/vim-startify'
" Plug 'preservim/nerdtree'
" Plug 'PhilRunninger/nerdtree-buffer-ops'
Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'
Plug 'sjl/vitality.vim'
Plug 'christoomey/vim-tmux-navigator'
Plug 'hashivim/vim-terraform'

Plug 'chriskempson/base16-vim'
Plug 'altercation/vim-colors-solarized'
Plug 'vim-scripts/Rename.vim'
Plug 'farmergreg/vim-lastplace'

call plug#end()

