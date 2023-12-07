import { AfterViewInit, Component, OnInit, ViewEncapsulation } from "@angular/core";
import { IConfig } from "projects/kles-material-navbar/src/public-api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit {

  nav = [
    {
      label: 'app.navbar.launch.title',
      path: '/material/launch',
    },
    {
      label: 'app.navbar.history.title',
      path: '/material/history',

    },
    {
      label: 'app.navbar.settings.title',
      path: '/material/settings',
    }
  ];

  config: IConfig = {
    navLinks: this.nav,
    fullsize: true,
    smallMode: {
      active: true,
      // icon:'add'
    }
  }


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }
}
