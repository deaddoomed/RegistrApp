export class UserModel {

    constructor(
        public numrun: number,
        public dvrun: number,
        public first_name: string,
        public second_name: string,
        public p_last_name: string,
        public m_last_name: string,
        public email: string,
        public username: string,
        public id_type: number,
        public password: string,
        public type: string
    ) {
    }

}