import { createSlice } from "@reduxjs/toolkit";
import { addDays, format } from "date-fns";
import { Satellite } from "lucide-react";

const localState = () => {
  try {
    const sterlizeSate = localStorage.getItem("state");
    if (sterlizeSate === null) {
      return {
        invoices: [],
        filter: "all",
        isFormOpen: false,
        selectedInvoice: null,
      };
    }
    return JSON.parse(sterlizeSate);
  } catch (err) {
    return {
      invoices: [],
      filter: "all",
      isFormOpen: false,
      selectedInvoice: null,
    };
  }
};

const initialState = localState();

const saveState = (state) => {
  try {
    const sterlizeSate = JSON.stringify(state);
    localStorage.setItem("state", sterlizeSate);
  } catch (err) {
    console.log(err);
  }
};

const calculateAmount = (items) => {
  return items.reduce((acc, crr) => {
    return acc + crr.quantity * crr.price;
  }, 0);
};

const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    addInvoice: (state, actions) => {
      const newInvoice = {
        ...actions.payload,
        dueDate:
          actions.payload.dueDate ||
          format(addDays(new Date(), 30), "yyyy-MM-dd"),
        amount: calculateAmount(actions.payload.items),
        status: actions.payload.status || "pending",
      };

      state.invoices.push(newInvoice);
      saveState(state);
      state.isFormOpen = false;
    },
    filterStatus: (state, actions) => {
      state.filter = actions.payload;
    },
    toogle: (state) => {
      state.isFormOpen = !state.isFormOpen;
    },
    selectedInvoiceList: (state, actions) => {
      state.selectedInvoice = actions.payload;
      state.isFormOpen = false;
    },
    markAsPaid: (state, actions) => {
      const updateStatus = state.invoices.find(
        (inv) => inv.id === actions.payload
      );
      if (updateStatus) {
        updateStatus.status = "paid";
        state.isFormOpen = false;
        state.selectedInvoice = null;
      }
      saveState(state);
    },
    deleteInvoice: (state, actions) => {
      state.invoices = state.invoices.filter(
        (inv) => inv.id !== actions.payload
      );
      state.selectedInvoice = null;
      state.isFormOpen = false;
      saveState(state);
    },
    editInvoice: (state, actions) => {
      const updateInvoice = {
        ...actions.payload,
        amount: calculateAmount(actions.payload.items),
      };

      const index = state.invoices.findIndex(
        (inv) => inv.id === updateInvoice.id
      );

      if (index !== -1) {
        state.invoices[index] = updateInvoice;
        state.selectedInvoice = null;
      }

      saveState(state);
    },
  },
});

export const {
  toogle,
  addInvoice,
  filterStatus,
  selectedInvoiceList,
  markAsPaid,
  deleteInvoice,
  editInvoice
} = invoiceSlice.actions;
export default invoiceSlice.reducer;
