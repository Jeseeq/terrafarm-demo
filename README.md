# Pluck Yourself

Work-in-progress

## Features

- app server
- GraphQL server
- transpiler that works with Relay
- URL routing

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

If at any time you make changes to `data/schema.js`, stop the server,
regenerate `data/schema.json`, and restart the server:

```
npm run update-schema
npm start
```

## License

Copyright (c) 2015, Ryan Blakeley  
This project is [Creative Commons License](http://creativecommons.org/licenses/by-nc-nd/3.0/).  
Parts from [Relay Starter Kit](https://github.com/relayjs/relay-starter-kit), which is [BSD licensed](./LICENSE) and provides an additional [patent grant](./PATENTS).  
