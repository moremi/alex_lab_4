import React, {useEffect, useState} from 'react';
import {Alert, Image, ScrollView, View} from 'react-native';
import {Button, Text, Item, Input} from 'native-base';
const Vk = ({navigation}) => {
  const [search, setSearch] = useState('1');
  const [user, setUser] = useState<{} | null>(null);

  const find = async () => {
    const res = await fetch(
      `https://api.vk.com/method/users.get?user_ids=${search}&access_token=3be7c8c93be7c8c93be7c8c9e03bceb9ff33be73be7c8c9675311705d3eca9d849b75d1&v=5.131&fields=photo_200,bdate,city,followers_count`,
    );
    try {
      const json = await res.json();
      const finded = json?.response[0];
      if (finded) {
        setUser(finded);
      } else {
        Alert.alert('Ошибка: ' + json?.error?.error_msg);
      }
    } catch (e) {
      Alert.alert('Ошибка: ' + e);
    }
  };
  useEffect(() => {
    find();
  }, []);

  const openSubs = () => {
    user?.id && navigation.navigate('subs', {user_id: user?.id});
  };
  return (
    <ScrollView style={{backgroundColor: '#fcfcfc'}}>
      <Text style={{padding: 10}}>
        Введите ID пользователя:
        <Text style={{fontWeight: '700'}}>{}</Text>
      </Text>

      <View style={{padding: 10, flexDirection: 'row'}}>
        <Item rounded style={{marginLeft: 0, marginBottom: 0, flexGrow: 1}}>
          <Input
            placeholder="32112312"
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={find}
          />
        </Item>

        <Button style={{margin: 10, alignContent: 'center'}} onPress={find}>
          <Text>Поиск</Text>
        </Button>
      </View>

      {user && (
        <>
          <View style={{flexDirection: 'row', padding: 10}}>
            <Image
              source={{uri: user?.photo_200}}
              style={{width: 130, height: 130}}
            />
            <View style={{padding: 10, paddingTop: 0}}>
              <Text style={{fontSize: 20, fontWeight: '700'}}>
                {user?.first_name} {user?.last_name}
              </Text>
              <Text style={{fontSize: 16}}>{user?.bdate}</Text>
              <Text style={{fontSize: 16}}>{user?.city?.title}</Text>
              <Text style={{fontSize: 16}}>
                Подписчиков:{' '}
                <Text style={{fontWeight: '700'}}>{user?.followers_count}</Text>
              </Text>
              {user?.is_closed !== undefined && (
                <Text style={{fontSize: 16}}>
                  Аккаунт:{' '}
                  <Text style={{fontWeight: '700'}}>
                    {(user?.is_closed && 'приватный') || 'публичный'}
                  </Text>
                </Text>
              )}
            </View>
          </View>

          <Button style={{alignSelf: 'center'}} onPress={openSubs}>
            <Text>Открыть подписчиков</Text>
          </Button>
        </>
      )}
    </ScrollView>
  );
};

export default Vk;
