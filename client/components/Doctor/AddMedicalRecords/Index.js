import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import MyHeader from '../../Navigation/myHeader';
import Add from 'react-native-vector-icons/AntDesign';
import AddRecords from './addMedicalRecordsModal';
import Chat from 'react-native-vector-icons/Entypo';
import Medical from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import {getUserMedicalRecords} from './service';
const AddMedicalRecords = ({route, navigation}) => {
  const {params} = route;
  const {userData} = params;
  const {data} = userData;
  const state = useSelector((state) => state.userData);

  const SPACING = 20;
  const AVATAR_SIZE = 70;
  const [initialData, setInitialData] = useState({});
  const [visible, setVisible] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [userMedialRecods, setUserMedialRecods] = useState([]);
  const [selectedUserRecod, setSelectedUserRecord] = useState({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (data._id && state._id) {
      setInitialData({
        userId: data._id,
        docId: state._id,
      });
    }
  }, [data, state]);

  useEffect(() => {
    if (initialData.userId && initialData.docId) {
      getAllUserMedicalRecords();
    }
  }, [initialData, refresh]);

  const handleAddMedicalRecords = () => {
    setOnEdit(false);
    setVisible(true);
  };
  const showMedicalRecordDetails = (data) => {
    setSelectedUserRecord({...data});
    setOnEdit(true);
    setVisible(true);
  };
  const getAllUserMedicalRecords = async () => {
    try {
      let postdata = initialData;

      console.log(postdata);
      const {data} = await getUserMedicalRecords(postdata);
      if (data) {
        setUserMedialRecods(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={styles.container}>
        {userData && (
          <AddRecords
            visible={visible}
            setVisible={setVisible}
            userData={data}
            docId={state._id}
            onEdit={onEdit}
            setOnEdit={setOnEdit}
            selectedUserRecod={selectedUserRecod}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        )}
        <View
          style={{
            alignSelf: 'flex-end',
            marginRight: 10,
            marginTop: 10,
          }}>
          <Add
            name="addfile"
            color="#b92b27"
            size={25}
            onPress={handleAddMedicalRecords}
          />
        </View>

        <View>
          <FlatList
            data={userMedialRecods}
            keyExtractor={(item) => item.key}
            contentContainerStyle={{
              padding: SPACING,
            }}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => showMedicalRecordDetails(item)}>
                  <View style={styles.cardBody}>
                    <Image
                      source={require('../../../assets/medical_records.jpg')}
                      style={{
                        width: AVATAR_SIZE,
                        height: AVATAR_SIZE,
                        borderRadius: AVATAR_SIZE,
                        marginRight: SPACING / 2,
                      }}
                    />
                    <View>
                      {/* <Text style={{fontSize: 20, fontWeight: '700'}}>
                        {item.name}
                      </Text> */}
                      <Text
                        style={{
                          fontSize: 18,
                          opacity: 0.7,
                          paddingTop: 15,
                        }}>
                        Medical No : {item.medicalNo}
                      </Text>
                      <View style={{flexDirection: 'row', paddingTop: 5}}>
                        <Text
                          style={{
                            fontSize: 15,
                            opacity: 1.8,
                            color: '#0099cc',
                          }}>
                          View Now
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <View>
          <Text>{'\n'}</Text>
          <Text>{'\n'}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  container2: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitleChoose: {
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'sans-serif-thin',
    marginRight: 100,
  },
  cardBody: {
    flexDirection: 'row',
    padding: 20,
    marginBottom: 40,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 3,
  },
  image: {
    width: 400,
    height: 250,
    marginVertical: 10,
  },
  textTitle: {
    fontFamily: 'Foundation',
    fontSize: 40,
    marginVertical: 10,
  },
  textBody: {
    fontFamily: 'Foundation',
    fontSize: 16,
  },
  formContainer: {
    width: '90%',
    marginVertical: 10,
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
  inputText: {
    color: '#52524e',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  submit: {
    width: '90%',
    height: 50,
    borderColor: 'blue',
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 0,
  },
  submitText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    marginVertical: 10,
  },
});

export default AddMedicalRecords;
