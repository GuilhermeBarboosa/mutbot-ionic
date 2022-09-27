export interface RegisterRequest {
    userName: string;
    name: string;
    tel: string;
    email: string;
    term?: boolean;
    password: string;
    confirmSenha: string;
}