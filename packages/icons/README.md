<!--header-->

<p align="center">
  <a href="https://rocket.chat" title="Rocket.Chat">
    <img src="https://github.com/RocketChat/Rocket.Chat.Artwork/raw/master/Logos/2020/png/logo-horizontal-red.png" alt="Rocket.Chat" />
  </a>
</p>

# `@rocket.chat/icons`

---

![npm@latest](https://img.shields.io/npm/v/@rocket.chat/icons/latest?style=flat-square) ![npm@next](https://img.shields.io/npm/v/@rocket.chat/icons/next?style=flat-square) ![npm downloads](https://img.shields.io/npm/dw/@rocket.chat/icons?style=flat-square) ![License: MIT](https://img.shields.io/npm/l/@rocket.chat/icons?style=flat-square)

![deps](https://img.shields.io/david/RocketChat/Rocket.Chat.Fuselage?path=packages%2Ficons&style=flat-square) ![peer deps](https://img.shields.io/david/peer/RocketChat/Rocket.Chat.Fuselage?path=packages%2Ficons&style=flat-square) ![dev deps](https://img.shields.io/david/dev/RocketChat/Rocket.Chat.Fuselage?path=packages%2Ficons&style=flat-square) ![npm bundle size](https://img.shields.io/bundlephobia/min/@rocket.chat/icons?style=flat-square)

<!--/header-->

## Install

<!--install-->

Add `@rocket.chat/icons` as a dependency:

```sh
npm i @rocket.chat/icons

# or, if you are using yarn:

yarn add @rocket.chat/icons
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

After building, make sure to run at the root: 

```sh
yarn 

yarn update-storybook
```

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
