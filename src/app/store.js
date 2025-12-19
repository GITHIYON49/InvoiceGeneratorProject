import { configureStore } from "@reduxjs/toolkit";
import invoiceReducer from "../feature/InvoiceSlice";

export const store = configureStore({
  reducer:{
    invoices: invoiceReducer,
  }
});
