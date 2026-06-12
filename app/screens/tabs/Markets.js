import {COLORS} from '../../style';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {observer} from 'mobx-react';
import React, {useState} from 'react';

const {width} = Dimensions.get('window');

const Markets = () => {
  const Images = [
    {
      uri: 'https://play-lh.googleusercontent.com/2aatOyHIya1XPRMTnXZGYX9hN3DZpyXl7TrOHqsEdeCO61tnNM_gYXct176vMfB49yc',
    },
    {
      uri: 'https://scontent.fayt2-1.fna.fbcdn.net/v/t1.6435-9/72236174_2460502720710863_1790228216779112448_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=fRvN4Nm8_yAAX-SVeSY&_nc_ht=scontent.fayt2-1.fna&oh=00_AfAbn-Ip2MutLWair9jVN8j07qJpHqn_Ae98KnuVITrBzw&oe=63FF2CEB',
    },
    {
      uri: 'https://www.kibrisfirmalari.com/wp-content/uploads/2021/10/sayili-market-1.jpg',
    },
  ];

  const [markets] = useState([
    {
      id: 1,
      image: Images[1],
      name: 'Sayılı Market (Caesar Resort)',
      description:
        'Located at Caesar Resort Rd, Yeni İskele 99850, and has the widest variety of products and goods.',
      time: '9am–11pm',
      number: '05338517739',
    },
    {
      id: 2,
      image: Images[2],
      name: 'Sayılı Market (Bogaz)',
      description: 'Located at iskele bogaz.',
      time: '8am–10pm',
      number: '3718517730 - 05338517739',
    },
  ]);

  const renderItem = ({item}) => (
    <ScrollView>
      <TouchableOpacity
        style={{
          flex: 1,
          marginBottom: 10,
          marginTop: 5,
          padding: 10,
          width: width,
          flexDirection: 'row',
          borderWidth: 1,
          borderColor: COLORS.borderLight,
        }}>
        <Image
          style={{
            flex: 0.4,
            height: 180,
            borderWidth: 0.8,
            borderColor: COLORS.border,
            width: 60,
            padding: 6,
            marginRight: 10,
          }}
          source={item.image}
        />
        <View style={{flex: 0.6}}>
          <Text
            style={{
              flex: 0.2,
              fontSize: 17,
              fontWeight: 'bold',
              color: COLORS.primary,
            }}>
            {item.name}
          </Text>
          <Text
            style={{flex: 0.2, fontSize: 14, fontWeight: 'bold', marginTop: 8}}>
            {item.description}
          </Text>
          <Text style={{flex: 0.2, fontSize: 15, marginTop: 8}}>
            {item.time}
          </Text>
          <Text style={{flex: 0.2, fontSize: 15, marginTop: 8}}>
            {item.number}
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <FlatList
          extraData={markets}
          data={markets}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default observer(Markets);
