import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  layoutContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 24,
    flex: 1,
  },
  pageHeading: {
    fontSize: 24,
    fontWeight: 600,
  },
  content: {
    height: 100,
    flex: 1,
  },
});

export default styles;
