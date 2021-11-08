""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" CUSTOM AUTOCMDS
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
augroup vimrcEx
  " Clear all autocmds in the group
  autocmd!
  autocmd FileType yaml setlocal ts=2 sts=2 sw=2 expandtab
  autocmd FileType helm setlocal ts=2 sts=2 sw=2 expandtab
  autocmd FileType haml,yaml BracelessEnable +indent +fold +highlight
  autocmd FileType gitcommit setlocal spell textwidth=72
  autocmd FileType org setlocal nonumber
  autocmd FileType python setlocal textwidth=79 sw=4 sts=4 et
  autocmd FileType text setlocal textwidth=78
  autocmd FileType json setlocal foldmethod=syntax ts=2 sts=2 sw=2 expandtab
  autocmd FileType markdown let b:delimitMate_nesting_quotes = ['`']
  autocmd FileType typescript setlocal ts=2 sts=2 sw=2

  autocmd BufRead *obsidian/* let g:vimwiki_key_mappings = { 'all_maps': 1, }
  autocmd BufWritePost ~/code/docs/source/*.rst Make -C $(git root) html

  " Jump to last cursor position unless it's invalid or in an event handler
  autocmd BufReadPost *
    \ if line("'\"") > 0 && line("'\"") <= line("$") |
    \   exe "normal g`\"" |
    \ endif

  autocmd! BufRead,BufNewFile *.sass setfiletype sass

  " Leave the return key alone when in command line windows, since it's used
  " to run commands there.
  autocmd! CmdwinEnter * :unmap <cr>
  autocmd! CmdwinLeave * :call MapCR()

  " Note, perl automatically sets foldmethod in the syntax file
  " autocmd Syntax python setlocal foldmethod=syntax
  autocmd Syntax python normal zR

augroup END

