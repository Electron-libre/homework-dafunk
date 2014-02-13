Installation
============

Just ensure to have valid nginx/apache configuration

Files should be served from revolution909 origin server.
Each request matching /^\/repositories/ should be proxied to revolution909.


NGINX config example
====================



     upstream revolution909 {
     server 127.0.0.1:9000;
     }

    server {
        listen       80;
        server_name  through-voidness.org *.through-voidness.org through-voidness-w.tf;

        access_log  /var/log/nginx/dafunk.through-voidness.access.log  main;

        location / {
            root /srv/homework/sources/homework-dafunk/app;
            index index.html;
        }
        location /repositories {
            proxy_pass http://revolution909;
        }


        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   /usr/share/nginx/html;
        }

    }
     
