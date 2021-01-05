# Defenders Protection - Front

Protection defenders frontend is a Vue 3 app

Requires: Node and Npm

## Installation guide [Debian/Ubuntu]

##### Vue App

1. Run the following code on the project's root dir to install dependencies
```
npm install
```

2. Build the app
```
npm run build
```

##### Nginx (reverse proxy)

1. Create a new configuration file
```
sudo nano /etc/nginx/sites-available/dscompass-front
```

2. Copy these lines and save the file:
```
server {
    client_max_body_size 8M;

    server_name ds-compass.protectioninternational.org;

    root /srv/www/protectiondefenders-front/dist;

    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

3. Check the configuration syntax by typing:
```
sudo nginx -t
```

4. Link the configuration file to Nginx’s sites-enabled directory to enable them:
```
sudo ln -s /etc/nginx/sites-available/dscompass-front /etc/nginx/sites-enabled
```

5. Then restart the Nginx service
```
sudo systemctl restart nginx
```


## Let's encrypt (optional)

1. Install Certbot
```
sudo apt install certbot python3-certbot-nginx
```

2. Obtain the certificate
```
sudo certbot --nginx -d ds-compass.protectioninternational.org
```



## Development
```
npm run serve
```
