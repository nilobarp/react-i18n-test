## Run locally

`yarn install`
`yarn devserver`

## Languages

Supported languages en (default), en-AU, de, fr, ar

To change language, add ?lang=de to url or change browser settings. The first supported language
from the list will be used for translation.

> Query parameter has precedence over browser settings

## Goals

1.  Default messages are defined in external files not in JSX. This enables easier integration with translation services.
2.  Partition locale files per component.
3.  Variable interpolation.
4.  Plural form support in translated and default messages. `react-intl-universal` doesn't support variables in default messages.
