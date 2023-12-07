# Interfaces

- [`ILinkModel`](#ilinkmodel): Header link interface

#### ILinkModel

Interface ILinkModel

- path: string: Path for link
- active?: boolean: Activate link
- label: string: Label link
- visible?: boolean: Link is visible

##### File

```typescript
import { ILinkModel } from 'kles-material-navbar';
```

##### Usage

```javascript
const navLinks=[
  {
  path: '/user',
  active: true,
  label: 'test',
  visible:true
} as ILinkModel
]
```

```html
<kles-material-navbar [title]="title" [navLinks]="navLinks"></kles-material-navbar>
```
