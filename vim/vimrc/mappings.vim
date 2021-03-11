""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" MISC KEY MAPS
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
let mapleader="\<space>"
let maplocalleader="\\"

map <leader>y "*y

" Start commands with space
" nmap <space> :

" Move around splits with <c-hjkl>
nnoremap <c-j> <c-w>j
nnoremap <c-k> <c-w>k
nnoremap <c-h> <c-w>h
nnoremap <c-l> <c-w>l

tnoremap <c-j> <c-w>j
tnoremap <c-k> <c-w>k
tnoremap <c-h> <c-w>h
tnoremap <c-l> <c-w>l

" Can't be bothered to understand ESC vs <c-c> in insert mode
imap <c-c> <esc>

" Clear the search buffer when hitting return
function! MapCR()
  nnoremap <cr> :nohlsearch<cr>
endfunction
call MapCR()

" nnoremap <leader><leader> <c-^>

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" ARROW KEYS ARE UNACCEPTABLE
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
map <Left>  <Nop>
map <Right> <Nop>
map <Up>    <Nop>
map <Down>  <Nop>

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" OPEN FILES IN DIRECTORY OF CURRENT FILE
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
cnoremap %% <C-R>=expand('%:h').'/'<cr>
map <leader>e :edit %%
map <leader>v :view %%

"map <leader>cp call copymode
"function! Copymode()
"  IndentLinesToggle
"  set nonumber!<CR>
"endfunction

set pastetoggle=<F2>

" Open help vertically, on the right
cnoreabbrev H vert bo h
