function start_ticket --description 'Set up vagrant box for Jira ticket work'

    mkdir -p ~/zen/support/$argv
    mkdir -p ~/zen/support/$argv/z
    cp ~/Documents/Scripts/sol_zenoss_4.x_install.sh ~/zen/support/$argv
    cp ~/Documents/Scripts/Vagrantfile ~/zen/support/$argv
    cd ~/zen/support/$argv
    ##vagrant up &

end

