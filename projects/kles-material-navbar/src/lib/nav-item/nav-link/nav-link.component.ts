import { NgClass } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-sidebar-nav-link',
    styleUrl: './nav-link.component.scss',
    template: `
        <button *ngIf="!isExternalLink(); else external" mat-button [routerLink]="[link.path]" routerLinkActive="mat-primary active " [ngClass]="{fullsize}"> 
        {{ link.label | translate | titlecase }}</button>
        <ng-template #external>
            <a mat-button href="{{link.path}}">
                {{ link.label | translate | titlecase }}
            </a>
        </ng-template>
    `
})
export class KlesNavLinkComponent {
    @Input() link: any;
    @Input() fullsize: boolean;

    public hasVariant() {
        return this.link.variant ? true : false
    }

    public isBadge() {
        return this.link.badge ? true : false
    }

    public isExternalLink() {
        return this.link.path.substring(0, 4) === 'http' ? true : false
    }

    public isIcon() {
        return this.link.icon ? true : false
    }

    public hideMobile() {
        if (document.body.classList.contains('sidebar-mobile-show')) {
            document.body.classList.toggle('sidebar-mobile-show')
        }
    }

    constructor() { }
}