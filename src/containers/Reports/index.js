import React from "react";

/** Components */
import { View, ScrollView,  } from "react-native";
import {
  Layout,
  Icon,
  Text,
  TopNavigation,
  TopNavigationAction,
  IndexPath,
  Select,
  SelectItem,
  Button,
} from "@ui-kitten/components";
import apis from "../../services/apis";
import { connect } from "react-redux";
let Reports = ({ navigation, user }) => {
  let types = ["Today", "Month", "All"];
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const BackIcon = (props) => (
    <Icon
      onPress={() => {
        navigation.goBack();
      }}
      {...props}
      name="arrow-back"
    />
  );
  const BackAction = () => <TopNavigationAction icon={BackIcon} />;

  const [orders, setOrders] = React.useState([]);

  let [total_amount, setTotalAmount] = React.useState(0);
  let total = (res) => {
    let tot = 0;
    res.forEach((trg, index) => {
      tot = tot + trg.amount;
    });
    setTotalAmount(tot);
  };
  const search = () => {
    let data = {
      user_id: user.user.id,
      type: types[selectedIndex.row],
    };
    apis.reports.fetch(
      data,
      (res) => {
        setOrders(res);
        total(res);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  return (
    <Layout style={{ flex: 1 }}>
      <TopNavigation accessoryLeft={BackAction} title="Reports" />
      <View style={{ padding: 15 }}>
        <Select
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
          value={types[selectedIndex.row]}
        >
          {types.map((trg, index) => (
            <SelectItem key={index} title={trg} />
          ))}
        </Select>
        <View style={{ height: 10 }}></View>
        <Button status="success" onPress={search}>
          Search
        </Button>
      </View>
      <View
        style={{
          height: 1,
          width: "100%",
          borderTopColor: "#6666",
          borderTopWidth: 1,
        }}
      ></View>
      <ScrollView contentContainerStyle={{ padding: 15 }}>
        <View style={{ borderRadius: 3, borderWidth: 1, borderColor: "#888" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderBottomColor: "#888",
              borderBottomWidth: 1,
            }}
          >
            <View
              style={{
                padding: 3,
                borderLeftColor: "#888",
                borderLeftWidth: 1,
                flex: 1,
              }}
            >
              <Text category="s1">Code</Text>
            </View>
            <View
              style={{
                padding: 3,
                borderLeftColor: "#888",
                borderLeftWidth: 1,
                flex: 1,
              }}
            >
              <Text category="s1">Amount</Text>
            </View>
          </View>
          {orders.map((trg, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderBottomColor: "#888",
                borderBottomWidth: 1,
              }}
            >
              <View
                style={{
                  padding: 3,
                  borderLeftColor: "#888",
                  borderLeftWidth: 1,
                  flex: 1,
                }}
              >
                <Text>{trg.categories.title}</Text>
              </View>
              <View
                style={{
                  padding: 3,
                  borderLeftColor: "#888",
                  borderLeftWidth: 1,
                  flex: 1,
                }}
              >
                <Text>{trg.amount}</Text>
              </View>
            </View>
          ))}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderBottomColor: "#888",
              borderBottomWidth: 1,
            }}
          >
            <View
              style={{
                padding: 3,
                borderLeftColor: "#888",
                borderLeftWidth: 1,
                flex: 1,
              }}
            >
              <Text category="s1">Total</Text>
            </View>
            <View
              style={{
                padding: 3,
                borderLeftColor: "#888",
                borderLeftWidth: 1,
                flex: 1,
              }}
            >
              <Text category="s1">{total_amount}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Reports);
