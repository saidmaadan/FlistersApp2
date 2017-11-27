
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FlisterButton from '../Shared/FlisterButton';

import { getListing } from '../../actions/listing';
import { navigate } from '../../actions/nav';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 40,
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width*4/7,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  info: {
    flex: 1,
    alignItems: 'center',
  },
  about: {
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
  },
  aboutText: {
    fontWeight: 'bold',
  },
  bookingBar: {
    position: 'absolute',
    bottom: 0,
    padding: 15,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E2E2E2',
    backgroundColor: 'white',
    alignItems: 'center',
  }
});

class ListingScreen extends Component {

  componentWillMount(){
    const selectedListingId = this.props.navigation.state.params.item.id;
    this.props.getListing(selectedListingId);
  }

  onCheckAvailability() {
    this.props.navigate({ routeName: 'Booking' });
  }
  render() {
    const listing = this.props.listing;
    if(!listing) return null;

    const { image, host, bedroom, bathroom, accomodate, summary, price } = listing;

    const item = this.props.navigation.state.params.item;
    return (
      <View style={{flex: 1}}>
        <ScrollView style= {styles.container}>
          <Image source = {{uri: image}} style = {styles.image} />
          <View style = {{padding: 30}}>
            <View style = {styles.row}>
              <Text style = {{flex: 1}}>{`Listed By ${host.full_name} `}</Text>
              <Image source={{uri: host.avatar}} style = {styles.avatar} />
            </View>

            <View style = {styles.row}>
              <View style = {styles.info}>
                <Icon name='ios-people-outline' size={40}/>
                <Text>{accomodate} guest(s)</Text>
              </View>
              <View style = {styles.info}>
                <Icon name='ios-alarm-outline' size={40}/>
                <Text>{bedroom} bedroom(s)</Text>
              </View>
              <View style = {styles.info}>
                <Icon name='ios-home-outline' size={40}/>
                <Text>{bathroom} bathroom(s)</Text>
              </View>
            </View>

            <View style = {styles.about}>
              <Text style= {styles.aboutText}>About This Listing</Text>
              <Text>{summary}</Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.bookingBar}>
          <Text style={{ flex: 1 }}>
            <Text style={{ fontWeight: 'bold' }}>{`$${price}`}</Text> per night
          </Text>
          <FlisterButton
              onPress = { () => { this.onCheckAvailability()} }
              backgroundColor = '#FF5A60'
              textColor = 'white'
              label = 'Check Availability'
            />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  listing: state.listing.listing,
});

const mapDispatchToProps = dispatch => ({
  getListing: (listingId) => dispatch(getListing(listingId)),
  navigate: (route) => dispatch(navigate(route)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListingScreen);
