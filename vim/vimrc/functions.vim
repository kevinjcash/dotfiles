""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" multipurpose tab key
" indent if we're at the beginning of a line. else, do completion.
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" 
"
"
" function! InsertTabWrapper()
"     let col = col('.') - 1
"     if !col || getline('.')[col - 1] !~ '\k'
"         return "\<tab>"
"     else
"         return "\<c-p>"
"     endif
" endfunction
" inoremap <tab> <c-r>=InsertTabWrapper()<cr>
" inoremap <s-tab> <c-n>

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" RENAME CURRENT FILE
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
function! RenameFile()
    let old_name = expand('%')
    let new_name = input('New file name: ', expand('%'), 'file')
    if new_name != '' && new_name != old_name
        exec ':saveas ' . new_name
        exec ':silent !rm ' . old_name
        redraw!
    endif
endfunction

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Md5 COMMAND
" Show the MD5 of the current buffer
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
command! -range Md5 :echo system('echo '.shellescape(join(getline(<line1>, <line2>), '\n')) . '| md5')

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" OpenChangedFiles COMMAND
" Open a split for each dirty file in git
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
function! OpenChangedFiles()
  only " Close all windows, unless they're modified
  let status = system('git status -s | grep "^ \?\(M\|A\|UU\)" | sed "s/^.\{3\}//"')
  let filenames = split(status, "\n")
  exec "edit " . filenames[0]
  for filename in filenames[1:]
    exec "sp " . filename
  endfor
endfunction
command! OpenChangedFiles :call OpenChangedFiles()

function! SetBackgroundMode(...)
    let l:new_bg = "light"
    let l:mode = systemlist("defaults read -g AppleInterfaceStyle")[0]
    if l:mode ==? "dark"
        let l:new_bg = "dark"
    else
        let l:new_bg = "light"
    endif
    if &background !=? l:new_bg
        let &background = l:new_bg
    endif
endfunction


""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Go to Next/Previous line with indention
" https://vi.stackexchange.com/a/12870
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
function! GoToNextIndent(inc)
    " Get the cursor current position
    let currentPos = getpos('.')
    let currentLine = currentPos[1]
    let matchIndent = 0

    " Look for a line with the same indent level without going out of the buffer
    while !matchIndent && currentLine != line('$') + 1 && currentLine != -1
        let currentLine += a:inc
        let matchIndent = indent(currentLine) == indent('.')
    endwhile

    " If a line is found go to this line
    if (matchIndent)
        let currentPos[1] = currentLine
        call setpos('.', currentPos)
    endif
endfunction

nnoremap ]i :call GoToNextIndent(1)<CR>
nnoremap [i :call GoToNextIndent(-1)<CR>

""""
" Convert markdown list outline to headers
" currently assumes 2 spaces per indention level
""""
function! ConvertMarkdownListToHeaders() range
    let currentLine = a:firstline

    while currentLine <= line('$') && currentLine <= a:lastline
        let indention = indent(currentLine)
        if (indent(currentLine) > 12)
            let indention = 12
        endif
        let heading = (indention / 2) + 1
        :call setline(currentLine, substitute(getline(currentLine), "\w*- ", repeat("#", heading) . " ", ""))
        let currentLine += 1
    endwhile
endfunction

