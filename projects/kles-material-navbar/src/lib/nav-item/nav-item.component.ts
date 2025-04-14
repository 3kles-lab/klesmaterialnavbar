import { NgClass } from "@angular/common";
import { Component, Input, OnDestroy, OnInit, signal } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Subject } from "rxjs";
import { filter, map, takeUntil } from "rxjs/operators";

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
      `,
    styles: [`:host{display: flex; align-items: center;}`]
})
export class KlesNavItemComponent implements OnInit, OnDestroy {
    @Input() item: any;
    @Input() fullsize?: boolean;

    isActive = signal<boolean>(false);

    private _onDestroy = new Subject<void>();

    public hasClass() {
        return this.item.class ? true : false
    }

    public isDropdown() {
        return this.item.children ? true : false
    }

    public thisUrl() {
        return this.item.path;
    }

    constructor(private router: Router) { }

    ngOnInit(): void {

        this.isActive.set(this.router.isActive(this.item.path,
            { fragment: "ignored", matrixParams: "ignored", paths: "exact", queryParams: "ignored" }));

        this.router.events.pipe(
            takeUntil(this._onDestroy),
            filter(event => event instanceof NavigationEnd),
            map(() => this.router.isActive(this.item.path,
                { fragment: "ignored", matrixParams: "ignored", paths: "exact", queryParams: "ignored" }))
        ).subscribe((isActive) => this.isActive.set(isActive));
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

}