""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Tagbar - The vim plugin that displays tags in a window, ordered by class etc.
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
nnoremap <silent> <leader>p :TagbarToggle<CR>

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" VIM-JSON - Don't conceal quotes
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
let g:vim_json_syntax_conceal = 0

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" VIM-Markdown - Don't conceal things
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
let g:vim_markdown_conceal = 0

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Syntasic
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
set statusline+=%#warningmsg#
set statusline+=%{SyntasticStatuslineFlag()}
set statusline+=%*

nmap <leader>sc :SyntasticCheck<CR>
nmap <leader>sr :SyntasticReset<CR>

let g:syntastic_always_populate_loc_list = 1
let g:syntastic_auto_loc_list = 1
let g:syntastic_check_on_open = 1
let g:syntastic_check_on_wq = 0

let g:syntastic_yaml_checkers = ['yamllint']
let g:syntastic_json_checkers = ['jsonlint']
