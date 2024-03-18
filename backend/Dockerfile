FROM python:3.10-slim

MAINTAINER Pius Musyoki

LABEL authors="Pius Musyok"

RUN apt-get update && apt-get install build-essential binutils libproj-dev -y

# Python Domain
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# arbitrary location choice: you can change the directory
RUN mkdir -p /rhombus_be
WORKDIR /rhombus_be

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt /requirements.txt
RUN pip install -r /requirements.txt


# copy our project code
COPY . /rhombus_be
RUN chmod a+x /rhombus_be/entrypoint.sh
RUN chmod a+x /rhombus_be/wait-for-it.sh

RUN cp /rhombus_be/.env.example /rhombus_be/.env

# define the default command to run when starting the container
ENTRYPOINT ["/rhombus_be/entrypoint.sh"]
