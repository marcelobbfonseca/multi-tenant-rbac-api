
export interface UserParams {
    id?: number;
    name: string;
    email: string;
    password?: string;
    confirmPassword?: string;
    superuser: boolean;
};

export class UserEntity {
    public id?: number;
    public name: string;
    public email: string;
    public password?: string;
    public superuser: boolean;

    constructor(userParams : UserParams) {
        const { id, password, name, superuser, email } = userParams;
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.superuser = superuser;
    }
};

