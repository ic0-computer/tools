# ic0.computer Tools

## Description

This TypeScript npm package provides a simple avatar generation function. Users can create avatars by providing either a 'principal' or an 'aid'. The avatars are generated in SVG format.

## Installation

Install the package using npm:

```bash
npm install @ic0-computer/tools
```

## Usage

Import the avatar function and use it in your TypeScript or JavaScript project:

```ts
import { avatar } from '@ic0-computer/tools';

// Example with principal
const principalAvatar = avatar({ principal: 'bm3nx-d6h7r-3qyx4-n5vy4-l7vrn-45nr4-ys52j-rjpi4-2lgbt-qvkvr-eqe' });
console.log('Principal Avatar:', principalAvatar);

// Example with aid
const accountIdAvatar = avatar({ aid: 'de243e0e94838b2eb7d58ac9fc4ddb4988665e4360451c51a76bda8a3f7e0b1f' });
console.log('Account ID Avatar:', accountIdAvatar);
```

## Sample Output

![Principal SVG](./sample/principal.svg)
![Account ID SVG](./sample/account-id.svg)

## License

This project is licensed under the Apache License 2.0.
