import { StyleSheet, View } from "react-native";

export default function SkeletonCard() {
  return <View style={styles.skeleton} />;
}

const styles = StyleSheet.create({
  skeleton: {
    height: 200,
    borderRadius: 20,
    backgroundColor: "#E3E8FF",
    marginHorizontal: 15,
    marginBottom: 15,
  },
});
