# DC/OS Typescript Types

Goal of this project is to host typescript definitions for the types available in DC/OS.

## State

- [ ] Automatic generation for manually loaded files
  - [x] Allow interfaces
  - [x] Allow key-value maps
  - [ ] Allows Unions
  - [ ] Allows Enums
- [ ] Generate descriptions as JSDoc
- [ ] Export user defined type guards for unions like GraphQL does
- [ ] Export of files as npm package
- [ ] Continious Delivery of this package
- [ ] Continous loading of source files, triggering a new publish

## Usage

```ts
import { MarathonApp } from "@dcos/types";

function isAppHealthy(app: MarathonApp): boolean {
  return false;
}
```

## Development

Run `npm run build`
