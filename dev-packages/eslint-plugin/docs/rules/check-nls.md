# Prevent incorrect use of 'nls.localize' (`mas/check-nls`)

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

This rule checks for incorrect use of `nls.localize` function.

The following patterns are considered problems:

## Options

### importType

The type of import to check for. Can be either `default` or `named`. If not specified, `default` is used.

## Config

```json
{
  "mas/check-nls": [
    "error",
    {
      "importType": "default"
    }
  ]
}
```

## When Not To Use It

If you don't use `nls.localize` function with `@mas/i18n`, you can disable this rule.
