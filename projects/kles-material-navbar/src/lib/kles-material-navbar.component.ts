import { Component, Input } from "@angular/core";
import { KlesNavDropdownComponent, KlesNavItemComponent, KlesNavLinkComponent, KlesNavTitleComponent } from "./nav-item";
import { IConfig } from "./models/config.model";

@Component({
  selector: 'kles-navbar',
  styles: [
    `mat-toolbar {
        background-color: white;
        -webkit-box-shadow: 0 0px 6px 0px #999;
        -moz-box-shadow: 0 0px 6px 0px #999;
        box-shadow: 0 0px 6px 0px #999;
        position: relative;
        z-index: 1;
        overflow: hidden;
        display: grid;
        grid-template-columns: minmax(0, auto) 1fr minmax(0, auto);
      }`,
    `.menu{
        flex-grow: 1;
        display:flex;
        width: 100%;
      }`,
    `.first {
        display:flex;
        gap:5px;
        align-items:center;
        flex-direction: row;
        padding-right:5px;
      }`,
      
      `.last {
        display: flex;
        justify-content: end;
      }`,
    `.menu-start {justify-content: flex-start}`,
    `.menu-end {justify-content: flex-end}`,
    `.menu-center {justify-content: center}`,
    `.hide-gt-sm { @media screen and (min-width: 960px) { display: none; } }`,
    `.show-gt-sm { @media screen and (max-width: 960px) { visibility: hidden; } }`,
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

          <nav mat-tab-nav-bar [mat-stretch-tabs]="config?.fullsize || false"
          class=" show-gt-sm" [tabPanel]="tabPanel">
            <div class="menu" [ngClass]="{'menu-start': config.align === 'start', 'menu-end' : config.align === 'end', 'menu-center' : config.align === 'center', fullsize: config.fullsize }">
              <ng-template ngFor let-navitem [ngForOf]="config?.navLinks || []">
                @if(navitem.visible){
                  @if(isDivider(navitem)){
                    <li class="nav-divider"></li>
                  } @else if (isTitle(navitem)){
                    <app-sidebar-nav-title [title]='navitem'></app-sidebar-nav-title>
                  } @else {
                    <app-sidebar-nav-item [item]='navitem' [fullsize]="config.fullsize"></app-sidebar-nav-item>
                  }
                }
              </ng-template>

            </div>
            
          </nav>

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

    <mat-tab-nav-panel #tabPanel></mat-tab-nav-panel>
    `
})
export class KlesNavbarComponent {

  @Input({
    transform: (config: IConfig) => {
      const navLinks = config.navLinks
        .map((link) => ({ ...link, visible: link.visible === undefined ? true : link.visible }));
      if (!config.smallMode || config.smallMode.active === undefined || config.smallMode.active === null) {
        return {
          ...config,
          navLinks,
          smallMode: { ...config.smallMode, active: true }
        };
      }
      return { ...config, navLinks };
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


// <nav mat-tab-nav-bar class="menu show-gt-sm" [ngClass]="{'menu-start': config.align === 'start', 'menu-end' : config.align === 'end', 'menu-center' : config.align === 'center', fullsize: config.fullsize }">
//             <ng-template ngFor let-navitem [ngForOf]="config?.navLinks || []">
//                 @if(navitem.visible){
//                   @if(isDivider(navitem)){
//                     <li class="nav-divider"></li>
//                   } @else if (isTitle(navitem)){
//                     <app-sidebar-nav-title [title]='navitem'></app-sidebar-nav-title>
//                   } @else{
//                     <app-sidebar-nav-item [item]='navitem' [fullsize]="config.fullsize"></app-sidebar-nav-item>
//                   }
//                 }
                
//             </ng-template>
//         </nav>