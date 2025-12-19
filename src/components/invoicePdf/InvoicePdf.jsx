import { Page, Text, View, Document,} from '@react-pdf/renderer';
import { styles } from './PdfStyle';
// Create styles


// Create Document Component
const InvoicePdf = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);


