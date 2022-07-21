import { Injectable } from "@nestjs/common";

@Injectable({})

export class AuthService{
    singup() {
        return { msg: "You are signed up" }
    }

    singin() {
        return { msg: "You are signed in" }
    }
}
