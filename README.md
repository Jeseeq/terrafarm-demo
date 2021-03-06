# Terrafarm Demo

This is a demo of the stack used for [terrafarm.herokuapp.com](http://terrafarm.herokuapp.com/).

## Contributing

Anyone is welcome to [contribute](./NOTES/CONTRIBUTING.md), however, if you decide to get involved, please take a moment to review the [guidelines](./NOTES/CONTRIBUTING.md):

[Bug reports](./NOTES/CONTRIBUTING.md#bugs)  
[Feature requests](./NOTES/CONTRIBUTING.md#features)  
[Pull requests](./NOTES/CONTRIBUTING.md#pull-requests)

## Roadmap

Planned and potential features and releases are documented in the [Roadmap](./NOTES/ROADMAP.md).

## Features

- app server with Webpack and Babel
- GraphQL server
- transpiler that works with Relay
- ui libraries:
  - React
  - react-router
  - material-ui
  - react-icons (svg)
- Jest test coverage

## Installation

```
npm install
```

## Running

Start a local server:

```
npm start
```

## Developing

Any changes you make to files in the `js/` directory will cause the server to
automatically rebuild the app and refresh your browser.

If at any time you make changes to files in the `data/` directory, stop the
server, regenerate `data/schema.json`, and restart the server:

```
npm run update-schema
npm start
```

## Database

This app's database is a free [fieldbook](https://fieldbook.com).

## Hosting

This app is ready to be deployed to [Heroku](https://heroku.com).

## License

Copyright (c) 2016, Ryan Blakeley  
[Creative Commons BY-NC-ND 3.0](http://creativecommons.org/licenses/by-nc-nd/3.0/).  
Parts from [Relay Starter Kit](https://github.com/relayjs/relay-starter-kit), which is [BSD licensed](./NOTES/LICENSE) and provides an additional [patent grant](./NOTES/PATENTS).  
Parts from [codrops/PerspectivePageViewNavigation](https://github.com/codrops/PerspectivePageViewNavigation).  
Parts from [codrops/CreativeGooeyEffects](https://github.com/codrops/CreativeGooeyEffects).  
