import { format, parseISO } from "date-fns";
import { IndianRupee, ChevronRight } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { selectedInvoiceList } from "../../feature/InvoiceSlice";

function InvoiceList() {
  const { invoices, filter } = useSelector((state) => state.invoices);
  const dispatch = useDispatch();

  const formateDate = (date) => {
    try {
      return format(parseISO(date), "dd MMM yyyy");
    } catch (err) {
      console.log(err);
    }
  };

  const filterlist = invoices.filter((item) => {
    if (filter === "all") return true;
    return item.status === filter;
  });

  if (filterlist.length === 0) {
    return (
      <div className="w-full flex items-center justify-center">
        <p className="text-lg text-slate-500 capitalize font-semibold">
          No Invoices
        </p>
      </div>
    );
  }
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center gap-5">
        {filterlist?.map((invoice, idx) => {
          return (
            <div
              key={invoice.id}
              className="w-11/12 md:w-4/5 lg:w-3/5 flex items-center justify-between gap-2 bg-teal-800 p-2 md:p-3.5 rounded-sm cursor-pointer active:scale-105 transition-all duration-300 ease-in-out"
              onClick={() => dispatch(selectedInvoiceList(invoice))}
            >
              <div className="flex items-center justify-center text-sm md:text-base font-semibold text-white gap-4 md:gap-5 lg:gap-7">
                <span className="capitalize text-slate-400">{invoice.id}</span>
                <span className="capitalize text-slate-400">
                  {formateDate(invoice.dueDate)}
                </span>
                <span className="capitalize">{invoice.clientName}</span>
              </div>
              <div className="text-white flex items-center justify-center gap-4 md:gap-5 lg:gap-7">
                <h5 className="flex items-center justify-center text-base md:text-lg lg:text-xl font-semibold">
                  <IndianRupee className="size-4 lg:size-5" />
                  {invoice.amount}
                </h5>
                <div
                  className={`rounded-xl flex items-center  justify-center gap-1 px-4 py-2 ${
                    invoice.status === "paid"
                      ? " bg-green-700/40 text-green-500"
                      : invoice.status === "pending"
                      ? " bg-amber-800/40 text-orange-500"
                      : "bg-slate-700/40 text-slate-500"
                  }`}
                >
                  <span
                    className={`inline-block size-2 rounded-full ${
                      invoice.status === "paid"
                        ? " bg-green-500"
                        : invoice.status === "pending"
                        ? " bg-orange-500"
                        : "bg-slate-500"
                    }`}
                  ></span>
                  <span className="text-sm md:text-base capitalize">
                    {invoice.status}
                  </span>
                </div>
                <span className="text-slate-400">
                  <ChevronRight className="size-4 md:size-5 lg:size-6" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default InvoiceList;
