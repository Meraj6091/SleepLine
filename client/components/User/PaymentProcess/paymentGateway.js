import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  BackHandler,
  FlatList,
  StatusBar,
  Modal,
  Dimensions,
  SectionList,
} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {docChannel} from './service';
import Icon from 'react-native-vector-icons/Feather';
import DateIcon from 'react-native-vector-icons/Fontisto';
import Pin from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-date-picker';
import {formatDate} from '../../Helpers/dateFormatter';
import TextInputMask from 'react-native-text-input-mask';
import {Snackbar} from 'react-native-paper';
const PaymentGateWay = ({route, navigation}) => {
  const {params} = route;
  //check double destructing
  const state = useSelector((state) => state.userData);
  const {data} = params;
  let user = data?.user;
  const [userData, setUserData] = useState({});
  const [isFocused, setIsFocused] = useState(false);
  const [formData, setFormData] = useState({});
  const [cardDetails, setCardDetails] = useState({});
  const [open, setOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [validation, setValidation] = useState({});
  const [isNotValidated, setIsNotValidated] = useState(true);
  const [visible, setVisible] = useState(false);

  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});

  useEffect(() => {
    if (user) {
      getAllUsers();
    }
  }, [user]);

  useEffect(() => {
    if (showLoader && isNotValidated === false) {
      const timer = setTimeout(() => handleChannel(), 3000);
      return () => {
        clearTimeout(timer);
        setShowLoader(false);
      };
    }
  }, [showLoader, isNotValidated]);

  const formValidation = () => {
    if (!cardDetails.cardName) {
      setValidation({
        cardName: 'CHOOSE YOUR CARD',
      });
    } else if (!formData.cardNo) {
      setValidation({
        cardNo: 'ENTER CARD NUMBER',
      });
    } else if (
      (cardDetails.cardName === 'Visa' ||
        cardDetails.cardName === 'Master Card') &&
      formData.cardNo.length < 14
    ) {
      setValidation({
        cardNo: 'INVALID CARD NUMBER',
      });
    } else if (
      cardDetails.cardName === 'American Express' &&
      formData.cardNo.length < 17
    ) {
      setValidation({
        cardNo: 'INVALID CARD NUMBER',
      });
    } else if (!formData.expirationDate) {
      setValidation({
        expirationDate: 'ENTER CARD EXPIRATION DATE',
      });
    } else if (!formData.securityCode) {
      setValidation({
        securityCode: 'ENTER YOUR SECURITYCODE',
      });
    } else {
      setIsNotValidated(false);
      setShowLoader(true);
    }
  };

  const onViewRef = React.useRef((forcuseItems) => {
    const {viewableItems} = forcuseItems;
    setCardDetails({
      cardName: viewableItems[0]?.item?.text,
    });
    setFormData({});
  });

  const SECTIONS = [
    {
      title: 'Choose Your Card :',
      data: [
        {
          key: '1',
          text: 'Visa',
          img: require('../../../assets/cards/visa2.png'),
        },
        {
          key: '2',
          text: 'Master Card',
          img: require('../../../assets/cards/master.png'),
        },

        {
          key: '3',
          text: 'American Express',
          img: require('../../../assets/cards/americanExpress.png'),
        },
      ],
    },
  ];

  const getAllUsers = () => {
    setUserData({
      ...state,
      docId: params.docId, //setting the specific doc id
    });
  };

  const handleChannel = async () => {
    try {
      const {data} = await docChannel(userData);
      if (data) {
        navigation.navigate('Therapists');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event, id) => {
    setFormData({
      ...formData,
      [id]: event,
    });
  };
  const ListItem = ({item}) => {
    return (
      <View style={styles.item}>
        <Image source={item.img} style={styles.itemPhoto} resizeMode="cover" />
        <Text style={styles.itemText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      {/* <View style={styles.container}>
        <View style={{marginTop: 20}} /> */}

      {/* <TouchableOpacity
          style={[styles.submit, {backgroundColor: '#0251ce'}]}
          onPress={handleChannel}>
          <Text style={styles.submitText}>Proceed</Text>
        </TouchableOpacity> */}

      <View style={styles.container}>
        <View>
          <SectionList
            contentContainerStyle={{paddingHorizontal: 10}}
            stickySectionHeadersEnabled={false}
            sections={SECTIONS}
            renderSectionHeader={({section}) => (
              <>
                <Text style={styles.sectionHeader}>{section.title}</Text>
                <FlatList
                  horizontal
                  data={section.data}
                  renderItem={({item}) => <ListItem item={item} />}
                  onViewableItemsChanged={onViewRef.current}
                  viewabilityConfig={viewConfigRef.current}
                  showsHorizontalScrollIndicator={false}
                />
              </>
            )}
            renderItem={({item, section}) => {
              if (!section.horizontal) {
                return null;
              }
              return <ListItem item={item} />;
            }}
          />
        </View>
        <View style={styles.formContainer}>
          {/* <View
            style={{
              bottom: 280,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Snackbar
              style={{backgroundColor: '#3b5c8f'}}
              visible={visible}
              onDismiss={() => setVisible(false)}
              action={{
                label: 'Undo',
                onPress: () => {
                  // Do something
                },
              }}>
              ENTER CARD NUMBER
            </Snackbar>
          </View> */}
          <Input
            onFocus={() => setIsFocused(true)}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
            value={cardDetails.cardName}
            disabled
            leftIcon={
              <Icon
                name="credit-card"
                size={22}
                color={isFocused ? '#0779e4' : 'grey'}
              />
            }
            errorMessage={validation.cardName && validation.cardName}
          />
          <View style={{flexDirection: 'row'}}>
            <Icon
              style={{marginLeft: 10}}
              name="credit-card"
              size={22}
              color={isFocused ? '#0779e4' : 'grey'}
            />

            <TextInputMask
              onFocus={() => setIsFocused(true)}
              placeholder="Card Number"
              keyboardType="number-pad"
              value={formData.cardNo}
              onChangeText={(event) => handleChange(event, 'cardNo')}
              affineFormats={[]}
              customNotations={[]}
              affinityCalculationStrategy={'WHOLE_STRING'}
              style={{
                marginBottom: 10,
                marginLeft: 10,
                flex: 1,
                fontSize: 18,
                padding: 0,
              }}
              mask={
                cardDetails.cardName === 'Visa' ||
                cardDetails.cardName === 'Master Card'
                  ? '[0000] [0000] [0000]'
                  : '[0000] [000000] [00000]'
              }
            />
          </View>
          <View style={{marginLeft: 15, bottom: 5}}>
            <Text style={{color: 'red', fontSize: 12}}>
              {validation.cardNo}
            </Text>
          </View>

          <Input
            placeholder="Expiration Date"
            onFocus={() => setIsFocused(true)}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
            disabled
            value={formatDate(formData.expirationDate, 'expirationDate')}
            leftIcon={
              <DateIcon
                name="date"
                size={22}
                color={isFocused ? '#0779e4' : 'grey'}
                onPress={() => setOpen(true)}
              />
            }
            errorMessage={
              validation.expirationDate && validation.expirationDate
            }
          />
          <DatePicker
            modal
            open={open}
            date={new Date()}
            mode="date"
            onConfirm={(date) => {
              setOpen(false);
              handleChange(date, 'expirationDate');
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <Input
            placeholder="Security Code"
            onFocus={() => setIsFocused(true)}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
            value={formData.securityCode}
            onChangeText={(event) => handleChange(event, 'securityCode')}
            keyboardType="number-pad"
            leftIcon={
              <Pin
                name="codesquareo"
                size={22}
                color={isFocused ? '#0779e4' : 'grey'}
                onPress={() => setOpen(true)}
              />
            }
            errorMessage={validation.securityCode && validation.securityCode}
          />
        </View>
        <View>
          <Button
            title="Pay Now"
            loading={showLoader}
            buttonStyle={{
              backgroundColor: 'rgba(90, 154, 230, 1)',
              borderColor: 'transparent',
              borderWidth: 0,
              borderRadius: 10,
            }}
            containerStyle={{
              width: 250,
              justifyContent: 'center',
              alignContent: 'center',
              alignSelf: 'center',
              marginHorizontal: 50,
              marginVertical: 10,
            }}
            onPress={() => formValidation()}
          />
        </View>
      </View>

      {/* </View> */}
    </ScrollView>
  );

  //   <View style={styles.container}>
  //     {/* <Text onPress={handleChannel}>Pay now</Text> */}
  //   </View>
  // );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  textStyle: {
    fontSize: 25,
    flex: 1,
  },
  image: {
    width: 320,
    height: 200,
    marginVertical: 55,
  },
  formContainer: {
    width: '90%',
    marginVertical: 10,
  },
  inputText: {
    color: '#52524e',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  inputContainer: {
    borderBottomWidth: 0,
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
  sectionHeader: {
    fontWeight: '800',
    opacity: 0.7,
    fontSize: 15,
    color: '#000',
    marginTop: 20,
    marginBottom: 5,
  },
  item: {
    margin: 10,
  },
  itemPhoto: {
    width: 280,
    height: 250,
  },
  itemText: {
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 5,
  },
});

export default PaymentGateWay;
