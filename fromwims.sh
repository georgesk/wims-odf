#!/bin/sh

if [ $(id -u) = 0 ]; then
    rsync -av /var/lib/wims/public_html/modules/adm/class/userscore/* module_userscore/
    chown -R georgesk:georgesk module_userscore/
else
    exec sudo $0
fi

