import { Component, OnInit, Input, ElementRef, Renderer2 } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: 'app-sidebar-nav-title',
    template: ''
})
export class KlesNavTitleComponent implements OnInit {
    @Input() title: any;

    constructor(private el: ElementRef, private renderer: Renderer2, private translate: TranslateService) { }


    ngOnInit() {
        const nativeElement: HTMLElement = this.el.nativeElement;
        const li = this.renderer.createElement('li');
        let name = this.renderer.createText(this.title.name);
        this.translate.get(this.title.name).subscribe((res: string) => {
            name = this.renderer.createText(res);
        });

        this.renderer.addClass(li, 'nav-title');

        if (this.title.class) {
            const classes = this.title.class;
            this.renderer.addClass(li, classes);
        }

        if (this.title.wrapper) {
            const wrapper = this.renderer.createElement(this.title.wrapper.element);

            this.renderer.appendChild(wrapper, name);
            this.renderer.appendChild(li, wrapper);
        } else {
            this.renderer.appendChild(li, name);
        }
        this.renderer.appendChild(nativeElement, li)
    }
}