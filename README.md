# react-redux-starter

> Rangle.io official React + Redux starter

## Getting Started

Use our [starter script](https://www.npmjs.com/package/rangle-starter), with
`react-redux-starter` as the `techStack` argument.

## npm scripts

### Dev
```bash
$ npm run dev
```

Open `http://localhost:3000` in your browser.

### Tests

#### Single Run
```bash
$ npm run test
```

#### Watch Files
```bash
$ npm run test:watch
```

#### Coverage
```bash
$ npm run cover
```

### Production
```bash
$ npm start
```

## Want to deploy on Heroku?  Read this.

By default, Heroku's node stack runs `npm install --production`, which ignores the  `devDependencies`
section of your `package.json`. The convention in these cases is that only what is necessary 
for the actual production run should be in `dependencies`.

However this is at odds with modern JS bundlers like webpack, where almost everything is a `devDependency`;
because Heroku does not separate the build and run environments, its default setup isn't the
best fit.

Here is a workaround: https://devcenter.heroku.com/articles/nodejs-support#customizing-the-build-process

## License

Copyright (c) 2015 rangle.io

[MIT License][MIT]

[MIT]: ./LICENSE "Mit License"
