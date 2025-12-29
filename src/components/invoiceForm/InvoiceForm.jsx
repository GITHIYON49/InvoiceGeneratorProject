import { useEffect, useState } from "react";
import { X, Trash2, Plus, IndianRupee } from "lucide-react";
import { useDispatch } from "react-redux";
import { customAlphabet } from "nanoid";
import { toogle, addInvoice, editInvoice } from "../../feature/InvoiceSlice";
import { addDays, format } from "date-fns";

function InvoiceForm({ invoice }) {
  const dispatch = useDispatch();

  const gentrateId = customAlphabet("123456789", 7);

  const [formData, setFormData] = useState(() => {
    if (invoice) {
      return {
        ...invoice,
      };
    }
    return {
      id: gentrateId(),
      status: "pending",
      billFrom: {
        streetAddress: "",
        city: "",
        postCode: "",
        country: "",
      },
      billTo: {
        clientEmail: "",
        streetAddress: "",
        city: "",
        postCode: "",
        country: "",
      },
      clientName: "",
      items: [],
      paymentsTerms: "Net 30 Days",
      projectDescription: "",
      invoiceDate: format(new Date(), "yyyy-MM-dd"),
      dueDate: format(addDays(new Date(), 30), "yyyy-MM-dd"),
      amount: 0,
    };
  });

  useEffect(() => {
    if (invoice) {
      setFormData(invoice);
    }
  }, [invoice]);

  const addItems = () => {
    const newItem = [
      ...formData.items,
      { name: "", quantity: 0, price: 0, total: 0 },
    ];
    setFormData({ ...formData, items: newItem });
  };

  const updateItem = (index, field, value) => {
    const newItem = [...formData.items];

    newItem[index][field] = value;

    if (field === "quantity" || field === "price") {
      const qty = field === "quantity" ? value : newItem[index].quantity;
      const price = field === "price" ? value : newItem[index].price;

      newItem[index].total = qty * price;
    }

    setFormData({ ...formData, items: newItem });
  };

  const removeItem = (index) => {
    const newItems = [...formData.items];

    const data = newItems.filter((_, i) => i !== index);

    setFormData({ ...formData, items: data });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (invoice) {
      dispatch(editInvoice(formData));
      dispatch(toogle());
    } else {
      dispatch(addInvoice(formData));
    }
  };

  const handleCloseForm = () => {
    dispatch(toogle());
  };
  return (
    <>
      <div className="fixed inset-0  bg-black/50 flex items-start justify-center overflow-y-scroll p-4 sm:py-10">
        <div className="w-full sm:w-4/5 md:w-3/5 lg:w-2/5 flex flex-col items-center bg-teal-800 gap-7 p-3 md:p-7 rounded-lg">
          <div className="w-full text-white flex items-center justify-between">
            <h2 className="text-xl lg:text-2xl font-bold capitalize">
              new invoice
            </h2>
            <button
              className="border-none outline-none w-fit"
              onClick={handleCloseForm}
            >
              <X className="size-5 lg:size-7 cursor-pointer active:scale-105 hover:text-slate-200 transition-all duration-200 ease-in-out" />
            </button>
          </div>
          <form
            action="
          "
            className="w-full space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="space-y-6 text-sm md:text-base">
              <div className="w-full space-y-4">
                <h3 className="text-base md:text-lg capitalize font-semibold  text-teal-300 ">
                  bill from
                </h3>
                <input
                  type="text"
                  placeholder="Street Address"
                  className="w-full bg-teal-900 py-3 px-5 placeholder:text-slate-400 border-none outline-none text-white rounded-md"
                  value={formData.billFrom.streetAddress}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      billFrom: {
                        ...formData.billFrom,
                        streetAddress: e.target.value,
                      },
                    })
                  }
                  required
                />
              </div>
              <div className="w-full grid grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="City"
                  className="w-full bg-teal-900 py-3 px-5 placeholder:text-slate-400 border-none outline-none text-white rounded-md"
                  value={formData.billFrom.city}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      billFrom: { ...formData.billFrom, city: e.target.value },
                    })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Post Code"
                  className="w-full bg-teal-900 py-3 px-5 placeholder:text-slate-400 border-none outline-none text-white rounded-md"
                  value={formData.billFrom.postCode}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      billFrom: {
                        ...formData.billFrom,
                        postCode: e.target.value,
                      },
                    })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Country"
                  className="w-full bg-teal-900 py-3 px-5 placeholder:text-slate-400 border-none outline-none text-white rounded-md"
                  value={formData.billFrom.country}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      billFrom: {
                        ...formData.billFrom,
                        country: e.target.value,
                      },
                    })
                  }
                  required
                />
              </div>
            </div>
            <div className="space-y-6 text-sm md:text-base">
              <div className="w-full space-y-4">
                <h3 className="text-base md:text-lg capitalize font-semibold  text-teal-300 ">
                  bill to
                </h3>
                <div className="space-y-6">
                  <input
                    type="text"
                    placeholder="Client Name"
                    className="w-full bg-teal-900 py-3 px-5 placeholder:text-slate-400 border-none outline-none text-white rounded-md"
                    value={formData.clientName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        clientName: e.target.value,
                      })
                    }
                    required
                  />
                  <input
                    type="email"
                    placeholder="Client Email"
                    className="w-full bg-teal-900 py-3 px-5 placeholder:text-slate-400 border-none outline-none text-white rounded-md"
                    value={formData.billTo.clientEmail}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        billTo: {
                          ...formData.billTo,
                          clientEmail: e.target.value,
                        },
                      })
                    }
                    required
                  />
                  <input
                    type="text"
                    placeholder="Street Address"
                    className="w-full bg-teal-900 py-3 px-5 placeholder:text-slate-400 border-none outline-none text-white rounded-md"
                    value={formData.billTo.streetAddress}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        billTo: {
                          ...formData.billTo,
                          streetAddress: e.target.value,
                        },
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="w-full grid grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="City"
                  className="w-full bg-teal-900 py-3 px-5 placeholder:text-slate-400 border-none outline-none text-white rounded-md"
                  value={formData.billTo.city}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      billTo: { ...formData.billTo, city: e.target.value },
                    })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Post Code"
                  className="w-full bg-teal-900 py-3 px-5 placeholder:text-slate-400 border-none outline-none text-white rounded-md"
                  value={formData.billTo.postCode}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      billTo: { ...formData.billTo, postCode: e.target.value },
                    })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Country"
                  className="w-full bg-teal-900 py-3 px-5 placeholder:text-slate-400 border-none outline-none text-white rounded-md"
                  value={formData.billTo.country}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      billTo: { ...formData.billTo, country: e.target.value },
                    })
                  }
                  required
                />
              </div>
              <div className="w-full flex gap-3">
                <input
                  type="date"
                  className="w-full bg-teal-900 py-3 px-5 placeholder:text-slate-400 border-none outline-none text-white rounded-md"
                  value={formData.invoiceDate}
                  onChange={(e) =>
                    setFormData({ ...formData, invoiceDate: e.target.value })
                  }
                />
                <select
                  name=""
                  id=""
                  className="w-full bg-teal-900 py-3 px-5 placeholder:text-slate-400 border-none outline-none text-white rounded-md"
                  value={formData.paymentsTerms}
                  onChange={(e) =>
                    setFormData({ ...formData, paymentsTerms: e.target.value })
                  }
                >
                  <option>Net 30 Days</option>
                  <option>Net 60 Days</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="Project Description"
                className="w-full bg-teal-900 py-3 px-5 placeholder:text-slate-400 border-none outline-none text-white rounded-md"
                value={formData.projectDescription}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    projectDescription: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg capitalize font-semibold  text-white ">
                  Iteam List
                </h3>
                {formData?.items?.map((item, index) => {
                  return (
                    <div
                      className="grid grid-cols-9 text-sm md:text-base gap-2"
                      key={index}
                    >
                      <input
                        type="text"
                        placeholder="Iteam Name"
                        className="col-span-4 bg-teal-900 py-2 px-3.5 md:py-3 md:px-5 placeholder:text-slate-400 border-none outline-none text-white rounded-md"
                        value={item.name}
                        onChange={(e) =>
                          updateItem(index, "name", e.target.value)
                        }
                        required
                      />
                      <div className="col-span-3 grid grid-cols-2 gap-2">
                        <input
                          type="number"
                          placeholder="Quantity"
                          step="1"
                          min="1"
                          className=" bg-teal-900 py-2 px-3.5 md:py-3 md:px-5 placeholder:text-slate-400 border-none outline-none text-white rounded-md"
                          value={item.quantity}
                          required
                          onChange={(e) =>
                            updateItem(
                              index,
                              "quantity",
                              parseInt(e.target.value) || 0
                            )
                          }
                        />
                        <input
                          type="number"
                          placeholder="Price"
                          step="1"
                          min="0"
                          className="bg-teal-900 py-2 px-3.5 md:py-3 md:px-5 placeholder:text-slate-400 border-none outline-none text-white rounded-md"
                          value={item.price}
                          onChange={(e) =>
                            updateItem(
                              index,
                              "price",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          required
                        />
                      </div>
                      <div className="col-span-2 flex items-center justify-between gap-1">
                        <span className="capitalize font-semibold text-white text-sm md:text-base flex items-center justify-center">
                          <IndianRupee className="size-4" />
                          {item.total.toFixed(2)}
                        </span>
                        <button
                          type="button"
                          className="w-fit border-none outline-none text-slate-400 cursor-pointer hover:text-red-400 active:scale-105 transition-all duration-200 ease-in-out"
                          onClick={() => removeItem(index)}
                        >
                          <Trash2 className="size-5 md:size-6" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 text-white border-none outline-none py-3 px-5 bg-white/25 rounded-lg cursor-pointer active:scale-105 transition-all duration-200 ease-in-out"
              onClick={addItems}
            >
              <Plus /> <span>Add Item</span>
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 text-white border-none outline-none py-3 px-5 bg-amber-600 hover:bg-amber-500 rounded-lg cursor-pointer active:scale-105 transition-all duration-200 ease-in-out"
                 onClick={handleCloseForm}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full flex items-center capitalize justify-center gap-3 text-white border-none outline-none py-3 px-5 bg-amber-600 hover:bg-amber-500 rounded-lg cursor-pointer active:scale-105 transition-all duration-200 ease-in-out"
              >
                {invoice ? "save changes" : "Create Invoice"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default InvoiceForm;
