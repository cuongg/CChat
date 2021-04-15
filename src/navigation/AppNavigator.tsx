import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyScreen from 'screen/MyScreen';
import ChatScreen from 'screen/ChatScreen';

// const Tab = createBottomTabNavigator();

// const TabNavigation = () => {
//   return (
//     <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
//       <Tab.Screen name="AccountStack" component={AccountNavigator} />
//       <Tab.Screen
//         name="CreateCampaignStack"
//         component={CreateCampaignNavigator}
//       />
//       <Tab.Screen name="NotificationStack" component={NotificationNavigator} />
//       <Tab.Screen name="SettingStack" component={SettingNavigator} />
//     </Tab.Navigator>
//   );
// };

// const Drawer = createDrawerNavigator();

// const DrawerNavigation = () => {
//   return (
//     <Drawer.Navigator
//       drawerContent={(props) => <SlideMenu {...props} />}
//       drawerStyle={{width: width - 50}}>
//       <Drawer.Screen name="TabNavigation" component={TabNavigation} />
//       <Drawer.Screen name="Billing" component={BillingScreen} />
//       <Drawer.Screen name="LoginScreen" component={LoginScreen} />
//     </Drawer.Navigator>
//   );
// };

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={'ChatScreen'} component={ChatScreen} />
      <Stack.Screen name={'MyScreen'} component={MyScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
