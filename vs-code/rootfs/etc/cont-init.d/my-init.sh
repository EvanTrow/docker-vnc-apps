#!/bin/sh

# Change shell for 'app' user
sed -i 's/required/sufficient/g' /etc/pam.d/chsh
chsh -s /bin/bash app

# Add 'app' user to sudoers
echo "app  ALL=(ALL) NOPASSWD:ALL" | tee /etc/sudoers.d/app