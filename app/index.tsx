import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
export default function Index() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/home");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/applogo.png")}
        style={styles.imglogo}
      />
      <Text style={styles.appname}>Buriram Provice App</Text>
      <ActivityIndicator size="large" color="white" style={{ marginTop: 20 }} />
    </View>
  );
}
const styles = StyleSheet.create({
  appname: {
    color: "white",
    marginTop: 10,
    fontFamily: "Kanit_700Bold",
  },
  imglogo: {
    width: 250,
    height: 250,
  },
  container: {
    flex: 1,
    backgroundColor: "#0A2472",
    alignItems: "center",
    justifyContent: "center",
  },
});
