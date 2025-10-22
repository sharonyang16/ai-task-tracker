import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  input: {
    padding: 8,
    borderStyle: "solid",
    borderColor: "#000000",
  },
  checkbox: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
});

export default styles;
