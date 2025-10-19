import React from "react";
import { Text, View } from "react-native";

type AlertType = "info" | "warning";

type BannerProps = {
  text: string;
  title?: string;
  alertType?: AlertType;
};

const Banner = ({ text, title, alertType }: BannerProps) => {
  const alertTypeToColor = () => {
    switch (alertType) {
      case "info":
        return "#ADD8E6";
      case "warning":
        return "#FFCCCB";
      default:
        return "white";
    }
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        borderRadius: 8,
        backgroundColor: alertTypeToColor(),
        padding: 8,
      }}
    >
      {title && <Text style={{ fontWeight: 600 }}>{title}</Text>}
      <Text>{text}</Text>
    </View>
  );
};

export default Banner;
