# components

> These components are used by Routes in `../app` or by other components.

A container does the data fetching for a small part of the application. It can represent a page or a fragment of a page.

A component can have styles for layouting. It should not have styles for visual stuff.

A component is allowed to import the following stuff:
* `components/*`
* `elements/*`

Don't import:
* external styles and components -> wrap the style or component in an element
