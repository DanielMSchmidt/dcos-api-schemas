# DC/OS API Schemas

Goal of this project is to host typescript definitions for the types available in DC/OS.
**This project is very alpha, please do not use it**

## State

- [ ] Automatic generation for manually loaded files to both Typescript and GraphQL
  - [x] Allow interfaces
  - [x] Allow key-value maps
  - [x] Allows Unions
  - [x] Allows Enums
  - [ ] Descriptions as (JSDoc) Comments
- [ ] Export user defined type guards for unions like GraphQL does
- [ ] Export of files as npm package
- [ ] Continious Delivery of this package
- [ ] Continous loading of source files, triggering a new publish

## Usage

This is the vision of the usage

### Typescript

```ts
import { MarathonApp, isMarahonApp } from "@dcos/apis";

function isAppHealthy(app: unknown): boolean {
  if (isMarahonApp(app)) {
    // TS knows now that app is a MarahonApp
    return healthState;
  }
}
```

### GraphQL

```js
import schema from "@dcos/apis/outputs/graphql/schema.graphql";
```

## Development

Run `npm run build` and `npm test`
