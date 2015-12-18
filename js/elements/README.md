# elements

> The elements are used by `../components` or by other elements.

An element doesn't do any data fetching and expects data pass via `props`. It represents a low-level reuseable component that can be used by different components. An element doesn't have state. An element expects low-level data.

An element brings its own styles. Optionally it can take class names to override styling (theming).

Examples for elements: a drop down list, autocompletion edit box, radio button list.

An element is allowed to import the following stuff:
* `elements/*`
* external styles and components

Don't import:
* `components/*` -> pass a component via `props` instead.
