import {Router} from "express";
import {deposit, getCryptos, getPrice, getWalletDetails} from "../controllers/priceController";

export const priceRouter = Router()

priceRouter.get("/price/:crypto_name",getPrice)
priceRouter.get("/cryptos",getCryptos)
priceRouter.post("/deposit",deposit)
priceRouter.get("/getWallet",getWalletDetails)