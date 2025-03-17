# Website

https://github.com/bisdocs/hello-react

Demo - https://bisdocs.github.io/hello-react/

### Installation

```
$ yarn or npm i
```

### Local Development

```
$ yarn start or npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.


### Note
As we are using multiple SSH, go to the folder, do git bash here
- Refer the key points here (Multiple SSH)[https://github.com/biswajitsundara/gitdoc/wiki/Multiple-SSH-Key]
- Then use deployment command.
