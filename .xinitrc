#!/bin/sh

xrdb ~/.Xresources 
xset +fp ~/.fonts
xset +fp /usr/share/fonts/local 
xset fp rehash 
xsetroot -cursor_name left_ptr &
urxvtd &

if [ -d /etc/X11/xinit/xinitrc.d ]; then
	for f in /etc/X11/xinit/xinitrc.d/*; do
		[ -x "$f" ] && . "$f"
	done
	unset f
fi

if [[ -z `xrandr | grep " connected" | grep 'VGA'` ]]; then
	echo "No monitor found"
else
	xrandr --output VGA1 --auto --above LVDS1
fi

sh ~/.fehbg &
xautolock -time 15 -locker sxlock &
sxhkd &
exec bspwm
