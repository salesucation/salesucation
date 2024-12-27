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
        echo 'Also please sefile.zipt `PermitRootLogin no`'
        echo '`PasswordAuthentication no` and `ChallengeResponseAuthentication no`'
    fi
fi

## install python if not there
if ! [ -x "$(command -v python)" ]; then
    sudo apt update
    sudo apt install python-is-python3 python3-venv pip
fi

python -m venv /tmp/install

cd /tmp/install

source ./bin/activate

curl -o requirements.txt https://raw.githubusercontent.com/salesucation/k3p/rich-sprint2/requirements.txt

pip install -r requirements.txt

curl -o stage2.py https://raw.githubusercontent.com/salesucation/k3p/rich-sprint2/stage2.py

python stage2.py
