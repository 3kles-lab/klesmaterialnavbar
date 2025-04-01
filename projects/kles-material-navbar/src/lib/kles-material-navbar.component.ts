import { AfterViewInit, Component, ElementRef, Input, viewChild } from "@angular/core";
import { KlesNavDropdownComponent, KlesNavItemComponent, KlesNavLinkComponent, KlesNavTitleComponent } from "./nav-item";
import { IConfig } from "./models/config.model";
import { fromEvent } from "rxjs";
import { startWith } from "rxjs/operators";

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
        display: flex;
        align-items:center;
        justify-content: space-between;
        padding: 0;
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
    `.last {
        display: flex;
        gap: 5px;
        align-items: center;
        flex-direction: row;
        padding-left: 5px;
      }`,
    `.toolbar {
      display: flex;
      flex: 1 1 auto;
      height: 100%;
      padding: 0 16px;
      justify-content: space-between;
    }`,
    `.menu-start {justify-content: flex-start}`,
    `.menu-end {justify-content: flex-end}`,
    `.menu-center {justify-content: center}`,
    `.hide-gt-sm { display: var(--button-menu-display) }`,
    `.show-gt-sm { display: var(--menu-display) }`,
    `.fullsize { height: 100% }`,
    `.active {
            color: var(--primary-color) !important;
        }`
  ],
  template: `
  <div #allbar>
    <mat-toolbar class="toolbar-row" role="heading">
      <div #toolbar class="toolbar">
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
                @if(navitem.visible){
                  @if(isDivider(navitem)){
                    <li class="nav-divider"></li>
                  } @else if (isTitle(navitem)){
                    <app-sidebar-nav-title [title]='navitem'></app-sidebar-nav-title>
                  } @else{
                    <app-sidebar-nav-item [item]='navitem' [fullsize]="config.fullsize"></app-sidebar-nav-item>
                  }
                }
                
            </ng-template>
        </div>

        <div class="last">
            <ng-content select="[last]"></ng-content>
        </div>
      </div>
    </mat-toolbar>
  </div>

    <mat-menu x-position="before" #menu="matMenu">
      <ng-template ngFor let-navitem [ngForOf]="config?.navLinks || []">
          <button mat-menu-item [routerLink]="[navitem.path]" routerLinkActive="mat-primary active"> 
          {{ navitem.label | translate | titlecase }}
          </button>
      </ng-template>
    </mat-menu>
    `
})
export class KlesNavbarComponent implements AfterViewInit {
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

  allbar = viewChild<ElementRef<HTMLElement>>('allbar');
  toolbar = viewChild<ElementRef<HTMLElement>>('toolbar');

  minToolbarWidth: number;

  public isDivider(item) {
    return item.divider ? true : false;
  }

  public isTitle(item) {
    return item.title ? true : false;
  }

  ngAfterViewInit() {
    this.toolbar().nativeElement.style.setProperty('--menu-display', 'flex');
    this.toolbar().nativeElement.style.setProperty('--button-menu-display', 'none');

    this.minToolbarWidth = this.toolbar().nativeElement.clientWidth;

    fromEvent(
      window,
      'resize'
    ).pipe(
      startWith({})
    ).subscribe(() => this.checkOverflow());
  }

  checkOverflow(): void {
    const allbar: HTMLElement = this.allbar().nativeElement;
    const toolbar: HTMLElement = this.toolbar().nativeElement;

    if (toolbar.clientWidth < this.minToolbarWidth && toolbar.style.getPropertyValue('--menu-display') !== 'none') {
      this.minToolbarWidth = toolbar.clientWidth;
    }

    if (allbar.clientWidth < this.minToolbarWidth && toolbar.style.getPropertyValue('--menu-display') !== 'none') {
      toolbar.style.setProperty('--menu-display', 'none');
      toolbar.style.setProperty('--button-menu-display', 'block');
    }
    else if (allbar.clientWidth >= this.minToolbarWidth && toolbar.style.getPropertyValue('--menu-display') !== 'flex') {
      toolbar.style.setProperty('--menu-display', 'flex');
      toolbar.style.setProperty('--button-menu-display', 'none');
    }
  }
}

export const NAV_COMPONENT = [
  KlesNavbarComponent,
  KlesNavDropdownComponent,
  KlesNavItemComponent,
  KlesNavLinkComponent,
  KlesNavTitleComponent
];
