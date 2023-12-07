import { NgClass } from "@angular/common";
import { Component, Input, OnInit, signal } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter, map } from "rxjs/operators";

@Component({
    selector: 'app-sidebar-nav-item',
    template: `
        <app-sidebar-nav-link *ngIf="!isDropdown(); else dropdown" [link]='item' [fullsize]="fullsize"></app-sidebar-nav-link>
        <ng-template #dropdown>
            <li [ngClass]="hasClass() ? 'nav-item nav-dropdown ' + item.class : 'nav-item nav-dropdown'"
                [class.open]="isActive()"
                routerLinkActive="open"
                appNavDropdown>
            <app-sidebar-nav-dropdown [link]='item'></app-sidebar-nav-dropdown>
            </li>
        </ng-template>
      `
})
export class KlesNavItemComponent implements OnInit {
    @Input() item: any;
    @Input() fullsize?: boolean;

    isActive = signal<boolean>(false);

    public hasClass() {
        return this.item.class ? true : false
    }

    public isDropdown() {
        return this.item.children ? true : false
    }

    public thisUrl() {
        return this.item.path
    }

    constructor(private router: Router) { }

    ngOnInit(): void {

        this.isActive.set(this.router.isActive(this.item.path,
            { fragment: "ignored", matrixParams: "ignored", paths: "exact", queryParams: "ignored" }));

        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(() => this.router.isActive(this.item.path,
                { fragment: "ignored", matrixParams: "ignored", paths: "exact", queryParams: "ignored" }))
        ).subscribe((isActive) => this.isActive.set(isActive));
    }

}