import {Request, Response} from "express";
import { PriceModell } from "../models/priceModell";
import {DepositModel} from "../models/depositModel";
import { WalletModel } from "../models/WalletModel";

export const getPrice = async (req:Request, res:Response)=>{
    const crypto_name = req.params.crypto_name
    const priceModel = new PriceModell();
    const price = await priceModel.getPrice(crypto_name);
    res.send(price);
}
export const getCryptos = async (req:Request, res:Response)=>{
    const cryptos = await new PriceModell().getCryptos()
    res.send(cryptos);
}
export const deposit = async (req:Request,res:Response)=>{
    const inputData:DepositModel = req.body
    const dep = new PriceModell().deposit(inputData)
    res.send({
        "message":"Successful deposit"
    })
}
export const getWalletDetails= async(req:Request,res:Response)=>{
    const public_address= req.query.public_address;
    if (typeof public_address !== 'string') {
        res.status(400).send('public_address parameter must be a string');
        return;
      }
    const walletRes = await new WalletModel().getWalletDetails(public_address)
    res.send(walletRes);
}