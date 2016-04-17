# Games

## Install

1. Install Node.js and npm

```{r, engine='bash', count_lines}
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
sudo apt-get install -y nodejs
```

2. Install Gulp and Bower
```{r, engine='bash', count_lines}
npm install gulp bower -g
```

3. Clone project from GitHub
```{r, engine='bash', count_lines}
git clone https://github.com/ProkofyevAlexander/games.git
```

## Run

### Gulp tasks

```{r, engine='bash', count_lines}
gulp
```

### Node.js server

```{r, engine='bash', count_lines}
sudo -E su
export EXPRESS_HOST=<your_domain>
nohup npm start &
```

## Kill

```{r, engine='bash', count_lines}
ps -a
  PID TTY          TIME CMD
 5936 pts/0    00:00:00 sudo
 5937 pts/0    00:00:00 su
 5938 pts/0    00:00:00 bash
 5958 pts/0    00:00:00 npm
 5967 pts/0    00:00:00 sh
 5968 pts/0    00:00:01 node
 5969 pts/0    00:00:00 node
 6058 pts/0    00:00:00 ps
kill -9 5968
```