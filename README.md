# Pluck Yourself

Work-in-progress

## Features

- app server
- GraphQL server
- transpiler that works with Relay
- url routing

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
All rights reserved.  
Pluck Yourself is [Creative Commons License](http://creativecommons.org/licenses/by-nc-nd/3.0/).  
Pluck Yourself was modified from [relayjs/relay-starter-kit](https://github.com/relayjs/relay-starter-kit).  
Relay Starter Kit is [BSD licensed](./LICENSE) and provides an additional [patent grant](./PATENTS).  
