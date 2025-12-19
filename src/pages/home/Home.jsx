import {
  Header,
  InvoiceList,
  InvoiceForm,
  InvoiceDetails,
} from "../../components";
import { useSelector } from "react-redux";

function Home() {
  const { isFormOpen, selectedInvoice } = useSelector(
    (state) => state.invoices
  );
  return (
    <>
      <main className="w-full flex flex-col items-center justify-center">
        <Header />
        {selectedInvoice ? <InvoiceDetails /> : <InvoiceList />}
        {isFormOpen ? <InvoiceForm invoice={selectedInvoice} /> : null}
      </main>
    </>
  );
}

export default Home;
