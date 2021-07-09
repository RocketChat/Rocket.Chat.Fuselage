<!--header-->

<p align="center">
  <a href="https://rocket.chat" title="Rocket.Chat">
    <img src="https://github.com/RocketChat/Rocket.Chat.Artwork/raw/master/Logos/2020/png/logo-horizontal-red.png" alt="Rocket.Chat" />
  </a>
</p>

# `@rocket.chat/onboarding-ui`

> Set of components and functions for the onboarding experience on Rocket.Chat

---

![npm@latest](https://img.shields.io/npm/v/@rocket.chat/onboarding-ui/latest?style=flat-square) ![npm@next](https://img.shields.io/npm/v/@rocket.chat/onboarding-ui/next?style=flat-square) ![react version](https://img.shields.io/npm/dependency-version/@rocket.chat/onboarding-ui/peer/react?style=flat-square) [![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://rocketchat.github.io/Rocket.Chat.Fuselage/onboarding-ui) ![npm downloads](https://img.shields.io/npm/dw/@rocket.chat/onboarding-ui?style=flat-square) ![License: MIT](https://img.shields.io/npm/l/@rocket.chat/onboarding-ui?style=flat-square)

![deps](https://img.shields.io/david/RocketChat/Rocket.Chat.Fuselage?path=packages%2Fonboarding-ui&style=flat-square) ![peer deps](https://img.shields.io/david/peer/RocketChat/Rocket.Chat.Fuselage?path=packages%2Fonboarding-ui&style=flat-square) ![dev deps](https://img.shields.io/david/dev/RocketChat/Rocket.Chat.Fuselage?path=packages%2Fonboarding-ui&style=flat-square) ![npm bundle size](https://img.shields.io/bundlephobia/min/@rocket.chat/onboarding-ui?style=flat-square)

<!--/header-->

## Install

<!--install-->

Firstly, install the peer dependencies (prerequisites):

```sh
npm i @rocket.chat/fuselage-polyfills react react-dom

# or, if you are using yarn:

yarn add @rocket.chat/fuselage-polyfills react react-dom
```

Add `@rocket.chat/onboarding-ui` as a dependency:

```sh
npm i @rocket.chat/onboarding-ui

# or, if you are using yarn:

yarn add @rocket.chat/onboarding-ui
```

<!--/install-->

## Contributing

<!--contributing(msg)-->

Contributions, issues, and feature requests are welcome!<br />
Feel free to check the [issues](https://github.com/RocketChat/Rocket.Chat.Fuselage/issues).

<!--/contributing(msg)-->

### Building

As this package dependends on others in this monorepo, before anything run the following at the root directory:

<!--yarn(build)-->

```sh
yarn build
```

<!--/yarn(build)-->

### Linting

To ensure the source is matching our coding style, we perform [linting](<https://en.wikipedia.org/wiki/Lint_(software)>).
Before commiting, check if your code fits our style by running:

<!--yarn(lint)-->

```sh
yarn lint
```

<!--/yarn(lint)-->

Some linter warnings and errors can be automatically fixed:

<!--yarn(lint-fix)-->

```sh
yarn lint-fix
```

<!--/yarn(lint-fix)-->

### Running tests

Whenever possible, add tests to describe exactly what your code do. You can run them by yourself:

<!--yarn(test)-->

```sh
yarn test
```

<!--/yarn(test)-->
