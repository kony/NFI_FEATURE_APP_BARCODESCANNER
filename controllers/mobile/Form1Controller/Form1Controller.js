define({
		formPostShow:function(){
         //#ifdef android
              this.REQUEST_CODE = 49374;
              this.ALL_CODE_TYPES = null;
              this.INTENT = java.import("android.content.Intent");
              this.ACTIVITY = java.import("android.app.Activity");
              this.STRING_BUILDER = java.import("java.lang.StringBuilder");
              this.TARGET_PACKAGE = "com.google.zxing.client.android";
              this.PACKAGE_MANAGER = java.import("android.content.pm.PackageManager");
              this.context = null;
          //#endif
          //#ifdef iphone
          this.prevLayer = null;
          this.highlightView = null;
          this.session = null;
          //#endif
        },
		scanBarCode:function(){
          	//#ifdef android
          	this.scanStartAndroid();
            //#endif
          	//#ifdef iphone
            this.scanStartiOS();
            //#endif
        },
  		scanStartiOS:function(){          
          var basicprop = {
                "id": "NativeContainer1",
                "zIndex": 2,
                "onViewDidLoad": this.startiOSBarCodeScan.bind(this),
                "top": "8%",
                "left": "0%",
                "width": "100%",
                "height": "92%"
            };
            var nativeContainer = new kony.ui.NativeContainer(basicprop);
          
          	this.view.flxIosScannerHolder.add(nativeContainer);
          	this.view.flxIosScannerHolder.isVisible = true;    
          	this.view.flxTitle.isVisible = true;
          	this.view.forceLayout();
        },
  		startiOSBarCodeScan : function startiOSBarCodeScan(parentView) {
                    var UIColor = objc.import("UIColor");
                    var UIButton = objc.import("UIButton");
                    var UIView = objc.import("UIView");
                    var deviceWidth = kony.os.deviceInfo().screenWidth;
                    var deviceHeight = kony.os.deviceInfo().screenHeight;
                    var MyClass = objc.newClass("MyClass", "UIView", ["AVCaptureMetadataOutputObjectsDelegate"], {
                        captureOutputDidOutputMetadataObjectsFromConnection: function(captureOutput, metadataObject, connection) {
                          contextBeforeNavigation.IOSCONNECTIONOBJECT = connection;
                            var barCodeTypes = [AVMetadataObjectTypeUPCECode, AVMetadataObjectTypeCode39Code, AVMetadataObjectTypeCode39Mod43Code,
                                AVMetadataObjectTypeEAN13Code, AVMetadataObjectTypeEAN8Code, AVMetadataObjectTypeCode93Code, AVMetadataObjectTypeCode128Code,
                                AVMetadataObjectTypePDF417Code, AVMetadataObjectTypeQRCode, AVMetadataObjectTypeAztecCode
                            ];
                            var barCodeObject, detectionString, highlightViewRect;
                            for (var i = 0; i < metadataObject.length; i++) {
                                for (var j = 0; j < barCodeTypes.length; j++) {
                                    if ([metadataObject[i].type === barCodeTypes[j]]) {
                                        barCodeObject = contextBeforeNavigation.prevLayer.transformedMetadataObjectForMetadataObject(metadataObject[i]);
                                        highlightViewRect = barCodeObject.bounds;
                                        detectionString = barCodeObject.stringValue;
                                        break;
                                    }
                                }
                            }
                            if (detectionString !== null) {
                                contextBeforeNavigation.session.stopRunning();
                                contextBeforeNavigation.session.removeConnection(connection);
                                //contextBeforeNavigation.view.flxScanner.removeAll();
                              	contextBeforeNavigation.view.flxIosScannerHolder.removeAll();
                              	contextBeforeNavigation.view.ButtonRound.text = "Scan again";
								//contextBeforeNavigation.view.flxScannerHolder.isVisible = false;
                              	contextBeforeNavigation.view.flxIosScannerHolder.isVisible = false;
                              	contextBeforeNavigation.view.flxTitle.isVisible = false;                              
                                try {

                                    contextBeforeNavigation.view.lblBarCode.text = detectionString;
                                    contextBeforeNavigation.view.forceLayout();
                                } catch ( exception ) {
                                  alert("Invalid QR code");
                                }
                            }
                        }
                    });
                    highlightView = MyClass.alloc().initWithFrame({
                        'x': 0,
                        'y': 0,
                        "width": deviceWidth,
                        "height": deviceHeight
                    });
                    highlightView.layer.borderWidth = 1;
                    parentView.addSubview(highlightView);
                    var AVCaptureSession = objc.import("AVCaptureSession");
                    this.session = AVCaptureSession.alloc().jsinit();
                    var AVCaptureDevice = objc.import("AVCaptureDevice");
                    var device = AVCaptureDevice.defaultDeviceWithMediaType(AVMediaTypeVideo);
                    var AVCaptureDeviceInput = objc.import("AVCaptureDeviceInput");
                    var error = null;
                    var input = AVCaptureDeviceInput.deviceInputWithDeviceError(device, error);
                    if (input) {
                        this.session.addInput(input);
                    } else {
                        alert("Error in input : " + error);
                    }
                    var AVCaptureMetadataOutput = objc.import("AVCaptureMetadataOutput");
                    var output = AVCaptureMetadataOutput.alloc().jsinit();
                    var outputView = {
                        "output": output,
                        "view": highlightView
                    };
          
                    var MyBarcodeScanner = objc.import("MyBarcodeCapture");
                    MyBarcodeScanner.registerForMetaDataDelegateSecondparam(output, highlightView);
          
                    this.session.addOutput(output);
                    output.metadataObjectTypes = output.availableMetadataObjectTypes;
                    var AVCaptureVideoPreviewLayer = objc.import("AVCaptureVideoPreviewLayer");
                    this.prevLayer = AVCaptureVideoPreviewLayer.layerWithSession(this.session);
                    this.prevLayer.frame = {
                        'x': 0,
                        'y': 0,
                        "width": deviceWidth,
                        "height": deviceHeight
                        //"width": 240,
                        //"height": 240
                      
                    };
                    this.prevLayer.bounds = {
                        'x': 0,
                        'y': 0,
                        "width": deviceWidth,
                        "height": deviceHeight
                    };
                    this.prevLayer.position = {
                        "x": deviceWidth / 2,
                        "y": deviceHeight / 2
                    };
                    this.prevLayer.videoGravity = AVLayerVideoGravityResizeAspectFill;
                    parentView.layer.addSublayer(this.prevLayer);
                    this.session.startRunning();
                    parentView.bringSubviewToFront(highlightView);
                    contextBeforeNavigation = this;
             },
              cancelScanningIOS:function(){
// 							this.session.stopRunning();
//                             this.session.removeConnection(this.IOSCONNECTIONOBJECT);
                			this.view.flxIosScannerHolder.removeAll();
                            this.view.flxIosScannerHolder.isVisible = false;
                			this.view.flxTitle.isVisible = false;
                		
                //alert("connection stoped!!!");
              },
  		scanStartAndroid : function scanStartAndroid(){
          kony.os.registerBatteryService(this.batterychangecallback.bind(this));
          var MainClass = java.newClass("MainClass","java.lang.Object",["com.konylabs.ffi.ActivityResultListener"],{
            onActivityResult : function(requestCode,resultCode,intent) {
              var scanningResult = contextBeforeNavigation.parseActivityResult(requestCode, resultCode, intent);
              if (scanningResult !== null && scanningResult !== {} && scanningResult !== undefined) {
                try {
                  	//this.view.txtBarCode.text = scanningResult.contents ;
                  contextBeforeNavigation.view.txtBarCode.text = scanningResult.contents ;
                  contextBeforeNavigation.view.lblBarCode.text = scanningResult.contents ;
                  contextBeforeNavigation.view.ButtonRound.text = "Scan again";
                  //alert(scanningResult.contents);
                } catch (exception) {
                  kony.print("####Exception : " + exception.message);
                  alert("Incorrect Code scanned");
                }
              }
              else{
                alert("Incorrect QRCode : No data");
              }
            }
          });
          var intentClassObj = new MainClass();
          KonyMain = java.import('com.konylabs.android.KonyMain');
          this.context = KonyMain.getActivityContext();
          this.context.registerActivityResultListener(this.REQUEST_CODE, intentClassObj);     
        },
  		batterychangecallback:function batterychangecallback(batteryInfo){
            this.batterylevel = batteryInfo.batterylevel;
            this.batteryState=batteryInfo.batterystate;
            if(this.batterylevel>=10 || this.batteryState==kony.os.BATTERY_STATE_CHARGING ){
              this.initiateScan();
            }
            else{
              alert("Battery is below 10%. Please charge it");
            }
            if(this.batterylevel >=50||this.batteryState){
              kony.os.unregisterBatteryService(); 
            } 
        },
  		initiateScan : function initiateScan(desiredBarcodeFormats) {
      if(desiredBarcodeFormats === null || desiredBarcodeFormats === undefined) {
        desiredBarcodeFormats = this.ALL_CODE_TYPES;
      }
      var intentScan = new this.INTENT(this.TARGET_PACKAGE + ".SCAN");
      intentScan.addCategory(this.INTENT.CATEGORY_DEFAULT);
      if (desiredBarcodeFormats !== null) {
        var joinedByComma = new this.STRING_BUILDER();
        for (var format in desiredBarcodeFormats) {
          if (joinedByComma.length() > 0) {
            joinedByComma.append(',');
          }
          joinedByComma.append(format);
        }
        intentScan.putExtra("SCAN_FORMATS", joinedByComma.toString());
      }
      var targetAppPackage = this.isTargetScannerPresent();
      if (targetAppPackage === null) {
        this.view.flxPopup.isVisible = true;
        return;
      }
      intentScan.setPackage(targetAppPackage);
      intentScan.addFlags(this.INTENT.FLAG_ACTIVITY_CLEAR_TOP);
      intentScan.addFlags(this.INTENT.FLAG_ACTIVITY_CLEAR_WHEN_TASK_RESET);
      this.startActivityForResult(intentScan, this.REQUEST_CODE);
      return null;
    },
  	 isTargetScannerPresent : function isTargetScannerPresent() {
      var pm = this.context.getPackageManager();
      try {
        pm.getPackageInfo(this.TARGET_PACKAGE, this.PACKAGE_MANAGER.GET_ACTIVITIES);
        return this.TARGET_PACKAGE; 
      } catch (exception) {
        kony.print("Package not found");
        return null;
      }
    },
  	startActivityForResult : function startActivityForResult(intent, code) {
      contextBeforeNavigation = this; 
      this.context.startActivityForResult(intent, code);
    },
  	parseActivityResult : function parseActivityResult(requestCode, resultCode, intent){
      if (requestCode == this.REQUEST_CODE) {
        if (resultCode == this.ACTIVITY.RESULT_OK) {
          var contents = intent.getStringExtra("SCAN_RESULT");
          var formatName = intent.getStringExtra("SCAN_RESULT_FORMAT");
          var rawBytes = intent.getByteArrayExtra("SCAN_RESULT_BYTES");
          var intentOrientation = intent.getIntExtra("SCAN_RESULT_ORIENTATION", parseInt(Number.MIN_VALUE));
          var orientation = intentOrientation == parseInt(Number.MIN_VALUE) ? null : intentOrientation;
          var errorCorrectionLevel = intent.getStringExtra("SCAN_RESULT_ERROR_CORRECTION_LEVEL");
          return {"contents" : contents,
                  "formatName" : formatName,
                  "rawBytes" : rawBytes,
                  "intentOrientation" : intentOrientation,
                  "orientation" : orientation,
                  "errorCorrectionLevel" : errorCorrectionLevel
                 };
        }
        return {};
      }
      return null;
    },
  	downloadApp : function downloadApp() {
      var URI = java.import("android.net.Uri");
      var uri = URI.parse("market://details?id=" + this.TARGET_PACKAGE);
      
      
      var intent = this.INTENT(this.INTENT.ACTION_VIEW, uri);
      try {
//        this.view.flxPopupHolder.isVisible = false;
        this.context.startActivity(intent);
      } catch (exception) {
        // Hmm, market is not installed
        alert("in exception :"+JSON.stringify(exception));
        kony.print("Google Play is not installed; cannot install " + this.TARGET_PACKAGE);
      }
    },
  	btnPopupYesOnclick:function(){
      	//alert("yes clicked!!!!");
      	this.view.flxPopup.isVisible = false;
      	this.downloadApp();
    },
  	btnPopupNoOnclick:function(){
      	//alert("No clicked!!!!");
      	this.view.flxPopup.isVisible = false;
    }      
});