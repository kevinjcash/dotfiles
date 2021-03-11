""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" python-mode
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
let g:pymode_python = 'python3'
let g:pymode_lint = 1
let g:pymode_virtualenv = 1
" let g:pymode_lint_checkers = ['pep8']

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" fzf
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
set rtp+=~/.fzf
nmap <Leader>b :Buffers<CR>
nmap <Leader>r :Tags<CR>
nmap <Leader>f :Files<CR>
nmap <Leader>l :Lines<CR>
nmap <Leader>a :Ag 
nnoremap <silent> <Leader><Leader> :Files <C-R>=expand('%:h')<CR><CR>

" Customize fzf colors to match your color scheme
let g:fzf_colors =
\ { 'fg':      ['fg', 'Normal'],
  \ 'bg':      ['bg', 'Normal'],
  \ 'hl':      ['fg', 'Comment'],
  \ 'fg+':     ['fg', 'CursorLine', 'CursorColumn', 'Normal'],
  \ 'bg+':     ['bg', 'CursorLine', 'CursorColumn'],
  \ 'hl+':     ['fg', 'Statement'],
  \ 'info':    ['fg', 'PreProc'],
  \ 'border':  ['fg', 'Ignore'],
  \ 'prompt':  ['fg', 'Conditional'],
  \ 'pointer': ['fg', 'Exception'],
  \ 'marker':  ['fg', 'Keyword'],
  \ 'spinner': ['fg', 'Label'],
  \ 'header':  ['fg', 'Comment'] }

" Enable per-command history.
" CTRL-N and CTRL-P will be automatically bound to next-history and
" previous-history instead of down and up. If you don't like the change,
" explicitly bind the keys to down and up in your $FZF_DEFAULT_OPTS.
let g:fzf_history_dir = '~/.local/share/fzf-history'
let g:fzf_launcher = "~/.vim/fzf_launcher %s"
" Command for git grep
" - fzf#vim#grep(command, with_column, [options], [fullscreen])
command! -bang -nargs=* GGrep
  \ call fzf#vim#grep('git grep --line-number '.shellescape(<q-args>), 0, <bang>0)

" Override Colors command. You can safely do this in your .vimrc as fzf.vim
" will not override existing commands.
command! -bang Colors
  \ call fzf#vim#colors({'left': '15%', 'options': '--reverse --margin 30%,0'}, <bang>0)

" Augmenting Ag command using fzf#vim#with_preview function
"   * fzf#vim#with_preview([[options], preview window, [toggle keys...]])
"     * For syntax-highlighting, Ruby and any of the following tools are required:
"       - Highlight: http://www.andre-simon.de/doku/highlight/en/highlight.php
"       - CodeRay: http://coderay.rubychan.de/
"       - Rouge: https://github.com/jneen/rouge
"
"   :Ag  - Start fzf with hidden preview window that can be enabled with "?" key
"   :Ag! - Start fzf in fullscreen and display the preview window above
command! -bang -nargs=* Ag
  \ call fzf#vim#ag(<q-args>,
  \                 <bang>0 ? fzf#vim#with_preview('up:60%')
  \                         : fzf#vim#with_preview('right:50%:hidden', '?'),
  \                 <bang>0)


""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Org Mode
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
let g:org_agenda_files=['~/org/index.org']

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" UTL
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
let g:utl_cfg_hdl_scm_http_system = "!open -na 'Google Chrome' --args '%u#%f'"

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" terraform
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
let g:terraform_fmt_on_save=1


""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" coc
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Use <c-space> to trigger completion.
if has('nvim')
  inoremap <silent><expr> <c-space> coc#refresh()
else
  inoremap <silent><expr> <c-@> coc#refresh()
endif

" Make <CR> auto-select the first completion item and notify coc.nvim to
" format on enter, <cr> could be remapped by other vim plugin
inoremap <silent><expr> <cr> pumvisible() ? coc#_select_confirm()
                              \: "\<C-g>u\<CR>\<c-r>=coc#on_enter()\<CR>"
nmap <silent> [g <Plug>(coc-diagnostic-prev)
nmap <silent> ]g <Plug>(coc-diagnostic-next)

let g:coc_global_extensions = ['coc-solargraph']

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Startify
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

function! s:list_commits()
    let git = 'git -C ~/ru/platform'
    let commits = systemlist(git .' log --oneline | head -n10')
    let git = 'G'. git[1:]
    return map(commits, '{"line": matchstr(v:val, "\\s\\zs.*"), "cmd": "'. git .' show ". matchstr(v:val, "^\\x\\+") }')
endfunction

let g:startify_lists = [
            \ { 'header': ['   MRU'],            'type': 'files' },
            \ { 'header': ['   MRU '. getcwd()], 'type': 'dir' },
            \ { 'header': ['   Sessions'],       'type': 'sessions' },
            \ { 'header': ['   Commits'],        'type': function('s:list_commits') },
            \ ]

let g:startify_bookmarks = [ '~/ru/platform', '~/ru/rigup' ]

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" NERDTREE
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" autocmd StdinReadPre * let s:std_in=1
" autocmd VimEnter * if argc() == 0 && !exists('s:std_in') | NERDTree | endif

" autocmd bufenter * if (winnr("$") == 1 && exists("b:NERDTree") && b:NERDTree.isTabTree()) | q | endif

" nnoremap <leader>n :NERDTreeVCS<CR> :NERDTreeFind<CR>
" nnoremap <leader>n :NERDTreeToggle<CR>
" let NERDTreeMinimalUI = 1
" let NERDTreeDirArrows = 1

" let NERDTreeFind='f'

" " Check if NERDTree is open or active
" function! IsNERDTreeOpen()        
"   return exists("t:NERDTreeBufName") && (bufwinnr(t:NERDTreeBufName) != -1)
" endfunction

" " Call NERDTreeFind iff NERDTree is active, current window contains a modifiable
" " file, and we're not in vimdiff
" function! SyncTree()
"   if &modifiable && IsNERDTreeOpen() && strlen(expand('%')) > 0 && !&diff
"     NERDTreeFind
"     wincmd p
"   endif
" endfunction

" " Highlight currently open buffer in NERDTree
" autocmd BufRead * call SyncTree()

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Tagbar
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
let g:tagbar_type_yaml = {
    \ 'ctagstype' : 'yaml',
    \ 'kinds' : [
        \ 'a:anchors',
        \ 's:section',
        \ 'e:entry'
    \ ],
  \ 'sro' : '.',
    \ 'scope2kind': {
      \ 'section': 's',
      \ 'entry': 'e'
    \ },
    \ 'kind2scope': {
      \ 's': 'section',
      \ 'e': 'entry'
    \ },
    \ 'sort' : 0
    \ }


""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" EasyMotion
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
let g:EasyMotion_do_mapping = 0 " Disable default mappings

" `s{char}{label}`
nmap <Leader>s <Plug>(easymotion-overwin-f)

" Turn on case-insensitive feature
let g:EasyMotion_smartcase = 1

" JK motions: Line motions
map <Leader>j <Plug>(easymotion-j)
map <Leader>k <Plug>(easymotion-k)
