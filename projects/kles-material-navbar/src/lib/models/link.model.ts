import { PipeTransform } from "@angular/core";

export interface ILinkModel {
    path: string;
    active?: boolean;
    label: string;
    visible?: boolean;
    pipeTransforms?: {
        pipe: PipeTransform,
        options?: any[]
    }[]
}
