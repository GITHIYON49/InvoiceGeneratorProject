import { format, parseISO } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { markAsPaid, deleteInvoice, toogle } from "../../feature/InvoiceSlice";
import { Download } from "lucide-react";
import InvoiceDocument from "../invoiceDocument/InvoiceDocument";
import { PDFDownloadLink } from "@react-pdf/renderer";

function InvoiceDetails({ invoice }) {
  const { selectedInvoice } = useSelector((state) => state.invoices);
  const dispatch = useDispatch();
  const {
    id,
    status,
    billFrom,
    billTo,
    clientName,
    items,
    paymentsTerms,
    projectDescription,
    invoiceDate,
    dueDate,
    amount,
  } = invoice;
  const formateDate = (date) => {
    try {
      return format(parseISO(date), "dd MMM yyyy");
    } catch (err) {
      return "Invalid Date";
    }
  };

  const handleMarkAsPaid = () => {
    dispatch(markAsPaid(id));
  };

  const handleDelete = () => {
    dispatch(deleteInvoice(id));
  };

  const handleEdit = () => {
    dispatch(toogle());
  };
  return (
    <>
      <section className="w-11/12 md:w-4/5 lg:w-3/5 bg-teal-700 p-3 md:p-7 rounded-md space-y-7 mb-7">
        <div className="flex items-start md:items-center justify-between">
          <h5 className="text-lg capitalize tracking-wider text-white">
            {status}
          </h5>
          <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-3.5 text-white text-base">
            <div className="flex items-center justify-center gap-3.5">
              <PDFDownloadLink
                document={<InvoiceDocument invoice={invoice} />}
                fileName={`invoice-${id}.pdf`}
                className="flex items-center justify-center text-sm md:text-base gap-2 py-2 px-4 cursor-pointer bg-amber-500 rounded-xl"
              >
                {({ loading, error }) => {
                  if (error) {
                    console.error(error);
                    return <span>Failed to generate PDF</span>;
                  }

                  return (
                    <>
                      <Download className="size-4 md:size-5 lg:size-7" />
                      <span>{loading ? "loading.." : "Download"}</span>
                    </>
                  );
                }}
              </PDFDownloadLink>

              <button
                onClick={handleEdit}
                className="py-2 px-4 rounded-xl text-sm md:text-base bg-black/30 hover:bg-black/20 active:scale-105  cursor-pointer transition-all duration-200 outline-none border-none"
              >
                Edit
              </button>
            </div>
            <div className="flex items-center justify-center gap-3.5">
              <button
                onClick={handleDelete}
                className="py-2 px-4 rounded-xl text-sm md:text-base bg-red-600 hover:bg-red-500 active:scale-105  cursor-pointer transition-all duration-200 outline-none border-none"
              >
                Delete
              </button>
              <button
                onClick={handleMarkAsPaid}
                className="py-2 px-4 rounded-xl text-sm md:text-base bg-emerald-500 hover:bg-emerald-600 active:scale-105 cursor-pointer transition-all duration-200 outline-none border-none"
              >
                Mark as Paid
              </button>
            </div>
          </div>
        </div>

        <div className="w-full  bg-teal-900 rounded-sm flex flex-col items-start gap-7 p-3 md:p-7">
          <div className="w-full flex flex-col sm:flex-row items-start justify-between">
            <div className="space-y-1">
              <h3 className="text-lg md:text-xl text-white font-bold capitalize">
                {id}
              </h3>
              <p className="text-sm md:text-base capitalize text-slate-400">
                {projectDescription}
              </p>
            </div>
            <ul className="text-sm md:text-base text-slate-400 capitalize sm:text-end">
              <li>{billFrom.streetAddress}</li>
              <li>{billFrom.city}</li>
              <li>{billFrom.postCode}</li>
              <li>{billFrom.country}</li>
            </ul>
          </div>

          <div className="w-full grid grid-cols-2 sm:grid-cols-3 items-start justify-items-start ">
            <div className="space-y-1">
              <div className="space-y-2">
                <span className="inline-block text-sm md:text-base text-slate-400 capitalize">
                  invoice date
                </span>
                <p className="text-base md:text-lg font-semibold text-white capitalize">
                  {formateDate(invoiceDate)}
                </p>
              </div>
              <div className="space-y-2">
                <span className="inline-block text-sm md:text-base text-slate-400 capitalize">
                  payment due
                </span>
                <p className="text-base md:text-lg font-semibold text-white capitalize">
                  {formateDate(dueDate)}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <span className="inline-block text-sm md:text-base text-slate-400 capitalize">
                  Bill to
                </span>
                <p className="text-base md:text-lg font-semibold text-white capitalize">
                  {clientName}
                </p>
              </div>
              <ul className="text-sm md:text-base text-slate-400 capitalize">
                <li>{billTo.streetAddress}</li>
                <li>{billTo.city}</li>
                <li>{billTo.postCode}</li>
                <li>{billTo.country}</li>
              </ul>
            </div>
            <div>
              <span className="inline-block text-base text-slate-400 capitalize">
                send to
              </span>
              <p className="text-base md:text-lg font-semibold text-white capitalize">
                {billTo.clientEmail}
              </p>
            </div>
          </div>

          <div className="w-full bg-teal-700 p-3 md:p-5 rounded-sm">
            <table className="w-full border-separate border-spacing-3">
              <thead className="w-full text-sm md:text-base capitalize text-slate-400">
                <tr>
                  <th className="text-start">item name</th>
                  <th className="text-center">qty</th>
                  <th className="text-right">price</th>
                  <th className="text-right">total</th>
                </tr>
              </thead>
              <tbody className="w-full text-sm md:text-base capitalize text-white">
                {items.map((item, idx) => {
                  return (
                    <tr key={idx}>
                      <td className="text-start">{item.name}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-right">{item.price.toFixed(2)}</td>
                      <td className="text-right">{item.total.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="w-full flex items-center justify-between capitalize text-white pb-10">
            <span className="text-sm md:text-base font-semibold">
              amount due
            </span>
            <span className="text-base md:text-lg lg:text-xl font-bold">
              {amount.toFixed(2)}
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

export default InvoiceDetails;
