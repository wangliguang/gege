#!/bin/bash

echo "#######################开始部署\n#######################"

scp -r ./build/* root@101.200.122.49:/usr/share/nginx/html/



