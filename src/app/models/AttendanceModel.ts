export class AttendanceModel {

    constructor(
        public date: Date,
        public state: number,
        public numrun: number,
        public cod_subject: number
    ) {
    }

}