import { Component, Input } from "@angular/core";
import { KlesNavDropdownComponent, KlesNavItemComponent, KlesNavLinkComponent, KlesNavTitleComponent } from "./nav-item";
import { ILinkModel } from "./models/link.model";
import { IConfig } from "./models/config.model";

@Component({
  selector: 'app-sidebar-nav',
  styles: [
    `mat-toolbar {
        background-color: white;
        -webkit-box-shadow: 0 0px 6px 0px #999;
        -moz-box-shadow: 0 0px 6px 0px #999;
        box-shadow: 0 0px 6px 0px #999;
        position: relative;
        z-index: 1;
        display: flex;
        align-items:center;
        justify-content: space-between;
      }`,
    `.menu{
        flex-grow:1;
        display: flex;
        gap:3px;
      }`,
    `.first {
        display:flex;
        gap:5px;
        align-items:center;
        flex-direction: row;
        padding-right:5px;
      }`,
    `.menu-start {justify-content: flex-start}`,
    `.menu-end {justify-content: flex-end}`,
    `.menu-center {justify-content: center}`,
    `.hide-gt-sm { @media screen and (min-width: 960px) { display: none; } }`,
    `.show-gt-sm { @media screen and (max-width: 960px) { display: none; } }`,
    `.fullsize { height: 100% }`,
    `.active {
            color: var(--primary-color) !important;
        }`
  ],
  template: `
    <mat-toolbar class="toolbar-row" role="heading">
    
        <div class="first">
          @if(config?.navLinks?.length && config.smallMode?.active){
            <button mat-icon-button [mat-menu-trigger-for]="menu" class="hide-gt-sm">
              <mat-icon>{{config?.smallMode?.icon || 'menu' }}</mat-icon>
            </button>
          }
            <ng-content select="[first]"></ng-content>
        </div>

        <div class="menu show-gt-sm" [ngClass]="{'menu-start': config.align === 'start', 'menu-end' : config.align === 'end', 'menu-center' : config.align === 'center', fullsize: config.fullsize }">
            <ng-template ngFor let-navitem [ngForOf]="config?.navLinks || []">
                <li *ngIf="isDivider(navitem)" class="nav-divider"></li>
                <ng-template [ngIf]="isTitle(navitem)">
                    <app-sidebar-nav-title [title]='navitem'></app-sidebar-nav-title>
                </ng-template>
                <ng-template [ngIf]="!isDivider(navitem)&&!isTitle(navitem)">
                    <app-sidebar-nav-item [item]='navitem' [fullsize]="config.fullsize"></app-sidebar-nav-item>
                </ng-template>
            </ng-template>
        </div>

        <div class="last">
            <ng-content select="[last]"></ng-content>
        </div>
        
    </mat-toolbar>

    <mat-menu x-position="before" #menu="matMenu">
      <ng-template ngFor let-navitem [ngForOf]="config?.navLinks || []">
          <button mat-menu-item [routerLink]="[navitem.path]" routerLinkActive="mat-primary active"> 
          {{ navitem.label | translate | titlecase }}
          </button>
      </ng-template>
    </mat-menu>
    `
})
export class KlesNavbarComponent {

  @Input({
    transform: (config: IConfig) => {
      if (!config.smallMode || config.smallMode.active === undefined || config.smallMode.active === null) {
        return { ...config, smallMode: { ...config.smallMode, active: true } };
      }
      return config;
    }
  }) config: IConfig = {};

  public isDivider(item) {
    return item.divider ? true : false;
  }

  public isTitle(item) {
    return item.title ? true : false;
  }
}

export const NAV_COMPONENT = [
  KlesNavbarComponent,
  KlesNavDropdownComponent,
  KlesNavItemComponent,
  KlesNavLinkComponent,
  KlesNavTitleComponent
];
