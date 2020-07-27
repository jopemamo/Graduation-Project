/* eslint-disable react/prop-types */
import React, {
  useEffect, useContext, useState,
} from 'react';
import { ScrollView } from 'react-native';
import { fetchEvents, fetchOrgEvent } from '../backend';
import { EventContext, AuthContext } from '../contexts';
import LongList from './LongList';
import ShortList from './ShortList';

export default function ListEvents({ navigation, type }) {
  const userStateContext = useContext(AuthContext);
  const eventStateContext = useContext(EventContext);
  // const controller = new AbortController();

  const [eventList, setEventList] = useState([{ title: 'Didn\'t work', organizationId: '0' }]);

  useEffect(() => {
    if (userStateContext.isUser) {
      fetchEvents([eventStateContext.setEventState, setEventList], /*{ signal: controller.signal }*/);
    } else {
      fetchOrgEvent(userStateContext.orgId, setEventList, /*{ signal: controller.signal }*/);
    }
    // return () => controller.abort();
  }, []);

  if (!eventList) return null;
  if (!eventStateContext.eventState) return null;

  return (
    <ScrollView>
      {type === 'short'
        ? <ShortList headline="Arrangementer i ditt område" list={eventList} navigation={navigation} navigateTo="Event" />
        : <LongList list={eventList} navigation={navigation} navigateTo="Event" />}
    </ScrollView>
  );
}