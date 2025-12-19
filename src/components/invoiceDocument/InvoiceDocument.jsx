import { Document, Page, Text, View } from "@react-pdf/renderer";
import { Table, TR, TH, TD } from "@ag-media/react-pdf-table";
import { format, parseISO } from "date-fns";
import { styles } from "./PdfStyle";

function InvoiceDocument({ invoice }) {
  const formateDate = (date) => {
    try {
      return format(parseISO(date), "dd MMM yyyy");
    } catch (err) {
      return "Invalid Date";
    }
  };
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headingText}>Invoice {invoice.id}</Text>
            <Text style={styles.text}>{invoice.projectDescription}</Text>
          </View>
          <View style={[styles.text, styles.flexEnd]}>
            <Text>{invoice?.billFrom?.streetAddress}</Text>
            <Text>{invoice?.billFrom?.city}</Text>
            <Text>{invoice?.billFrom?.postCode}</Text>
            <Text>{invoice?.billFrom?.country}</Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.text}>
            <Text style={styles.headingText}>invoice date</Text>
            <Text>{formateDate(invoice?.invoiceDate)}</Text>
          </View>
          <View style={styles.text}>
            <Text style={styles.headingText}>payment due</Text>
            <Text>{formateDate(invoice?.dueDate)}</Text>
          </View>
          <View style={styles.text}>
            <Text style={styles.headingText}>send to</Text>
            <Text>{invoice.billTo.clientEmail}</Text>
          </View>
        </View>
        <View style={[styles.text, styles.header]}>
          <View>
            <Text style={styles.headingText}>Bill to</Text>
            <Text>{invoice.clientName}</Text>
          </View>
          <View style={styles.flexEnd}>
            <Text>{invoice?.billTo?.streetAddress}</Text>
            <Text>{invoice?.billTo?.city}</Text>
            <Text>{invoice?.billTo?.postCode}</Text>
            <Text>{invoice?.billTo?.country}</Text>
          </View>
        </View>
        <Table style={styles.table}>
          <TH style={styles.tableHeader}>
            <TD style={styles.td}>Item Name</TD>
            <TD style={styles.td}>Qty</TD>
            <TD style={styles.td}>Price</TD>
            <TD style={styles.td}>Total</TD>
          </TH>
          {invoice?.items?.map((item, idx) => {
            return (
              <TR key={idx}>
                <TD style={styles.td}>{item.name}</TD>
                <TD style={styles.td}>{item.quantity}</TD>
                <TD style={styles.td}>{item.price}</TD>
                <TD style={styles.td}>{item.total}</TD>
              </TR>
            );
          })}
        </Table>
        <View style={[styles.header, styles.headingText]}>
          <Text>Amount Due</Text>
          <Text>{invoice.amount}</Text>
        </View>
      </Page>
    </Document>
  );
}

export default InvoiceDocument;
