import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  active: number;
  onChange: (i: number) => void;
};

export default function BottomBar({ active, onChange }: Props) {
  const menus = [
    { label: "สถานที่", icon: "location" },
    { label: "ร้านอาหาร", icon: "restaurant" },
    { label: "งานเทศกาล", icon: "calendar" },
    { label: "เกี่ยวกับ", icon: "information-circle" },
  ];

  return (
    <View style={styles.container}>
      {menus.map((m, i) => {
        const isActive = active === i;
        return (
          <TouchableOpacity
            key={i}
            style={styles.item}
            onPress={() => onChange(i)}
          >
            <Ionicons
              name={m.icon as any}
              size={22}
              color={isActive ? "#0A2472" : "#999"}
            />
            <Text style={[styles.text, isActive && styles.active]}>
              {m.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 70,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  item: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontFamily: "Kanit_400Regular", fontSize: 12, color: "#999" },
  active: { color: "#0A2472", fontFamily: "Kanit_700Bold" },
});
