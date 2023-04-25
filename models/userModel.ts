import {DB} from "../core/db";
import {log} from "util";
import {UserData,loginData} from "./userDataModel";

export class User{
    id?:number;
    username:string;
    password:string;
    wallet_id?:number;
    email:string;
    constructor(username:string, password:string,wallet_id:number, email:string) {
        this.username = username;
        this.password = password;
        this.wallet_id = wallet_id;
        this.email = email;
    }
}
export class UserModel{
    private conn
    constructor() {
        this.conn = new DB().conn
    }
    async getUsers(){
        const [rows] = await this.conn.query("SELECT * FROM users");
        return rows;
    }
    async getUser(id:number){
        const [row] = await this.conn.query("SELECT * FROM users WHERE user_id = ?", [id])
        return row
    }
    async deleteUser(id:number){
        await this.conn.query("DELETE FROM users WHERE user_id = ?",[id])
    }
    async insertUser(newusr:User){
        const newusrParams = [
            newusr.username,
            newusr.password,
            newusr.wallet_id,
            newusr.email
        ]
        await this.conn.execute("INSERT INTO users (username,password,wallet_id,email) VALUE(?,?,?,?)",newusrParams);
    }
    async updateUser(id:number, user:UserData){
        const userDataInput = Object.entries(user)
        let parameters = "";
        let values = []
        for(let i = 0; i<userDataInput.length; i++){
            parameters+=`${userDataInput[i][0]} = ?`;
            parameters+= (i +1 != userDataInput.length) ? ", " : " ";
            values.push(userDataInput[i][1]);
        }
        values.push(id)
        await this.conn.execute(`UPDATE users SET ${parameters} WHERE user_id = ?`,values);
    }
    async login(loginD:loginData){
        const loginCredentials = [
            loginD.username,
            loginD.password
        ]
        const [result]  = await this.conn.query("SELECT * FROM users WHERE username = ? AND password =?",loginCredentials)
        if(result.length != 0){
            return "User exists"
        }
        else{
            return "Wrong credentials"
        }
    }
}
