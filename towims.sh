#!/bin/sh

if [ $(id -u) = 0 ]; then
    rsync -av module_userscore/* /var/lib/wims/public_html/modules/adm/class/userscore/
    chown -R wims:wims /var/lib/wims/public_html/modules/adm/class/userscore
else
    exec sudo $0
fi
