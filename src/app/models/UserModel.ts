export class UserModel {

    constructor(
        public name: string,
        public last_name: string,
        public rut: number,
        public pass: string,
        public type: string
    ) {
    }

}