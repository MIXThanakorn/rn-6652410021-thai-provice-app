import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PagerView from "react-native-pager-view";
import BottomBar from "../components/BottomBar";
import PlaceCard from "../components/PlaceCard";
import { supabase } from "../services/supabase";
import { BurirumPlace } from "../type";

export default function Home() {
  const [active, setActive] = useState(0);
  const [data, setData] = useState<BurirumPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState<BurirumPlace | null>(null);
  const [visible, setVisible] = useState(false);
  const pagerRef = useRef<any>(null);

  const fetchData = async () => {
    try {
      setError(false);
      const { data, error } = await supabase
        .from("burirum_tb")
        .select("*")
        .order("id");
      if (error) throw error;
      setData(data || []);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderCard = (item: BurirumPlace) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        setSelected(item);
        setVisible(true);
      }}
    >
      {item.image_url ? (
        <Image source={{ uri: item.image_url }} style={styles.image} />
      ) : (
        <View style={[styles.image, { backgroundColor: "#E3E8FF" }]} />
      )}
      <View style={styles.overlay}>
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSection = (title: string, categories: string[]) => {
    const filtered = data.filter((d) => categories.includes(d.category));
    if (!filtered.length) return null;
    return (
      <View style={{ paddingTop: 20 }}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {filtered.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => {
              setSelected(item);
              setVisible(true);
            }}
          >
            {item.image_url ? (
              <Image source={{ uri: item.image_url }} style={styles.image} />
            ) : (
              <View style={[styles.image, { backgroundColor: "#E3E8FF" }]} />
            )}
            <View style={styles.overlay}>
              <Text style={styles.name}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F4F7FF" }}>
      <PagerView
        style={{ flex: 1 }}
        ref={pagerRef}
        onPageSelected={(e) => setActive(e.nativeEvent.position)}
      >
        <View key="1">
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);
                  fetchData();
                }}
              />
            }
            data={[{ key: "section" }]}
            renderItem={() => (
              <>
                {renderSection("สถานที่ท่องเที่ยว", ["1"])}
                {renderSection("วัด", ["4"])}
              </>
            )}
          />
        </View>

        <View key="2">
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);
                  fetchData();
                }}
              />
            }
            data={[{ key: "section" }]}
            renderItem={() => (
              <>
                {renderSection("ร้านอาหาร", ["2"])}
                {renderSection("คาเฟ่", ["3"])}
              </>
            )}
          />
        </View>

        <View key="3">
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);
                  fetchData();
                }}
              />
            }
            data={[{ key: "section" }]}
            renderItem={() => renderSection("งานเทศกาล", ["5"])}
          />
        </View>
        <ScrollView>
          <View key="4" style={{ padding: 20 }}>
            <Text style={styles.sectionTitle}>เกี่ยวกับจังหวัดบุรีรัมย์</Text>

            <Image
              source={require("@/assets/images/buriram_logo.png")}
              style={styles.imglogo}
            />

            <Text style={styles.aboutText}>
              บุรีรัมย์ (Buriram) มีความหมายว่า “เมืองแห่งความรื่นรมย์”
              เป็นจังหวัดในภาคตะวันออกเฉียงเหนือ หรืออีสานใต้ มีพื้นที่ประมาณ
              10,322 ตารางกิโลเมตร และมีทั้งหมด 23 อำเภอ
            </Text>

            <Text style={styles.subTitle}>คำขวัญจังหวัด</Text>
            <Text style={styles.aboutText}>
              เมืองปราสาทหิน ถิ่นภูเขาไฟ ผ้าไหมสวย รวยวัฒนธรรม เลิศล้ำเมืองกีฬา
            </Text>

            <Text style={styles.subTitle}>จุดเด่นสำคัญ</Text>
            <Text style={styles.aboutText}>
              • แหล่งอารยธรรมขอมโบราณ เช่น ปราสาทหินพนมรุ้ง และปราสาทเมืองต่ำ
              {"\n"}• เมืองกีฬา มีทีมฟุตบอลบุรีรัมย์ ยูไนเต็ด และสนามช้างอารีนา
              {"\n"}• สนามแข่งรถระดับโลก ช้าง อินเตอร์เนชั่นแนล เซอร์กิต{"\n"}•
              ของขึ้นชื่อ เช่น ลูกชิ้นยืนกิน และผ้าไหมบุรีรัมย์
            </Text>

            <Text style={styles.subTitle}>เศรษฐกิจหลัก</Text>
            <Text style={styles.aboutText}>
              เกษตรกรรม เช่น ข้าว มันสำปะหลัง อ้อย
              รวมถึงการท่องเที่ยวเชิงวัฒนธรรมและกีฬา
            </Text>
          </View>
        </ScrollView>
      </PagerView>

      <BottomBar
        active={active}
        onChange={(i) => {
          setActive(i);
          pagerRef.current?.setPage(i);
        }}
      />

      <PlaceCard
        visible={visible}
        onClose={() => setVisible(false)}
        data={selected}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 200,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 20,
    overflow: "hidden",
  },
  image: { width: "100%", height: "100%" },
  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  name: { color: "#fff", fontSize: 18, fontFamily: "Kanit_700Bold" },
  sectionTitle: {
    fontSize: 22,
    fontFamily: "Kanit_700Bold",
    margin: 15,
    color: "#0A2472",
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  error: { fontSize: 18, fontFamily: "Kanit_700Bold", color: "red" },
  retry: {
    fontSize: 16,
    fontFamily: "Kanit_400Regular",
    color: "#0A2472",
    marginTop: 10,
  },
  aboutText: { fontSize: 16, fontFamily: "Kanit_400Regular", marginTop: 10 },
  subTitle: {
    fontSize: 18,
    fontFamily: "Kanit_700Bold",
    marginTop: 15,
    color: "#0A2472",
  },
  imglogo: {
    width: 250,
    height: 250,
    alignSelf: "center",
    marginVertical: 20,
  },
});
