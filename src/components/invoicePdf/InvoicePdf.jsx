import InvoiceDocument from "../invoiceDocument/InvoiceDocument";

function InvoicePdf({ invoice }) {
  if (!invoice) return null;

  return (
    <>
      <div style={{ width: "100%", height: "100vh" }}>
        <PDFViewer>
          <InvoiceDocument invoice={invoice} />
        </PDFViewer>
      </div>
    </>
  );
}

export default InvoicePdf;
