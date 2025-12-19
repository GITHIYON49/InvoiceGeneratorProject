import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    flexDirection: "coloum",
    backgroundColor: "#ffff",
    padding: "30px 50px",
    gap: "40px",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  headingText: {
    fontSize: "16px",
    textTransform: "capitalize",
    fontFamily: "Helvetica-Bold",
    color: "#262626",
    marginBottom: "5px",
  },
  text: {
    textTransform: "capitalize",
    fontSize: "12px",
    color: "#545254",
  },
  flexEnd: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    gap: 4,
  },

  flexCol: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 10,
  },

  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 5,
  },
  table: {
    width: "100%",
    borderColor: "1px soild #f3f4f6",
    margin: "20px 0",
    fontSize: 12,
  },
  tableHeader: {
    backgroundColor: "#c0bfc0",
  },
  td: {
    padding: "6px",
  },
});
