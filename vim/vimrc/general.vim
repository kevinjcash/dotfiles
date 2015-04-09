""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" BASIC EDITING CONFIGURATION
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" allow unsaved background buffers and remember marks/undo for them
set hidden

" remember more commands and search history
set history=10000

" tab settings: use spaces, default to 4 space tab
set expandtab
set tabstop=4
set shiftwidth=4
set softtabstop=4
set shiftround

set autoindent

" always draw the status bar
set laststatus=2

" highlight matching braces
set showmatch

" highlight search matches as you type
set incsearch

" keep highlighting after searching. Dismiss with nohl (mapped to enter)
set hlsearch

" Break at one of the following characters instead of the last char that fits
" ^I!@*-+;:,./?
set linebreak
"
" make searches case-sensitive only if they contain upper-case characters
set ignorecase smartcase

" highlight current line
set cursorline

" jump to the 1st open window that contains the specified buffer, if it exists
set switchbuf=useopen

" turn line numbers on and set gutter width to 5
set number
set numberwidth=5

" Always display tab line at top
set showtabline=2

" Window width
set winwidth=79

" Shorten wait time for switching from insert to normal
set timeoutlen=1000 ttimeoutlen=0

" Prevent Vim from clobbering the scrollback buffer. See
" http://www.shallowsky.com/linux/noaltscreen.html
set t_ti= t_te=

" keep more context when scrolling off the end of a buffer
set scrolloff=3

" Store temporary files in a central spot
:let g:netrw_dirhistmax = 0

set backup
set backupdir=~/.vim-tmp,~/.tmp,~/tmp,/var/tmp,/tmp
set directory=~/.vim-tmp,~/.tmp,~/tmp,/var/tmp,/tmp

" allow backspacing over everything in insert mode
set backspace=indent,eol,start

" display incomplete commands
set showcmd

" Enable file type detection.
" Use the default filetype settings, so that mail gets 'tw' set to 72,
" 'cindent' is on in C files, etc.
" Also load indent files, to automatically do language-dependent indenting.
filetype plugin indent on

" use emacs-style tab completion when selecting files, etc
set wildmode=longest,list

" make tab completion for files/buffers act like bash
set wildmenu
