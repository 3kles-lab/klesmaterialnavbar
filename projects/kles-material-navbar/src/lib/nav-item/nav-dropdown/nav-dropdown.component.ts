import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-sidebar-nav-dropdown',
    template: `
      <a class="nav-link nav-dropdown-toggle" appNavDropdownToggle>
        <i *ngIf="isIcon()" class="{{ link.icon }}"></i>
        {{ link.name | translate | titlecase}}
        <span *ngIf="isBadge()" [ngClass]="'badge badge-' + link.badge.variant">{{ link.badge.text }}</span>
      </a>
      <ul class="nav-dropdown-items">
        <ng-template ngFor let-child [ngForOf]="link.children">
          <app-sidebar-nav-item [item]='child'></app-sidebar-nav-item>
        </ng-template>
      </ul>
    `
})
export class KlesNavDropdownComponent {
    @Input() link: any;

    public isBadge() {
        return this.link.badge ? true : false
    }

    public isIcon() {
        return this.link.icon ? true : false
    }

    constructor() { }
}
