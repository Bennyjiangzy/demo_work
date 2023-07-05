#!/bin/bash

# build docker imges
docker build -t demo-backend ./backend
docker build -t demo-frontend ./frontend

# run you can simply improved by docker-compose or K8S 
docker run -itdp 8000:8000 demo-backend
docker run -itdp 8080:8080 demo-frontend