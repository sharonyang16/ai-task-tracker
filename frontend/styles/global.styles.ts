import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  layoutContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 24,

    alignItems: "center",
    height: "100%",
  },
  pageHeading: {
    fontSize: 24,
    fontWeight: 600,
  },
});

export default styles;
