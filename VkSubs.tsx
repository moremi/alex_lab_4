import React, {useEffect, useState, useCallback} from 'react';
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Button,
  Text,
  Form,
  Item,
  Input,
  Label,
  Picker,
  Icon,
  Textarea,
} from 'native-base';

const VkSubs = ({navigation, route}) => {
  const userId = route.params.user_id;
  const [users, setUsers] = useState<{}[]>([]);

  const findSubs = async () => {
    const res = await fetch(
      `https://api.vk.com/method/users.getFollowers?user_id=${userId}&access_token=3be7c8c93be7c8c93be7c8c9e03bceb9ff33be73be7c8c9675311705d3eca9d849b75d1&v=5.131&fields=photo_200,bdate,city,followers_count`,
    );

    try {
      const json = await res.json();
      const finded = json?.response?.items;

      if (finded) {
        setUsers(finded);
      } else {
        Alert.alert('Ошибка: ' + json?.error?.error_msg);
      }
    } catch (e) {
      Alert.alert('Ошибка: ' + e);
    }
  };
  //
  const openSubs = user => {
    if (user?.is_closed !== undefined && user?.is_closed !== true) {
      user?.id && navigation.push('subs', {user_id: user?.id});
    } else {
      Alert.alert('Нельзя открыть приватный аккаунт!');
    }
  };

  useEffect(() => {
    findSubs();
  }, []);

  const renderItem = ({item: user}) => {
    return (
      <TouchableOpacity onPress={() => openSubs(user)}>
        <View style={{flexDirection: 'row', padding: 10}}>
          <Image
            source={{uri: user?.photo_200}}
            style={{width: 100, height: 100}}
          />
          <View style={{padding: 10, paddingTop: 0}}>
            <Text style={{fontSize: 18, fontWeight: '700'}}>
              {user?.first_name} {user?.last_name}
            </Text>
            <Text style={{fontSize: 14}}>{user?.bdate}</Text>
            <Text style={{fontSize: 14}}>{user?.city?.title}</Text>
            <Text style={{fontSize: 14}}>
              Подписчиков:{' '}
              <Text style={{fontWeight: '700'}}>{user?.followers_count}</Text>
            </Text>
            {user?.is_closed !== undefined && (
              <Text style={{fontSize: 14}}>
                Аккаунт:{' '}
                <Text style={{fontWeight: '700'}}>
                  {(user?.is_closed && 'приватный') || 'публичный'}
                </Text>
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default VkSubs;
