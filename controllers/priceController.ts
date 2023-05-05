import {Request, Response} from "express";
import { PriceModell } from "../models/priceModell";
import {DepositModel} from "../models/depositModel";

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