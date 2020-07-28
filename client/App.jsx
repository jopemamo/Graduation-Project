/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import FBLoginButton from './components/FBLoginButton';
import Home from './components/Home';
import StackListEvents from './components/Stack/StackListEvents';
import StackOrgListEvents from './components/Stack/StackOrgListEvents';
import StackOrgCreateEvent from './components/Stack/StackOrgCreateEvent';
import StackMyEvents from './components/Stack/StackMyEvents';
import OrgLoginButton from './components/OrgLoginButton';
import { AuthContext, EventContext } from './contexts';

const Tab = createBottomTabNavigator();
const LoginStack = createStackNavigator();

export default function App() {
  const [isLoggedin, setLoggedinStatus] = useState(false);
  const [isUser, setIsUserStatus] = useState(true);
  const [orgId, setOrgId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [eventState, setEventState] = useState(null);

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

  const eventContext = {
    eventState,
    setEventState,
  };

  if (isLoggedin) {
    if (isUser) {
      return (
        <AuthContext.Provider value={authContext}>
          <EventContext.Provider value={eventContext}>
            <NavigationContainer>
              <Tab.Navigator>
                <Tab.Screen name="TabListEvents" component={StackListEvents} options={{ title: 'Arrangementer' }} />
                <Tab.Screen name="TabMyEvents" component={StackMyEvents} options={{ title: 'Påmeldinger' }}/>
              </Tab.Navigator>
            </NavigationContainer>
          </EventContext.Provider>
        </AuthContext.Provider>
      );
    }
    if (orgId) {
      return (
        <AuthContext.Provider value={authContext}>
          <EventContext.Provider value={eventContext}>
            <NavigationContainer>
              <Tab.Navigator>
                <Tab.Screen name="TabOrgListEvents" component={StackOrgListEvents} options={{ title: 'Arrangementer' }} />            
                <Tab.Screen name="TabOrgCreateEvent" component={StackOrgCreateEvent} options={{ title: 'Ny oppføring' }} />
              </Tab.Navigator>
            </NavigationContainer>
          </EventContext.Provider>
        </AuthContext.Provider>
      );
    }
    return null;
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <LoginStack.Navigator>
          <LoginStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <LoginStack.Screen name="LoginUser" component={FBLoginButton} />
          <LoginStack.Screen name="LoginOrganisation" component={OrgLoginButton} />
        </LoginStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
