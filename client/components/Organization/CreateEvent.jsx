/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import { Input, Button } from 'react-native-elements';
import { createEvent } from '../../backend';
import { AuthContext } from '../../contexts';

export default function CreateEvent({ navigation }) {
  const userStateContext = useContext(AuthContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [img, setImg] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [slotsRemaining, setSlotsRemaining] = useState('');

  const addEvent = async () => {
    const eventData = {
      name,
      organizationId: userStateContext.orgId,
      description,
      img,
      location,
      time,
      date,
      slotsRemaining,
      volunteers: [],
    };
    // eslint-disable-next-line no-unused-vars
    const response = await createEvent(eventData);
    navigation.navigate('ListEvents');
  };

  return (
    <>
      <Input
        placeholder="Tittel"
        onChangeText={setName}
      />
      <Input
        placeholder="Beskrivelse"
        onChangeText={setDescription}
      />
      <Input
        placeholder="Bilde"
        onChangeText={setImg}
      />
      <Input
        placeholder="Sted"
        onChangeText={setLocation}
      />
      <Input
        placeholder="Dato"
        onChangeText={setDate}
      />
      <Input
        placeholder="Tidspunkt"
        onChangeText={setTime}
      />
      <Input
        placeholder="Antall plasser"
        onChangeText={setSlotsRemaining}
      />

      <Button title="Create Event" type="solid" onPress={addEvent} />
      <Button title="Back" type="solid" onPress={() => navigation.navigate('ListEvents')} />
    </>
  );
}
