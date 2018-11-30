" Enable highlighting for syntax
syntax on

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Airline
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
let g:airline#extensions#tabline#enabled = 1
let g:airline_powerline_fonts = 1
let g:airline_theme='base16_solarized'
let g:airline_left_alt_sep=' |'


""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" COLOR
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
let base16colorspace=256
:set t_Co=256 " 256 colors
let g:hybrid_use_Xresources = 1
if filereadable(expand("~/.vimrc_background"))
    let base16colorspace=256
    source ~/.vimrc_background
else
    colorscheme base16-tomorrow-night-eighties
endif
:set background=light
:set cc=79

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Rainbow Parenthesis
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
autocmd VimEnter * RainbowParentheses

" Turn off autoindent for yaml
autocmd FileType yaml setlocal indentexpr=

set guifont=Hack:h12
set guioptions-=r


