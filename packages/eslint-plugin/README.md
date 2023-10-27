# eslint-plugin-mas

mas eslint plugin

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-mas`:

```sh
npm install eslint-plugin-mas --save-dev
```

## Usage

Add `mas` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["mas"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "mas/rule-name": 2
  }
}
```

## Rules

<!-- begin auto-generated rules list -->

🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                 | Description                              | 🔧  |
| :----------------------------------- | :--------------------------------------- | :-- |
| [check-nls](docs/rules/check-nls.md) | prevent incorrect use of 'nls.localize'. | 🔧  |

<!-- end auto-generated rules list -->
