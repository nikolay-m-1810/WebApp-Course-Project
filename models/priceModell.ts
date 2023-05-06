import { DB } from "../core/db";
import {DepositModel} from "./depositModel";
import {OrderModel} from "./orderModel";
import {log} from "util";

export class PriceModell {
    private conn
    constructor() {
        this.conn = new DB().conn
    }

    async getPrice(crypto_name:string){
        const price = await this.conn.query("SELECT value_usdt FROM prices WHERE crypto_name=?",[crypto_name]);
        return price;
    }
    async getCryptos(){
        const [rows] = await this.conn.query("SELECT * FROM prices");
        return rows;
    }
    async deposit(depositModel:DepositModel) {
        const conn = await this.conn.getConnection();
        try {
            await conn.beginTransaction(); // start transaction
            const [usdt] = await conn.query("SELECT amount FROM wallet_contents WHERE crypto_id=? AND public_address=?", [4, depositModel.public_address]);

            if (usdt.length != 0) { //already have usdt in the account
                await conn.execute("UPDATE wallet_contents SET amount = amount+? WHERE public_address=? AND crypto_id=?", [depositModel.deposit_amount, depositModel.public_address, 4]);
            } else {
                await conn.execute("INSERT INTO wallet_contents (public_address,crypto_id,amount) VALUES (?, ?, ?)", [depositModel.public_address, 4, depositModel.deposit_amount]);
            }

            await conn.commit(); // commit transaction
        } catch (err) {
            await conn.rollback(); // rollback transaction on error
            throw err;
        } finally {
            conn.release(); // release connection
        }
    }
    async buyOrder(order:OrderModel){
        const conn = await this.conn.getConnection();
        try {
            await conn.beginTransaction();
            //from this query we get the price of the crypto and its id
            const [crypto_price] = await this.conn.query("SELECT value_usdt,crypto_id FROM prices WHERE crypto_name = ?",[order.crypto_name])
            //calculating the needed amount of USDT to make the order
            const needed_funds = order.amount*crypto_price[0]["value_usdt"]
            //assigning the crypto id to a variable
            const crypto_id = crypto_price[0]["crypto_id"]
            //this query will give us the amount of USDT that the user has
            const [balance_usdt] = await this.conn.query("SELECT amount FROM wallet_contents WHERE public_address =? AND crypto_id = ?",[order.public_address,4])
            if(balance_usdt.length === 0){
                //if the user doesn't even have USDT
                return false
            }
            if(balance_usdt[0]["amount"] >= needed_funds){
                //You can make the buy order
                const [crypto_owned] = await this.conn.query("SELECT amount FROM wallet_contents WHERE public_address =? AND crypto_id = ?",[order.public_address,crypto_id])
                if(crypto_owned.length!=0){
                    //adding crypto
                    const upd = await this.conn.execute("UPDATE wallet_contents SET amount = amount+? WHERE public_address=? AND crypto_id=?", [order.amount, order.public_address, crypto_id])

                }
                else{
                    //inserting a new row if the user is buying the crypto for the first time
                    const ins = await this.conn.execute("INSERT INTO wallet_contents (public_address,crypto_id,amount) VALUES (?, ?, ?)",[order.public_address,crypto_id,order.amount])
                }
                //Removing USDT
                const rem = await this.conn.execute("UPDATE wallet_contents SET amount = amount-? WHERE public_address=? AND crypto_id=?",[needed_funds,order.public_address,4])
                return true
            }
            else{
                //Not enough funds
                return false
            }
        }catch (err) {
            await conn.rollback(); // rollback transaction on error
            throw err;
        } finally {
            conn.release(); // release connection
        }
    }
}
