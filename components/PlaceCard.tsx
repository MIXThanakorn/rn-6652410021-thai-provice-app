import { useEffect } from "react";
import {
  Image,
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { BurirumPlace } from "../type";

type Props = {
  visible: boolean;
  onClose: () => void;
  data: BurirumPlace | null;
};

export default function PlaceCard({ visible, onClose, data }: Props) {
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      scale.value = withTiming(1, { duration: 200 });
      opacity.value = withTiming(1, { duration: 200 });
    } else {
      scale.value = withTiming(0.9, { duration: 150 });
      opacity.value = withTiming(0, { duration: 150 });
    }
  }, [visible]);

  const animatedCard = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedOverlay = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  if (!data) return null;

  const isFood = data.category === "2" || data.category === "3";
  const isFestival = data.category === "5";

  const validMap =
    typeof data.latitude === "number" &&
    typeof data.longitude === "number" &&
    !isNaN(data.latitude) &&
    !isNaN(data.longitude);

  const openMap = () => {
    if (!validMap) return;

    const google = `https://www.google.com/maps/search/?api=1&query=${data.latitude},${data.longitude}`;
    const apple = `https://maps.apple.com/?q=${data.latitude},${data.longitude}`;
    const url = Platform.OS === "ios" ? apple : google;

    Linking.canOpenURL(url).then((supported) => {
      if (supported) Linking.openURL(url);
    });
  };

  const openCall = () => {
    if (!data.phone_num) return;
    Linking.openURL(`tel:${data.phone_num}`);
  };

  return (
    <Modal visible={visible} transparent animationType="none">
      <Animated.View style={[styles.overlay, animatedOverlay]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

        <Animated.View style={[styles.card, animatedCard]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
          >
            {data.image_url ? (
              <Image source={{ uri: data.image_url }} style={styles.image} />
            ) : null}

            <View style={{ padding: 20 }}>
              <Text style={styles.title}>{data.name}</Text>
              <Text style={styles.sub}>{data.district}</Text>

              {isFestival && (
                <>
                  <Text style={styles.section}>รายละเอียด</Text>
                  <Text style={styles.text}>{data.description}</Text>

                  <Text style={styles.section}>ช่วงเวลาจัดงาน</Text>
                  <Text style={styles.text}>{data.date}</Text>
                </>
              )}

              {!isFestival && (
                <>
                  {isFood && data.phone_num ? (
                    <Pressable style={styles.callBtn} onPress={openCall}>
                      <Text style={styles.callText}>โทร {data.phone_num}</Text>
                    </Pressable>
                  ) : null}

                  {validMap && (
                    <>
                      <Text style={styles.section}>แผนที่</Text>
                      <MapView
                        style={styles.map}
                        initialRegion={{
                          latitude: data.latitude,
                          longitude: data.longitude,
                          latitudeDelta: 0.01,
                          longitudeDelta: 0.01,
                        }}
                        scrollEnabled
                        zoomEnabled
                        rotateEnabled
                      >
                        <Marker
                          coordinate={{
                            latitude: data.latitude,
                            longitude: data.longitude,
                          }}
                          onPress={openMap}
                        />
                      </MapView>
                    </>
                  )}
                </>
              )}

              <Pressable style={styles.closeBtn} onPress={onClose}>
                <Text style={styles.closeText}>ปิด</Text>
              </Pressable>
            </View>
          </ScrollView>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    maxHeight: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 220,
  },
  title: {
    fontSize: 24,
    fontFamily: "Kanit_700Bold",
    color: "#0A2472",
  },
  sub: {
    fontSize: 14,
    fontFamily: "Kanit_400Regular",
    color: "#777",
    marginBottom: 10,
  },
  section: {
    fontSize: 18,
    fontFamily: "Kanit_700Bold",
    marginTop: 15,
    color: "#0A2472",
  },
  text: {
    fontSize: 16,
    fontFamily: "Kanit_400Regular",
    marginTop: 5,
  },
  callBtn: {
    backgroundColor: "#0A2472",
    padding: 15,
    borderRadius: 12,
    marginVertical: 15,
    alignItems: "center",
  },
  callText: {
    color: "#fff",
    fontFamily: "Kanit_700Bold",
  },
  map: {
    height: 250,
    borderRadius: 12,
    marginTop: 10,
  },
  closeBtn: {
    marginTop: 20,
    alignItems: "center",
  },
  closeText: {
    color: "#0A2472",
    fontFamily: "Kanit_700Bold",
    fontSize: 16,
  },
});
