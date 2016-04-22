# Games

## Install

1. Install Node.js and npm

    ```sh
    curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
    sudo apt-get install -y nodejs
    ```

2. Install Gulp and Bower
    ```sh
    npm install gulp bower -g
    ```

3. Clone project from GitHub
    ```sh
    git clone https://github.com/ProkofyevAlexander/games.git
    ```
    
4. Install node and bower components
    ```sh
    cd games
    npm install
    bower install
    ```
    
## Run and stop

### Gulp tasks

Run in background for development purposes (Gulp is watching for files
changes and handle these on the fly).

```sh
gulp
```

Ctrl+C to stop process.

Prepare public files on production

```sh
gulp prepare_public
```

### Node.js server

```sh
sudo -E su
export EXPRESS_HOST=prokofyev-alexander.me
export EXPRESS_PORT=80
npm start
```

Ctrl+C to stop process.

For run server as background process use:

```sh
sudo -E su
export EXPRESS_HOST=prokofyev-alexander.me
export EXPRESS_PORT=80
nohup npm start &
```

For kill background process:

```sh
ps aux | grep node
root      5967  0.0  0.0   4396   652 ?        S    Apr17   0:00 sh -c node ./server/server.js | ./node_modules/.bin/bunyan
root      5968  0.0  5.2 986704 55208 ?        Sl   Apr17   0:07 node ./server/server.js
root      5969  0.0  1.6 780896 17584 ?        Sl   Apr17   0:00 node ./node_modules/.bin/bunyan
kill -9 5968
```