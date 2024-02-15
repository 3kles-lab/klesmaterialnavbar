<!--[![pipeline status](http://gitlab.3kles.local/angular/klesmaterialheader/badges/master/pipeline.svg)](http://gitlab.3kles.local/angular/klesmaterialheader/-/commits/master)-->

# @3kles/kles-material-navbar

**kles-material-navbar** is a component library to build a navbar.

## Changelog

Check out the [changelog](./CHANGELOG.md) to check all the latest changes.

## Models

### Interfaces

#### ILinkModel

Interface to define nav links

- <b>path</b>: string -> Redirect path
- <b>active?</b>: boolean -> Set if nav link is active
- <b>label</b>: string -> Label of the nav link
- <b>visible?</b>: boolean -> Set if the nav link is visible

#### IConfig

Interface to define the config of the navbar

- <b>navLinks?</b>: ILinkModel[] -> Nav links config
- <b>align?</b>: 'center' | 'start' | 'end' -> Set where is align the nav links
- <b>smallMode?</b>: {
        active?: boolean,
        icon?: string
    } -> Set options if the width is small
- <b>fullsize?</b>: boolean -> Set if the nav bar is in full size

### Components

- <b>KlesNavDropdownComponent</b> -> Component to drop and down a nav item
- <b>KlesNavLinkComponent</b> -> Component to represent the link of a nav item
- <b>KlesNavTitleComponent</b> -> Component to represent the title of a nav item
- <b>KlesNavItemComponent</b> -> Component that represents a nav item of the navbar
- <b>KlesNavbarComponent</b> -> Component to create a navbar

## Install

### npm

```
npm install @3kles/kles-material-navbar --save
```

## How to use

In the module
```javascript
import { KlesMaterialNavbarModule } from '@3kles/kles-material-navbar';
...
@NgModule({
    imports: [
        KlesMaterialNavbarModule,
        ...
    ]
    ...
})
```

Check the [`documentation`](https://doc.3kles-consulting.com) to use component and directive.

## Tests

```
npm install
npm test
```
## License

[`MIT`](./LICENSE.md)
