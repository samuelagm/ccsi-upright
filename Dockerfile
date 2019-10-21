FROM smebberson/alpine-nginx

MAINTAINER Samuel <samuelagm@gmail.com>


# Set the created directory as the working directory
WORKDIR /app

COPY ./dist/upright2 /app
RUN mv /app/* /usr/html

RUN ln -sf /dev/stdout /var/log/nginx/access.log && \
    ln -sf /dev/stderr /var/log/nginx/error.log
