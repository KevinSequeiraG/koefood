import { ORDERSTATE } from "@prisma/client"
import { PAYMENTTYPE } from "@prisma/client"
export const order = [
    {
        subTotal: 10000,
        iva: 1300,
        clientPaymentInCash: 0,
        clientPaymentInCard: 11300,
        orderTotal: 11300,
        idUser: 208850224,
        idWaiter: 105820157,
        idRestaurant: 1,
        idTable: 1,
        state: ORDERSTATE.REGISTERED,
        paymentOption: PAYMENTTYPE.CARD
    },
    {
        subTotal: 16950,
        iva: 1950,
        clientPaymentInCash: 0,
        clientPaymentInCard: 10400,
        orderTotal: 16950,
        idUser: 203660124,
        idWaiter: 10659851,
        idRestaurant: 1,
        idTable: 2,
        state: ORDERSTATE.TOPAY,
        paymentOption: PAYMENTTYPE.CARD
    },
    {
        subTotal: 42500,
        iva: 5525,
        clientPaymentInCash: 0,
        clientPaymentInCard: 50525,
        orderTotal: 50525,
        idUser: 208150797,
        idWaiter: 10959856,
        idRestaurant: 2,
        idTable: 7,
        state: ORDERSTATE.REGISTERED,
        paymentOption: PAYMENTTYPE.CARD
    },
    {
        subTotal: 32000,
        iva: 4160,
        clientPaymentInCash: 36160,
        clientPaymentInCard: 0,
        orderTotal: 36160,
        idUser: 208150797,
        idWaiter: 10959856,
        idRestaurant: 3,
        idTable: 13,
        state: ORDERSTATE.REGISTERED,
        paymentOption: PAYMENTTYPE.CASH
    },
]