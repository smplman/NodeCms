#!/bin/bash

#ln -s -f $WORKSPACE/ /var/www/projects/$JOB_NAME
LABEL=

while getopts u:d:p:f: option
do
        case "${option}"
        in
                #u) USER=${OPTARG};;
                #d) DATE=${OPTARG};;
                #p) PRODUCT=${OPTARG};;
                #f) FORMAT=$OPTARG;;
				label) LABEL=${OPTARG};;
        esac
done

echo "Building NodeCms";
echo LABEL;