import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FBLoginButton from './components/FBLoginButton';
import EventList from './components/EventList';
import Event from './components/Event';
import OrgPage from './components/OrgPage';
import Home from './components/Home';
import CreateEvent from './components/CreateEvent';
import OrgLoginButton from './components/OrgLoginButton';
import { AuthContext } from './contexts';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedin, setLoggedinStatus] = useState(true);
  const [isUser, setIsUserStatus] = useState(true);
  const [orgId, setOrgId] = useState(null);
  const [userId, setUserId] = useState(null);

  const authContext = {
    isLoggedin,
    setLoggedinStatus,
    isUser,
    setIsUserStatus,
    orgId,
    setOrgId,
    userId,
    setUserId,
  };

  if (isLoggedin) {
    if (isUser) {
      return (
        <AuthContext.Provider value={authContext}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="EventList" component={EventList} />
              <Stack.Screen name="Event" component={Event} />
            </Stack.Navigator>
          </NavigationContainer>
        </AuthContext.Provider>
      );
    }
    if (orgId) {
      return (
        <AuthContext.Provider value={authContext}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="OrgPage" component={OrgPage} />
              <Stack.Screen name="CreateEvent" component={CreateEvent} />
            </Stack.Navigator>
          </NavigationContainer>
        </AuthContext.Provider>
      );
    }
    return null;
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="LoginUser" component={FBLoginButton} />
          <Stack.Screen name="LoginOrganisation" component={OrgLoginButton} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
