import React, { Component } from 'react';
import { View, PermissionsAndroid, Platform } from 'react-native';
import { CameraKitCameraScreen, } from 'react-native-camera-kit';

var isFirstGet = true;

export class BarcodeScanner extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    isFirstGet = true;
  }

  componentWillUnmount() {

  }

  /**
   * 바코드 스캔
  */
  onBarcodeScan(barcodeValue) {
    console.log("onBarcodeScan function start")
    if (!isFirstGet) {      
      return
    }
    isFirstGet = false
    console.log(`scanned barcode value: ${barcodeValue}`)
    this.props.navigation.navigate('CameraRoll', { barcodeValue: barcodeValue })
  } 

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CameraKitCameraScreen
          showFrame={true}
          //Show/hide scan frame
          scanBarcode={true}
          //Can restrict for the QR Code only
          laserColor={'blue'}
          //Color can be of your choice
          frameColor={'yellow'}
          //If frame is visible then frame color
          colorForScannerFrame={'black'}
          //Scanner Frame color
          onReadCode={event =>
            this.onBarcodeScan(event.nativeEvent.codeStringValue)
          }
        />
      </View>
    );
  }
}