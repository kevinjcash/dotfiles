" Enable highlighting for syntax
syntax on

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Airline
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
let g:airline#extensions#tabline#enabled = 1
let g:airline_powerline_fonts = 1
let g:airline_theme = 'tomorrow'
let g:airline_left_sep=' '
let g:airline_right_sep=' '


""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" COLOR
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
:set t_Co=256 " 256 colors
let g:hybrid_use_Xresources = 1
let base16colorspace=256
colorscheme tomorrow-night-eighties
:set background=dark
:set cc=79

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Rainbow Parenthesis
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
autocmd VimEnter * RainbowParentheses

" Turn off autoindent for yaml
autocmd FileType yaml setlocal indentexpr=

set guifont=Hack:h12
set guioptions-=r


