import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ChatScreen, SlideMenu} from 'screen';

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

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={'ChatScreen'} component={ChatScreen} />
      {/* <Stack.Screen name={'MyScreen'} component={MyScreen} /> */}
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerStyle={{width: '80%'}}
      drawerContent={(props) => <SlideMenu {...props} />}>
      <Drawer.Screen name="StackNavigation" component={StackNavigation} />
    </Drawer.Navigator>
  );
};

const AppNavigator = () => {
  return <DrawerNavigation />;
};

export default AppNavigator;
