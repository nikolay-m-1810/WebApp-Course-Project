import {Router} from "express";
import {buyOrder, deposit, getCryptos, getPrice} from "../controllers/priceController";

export const priceRouter = Router()

priceRouter.get("/price/:crypto_name",getPrice)
priceRouter.get("/cryptos",getCryptos)
priceRouter.post("/deposit",deposit)
priceRouter.put("/buy",buyOrder)