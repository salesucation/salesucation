#!/bin/bash

# create non root user with sudo privileges
if [ $(id -u) -eq 0 ]; then
    echo -n "This installation is not meant to run as root ... enter non root username with passwordless sudo: "
    read USERNAME
    if [ ! -d /home/$USERNAME ]; then
        useradd $USERNAME -u 1000 --shell "/bin/bash" && echo "$USERNAME:$USERNAME" | chpasswd && adduser $USERNAME sudo
        sed -i /etc/sudoers -re 's/^%sudo.*/%sudo   ALL=(ALL:ALL) NOPASSWD: ALL/g'
        mkdir /home/$USERNAME
        chown $USERNAME:$USERNAME /home/$USERNAME
        usermod -a -G docker $USERNAME

        echo 'You will still need to set up some authorized_keys'
        echo 'Also please set `PermitRootLogin no`'
        echo '`PasswordAuthentication no` and `ChallengeResponseAuthentication no`'
    fi
fi


# setup some swap
if ! free | awk '/^Swap:/ {exit !$2}'; then
    sudo dd if=/dev/zero of=/swapfile bs=1M count=8192
    sudo chmod 600 /swapfile
    sudo mkswap /swapfile
    sudo swapon /swapfile
    sudo sh -c "echo '/swapfile swap swap defaults 0 0'>>/etc/fstab"
fi

# install some missing packages

sudo apt update


## install docker if not there
if ! [ -x "$(command -v docker)" ]; then
    sudo apt install docker.io
fi

## install python if not there
if ! [ -x "$(command -v python)" ]; then
    sudo apt install python-is-python3 pip && sudo mv /usr/lib/python3.11/EXTERNALLY-MANAGED /usr/lib/python3.11/EXTERNALLY-MANAGED.old

fi
