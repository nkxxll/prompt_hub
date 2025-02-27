#!/usr/bin/env bash

function cmd() {
    eval "docker run $1 -p 4173:4173 -v $(pwd)/data/local.db:/app/data/local.db prompthub"
}

optiondetatched=""
optionremove=""

while true; do
    case $1 in
        -u)
            docker image rm prompthub
            docker build -t prompthub .
            shift 1
            ;;
        -d)
            optiondetatched="-d"
            shift 1
            ;;
        -r)
            optionremove="--rm"
            shift 1
            ;;
        *)
            break
            ;;
    esac
done

cmd "$optiondetatched $optionremove"
