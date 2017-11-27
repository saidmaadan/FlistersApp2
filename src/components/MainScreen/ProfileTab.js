
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

import { logout, addPayment } from '../../actions/user';
import stripe from 'tipsi-stripe';

stripe.init({
  publishableKey: 'STRIPE_KEY',
});

const options = {
  smsAutofillDisabled: true,
  requiredBillingAddressFields: 'full',
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    flex: 1,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#555',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 80,
  },
  menuButton: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingVertical: 20,
  },
  menuButtonText: {
    fontSize: 20,
  },
});

class ProfileTab extends Component {

  addPayment = async() => {
    const token = await stripe.paymentRequestWithCardForm(options);
    // console.log(token);
    this.props.addPayment(token.tokenId);
  }

  switchType(){}

  render() {
    const profile = this.props.profile || {}
    const payment = this.props.payment;

    return (
      <ScrollView style = {styles.container}>
        <View style = {styles.profile}>
          <Text style = {styles.name}>{profile.first_name} {profile.last_name}</Text>
          <Image source={{uri: profile.avatar}} style = {styles.avatar} />
        </View>

        <TouchableOpacity
          onPress = {() => this.addPayment().catch(e => console.log(e))}
          style = {styles.menuButton} >
          <Text>{`${payment ? 'Update' : 'Add'}`} Your Payment</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress = {() => this.switchType()} style = {styles.menuButton} >
          <Text>Switch To </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress = {() => this.props.logout()} style = {styles.menuButton} >
          <Text>Log Out</Text>
        </TouchableOpacity>

      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.user.profile,
  payment: state.user.payment,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  addPayment: (stripeToken) => dispatch(addPayment(stripeToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTab);
