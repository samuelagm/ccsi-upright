FROM smebberson/alpine-nginx

MAINTAINER Samuel <samuelagm@gmail.com>

ADD ./dist /usr/html

RUN ln -sf /dev/stdout /var/log/nginx/access.log && \
    ln -sf /dev/stderr /var/log/nginx/error.log
