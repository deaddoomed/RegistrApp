import { Time } from "@angular/common";

export class ClassModel {

    constructor(
        public cod_class: number,
        public day: string,
        public hour: Time,
        public numrun: number,
        public cod_subject: number
    ) {
    }

}