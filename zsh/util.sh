# INTERNAL UTILITY FUNCTIONS {{{1

# Returns whether the given command is executable or aliased.
_has() {
  return $( whence $1 >/dev/null )
}

# Returns whether the given statement executed cleanly. Try to avoid this
# because this slows down shell loading.
_try() {
  return $( eval $* >/dev/null 2>&1 )
}

# Returns whether the current host type is what we think it is. (HOSTTYPE is
# set later.)
_is() {
  return $( [ "$HOSTTYPE" = "$1" ] )
}

# Returns whether out terminal supports color.
_color() {
  return $( [ -z "$INSIDE_EMACS" -a -z "$VIMRUNTIME" ] )
}
