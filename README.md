# DC/OS API Schemas

Goal of this project is to host typescript definitions for the types available in DC/OS.

## State

- [ ] Automatic generation for manually loaded files to both Typescript and GraphQL
  - [x] Allow interfaces
  - [x] Allow key-value maps
  - [ ] Allows Unions
  - [ ] Allows Enums
  - [ ] Descriptions as (JSDoc) Comments
- [ ] Export user defined type guards for unions like GraphQL does
- [ ] Export of files as npm package
- [ ] Continious Delivery of this package
- [ ] Continous loading of source files, triggering a new publish

## Usage

### Typescript

```ts
import { MarathonApp } from "@dcos/apis";

function isAppHealthy(app: MarathonApp): boolean {
  return false;
}
```

### GraphQL

```js
import schema from "@dcos/apis/outputs/graphql/schema.graphql";
```

## Development

Run `npm run build`
