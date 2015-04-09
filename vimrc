set nocompatible              " be iMproved, required

source $HOME/.vim/vimrc/vundle.vim
source $HOME/.vim/vimrc/general.vim
source $HOME/.vim/vimrc/autocommands.vim
source $HOME/.vim/vimrc/colorandstyle.vim
source $HOME/.vim/vimrc/mappings.vim
source $HOME/.vim/vimrc/ctrlp.vim
source $HOME/.vim/vimrc/buffergator.vim
source $HOME/.vim/vimrc/command-t.vim

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Tagbar - The vim plugin that displays tags in a window, ordered by class etc.
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
nnoremap <silent> <leader>p :TagbarToggle<CR>

