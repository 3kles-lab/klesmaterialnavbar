import { NgClass } from "@angular/common";
import { ILinkModel } from "./link.model";

export interface IConfig {
    navLinks?: ILinkModel[],
    align?: 'center' | 'start' | 'end';
    smallMode?: {
        active?: boolean,
        icon?: string
    }
    fullsize?: boolean;
}
