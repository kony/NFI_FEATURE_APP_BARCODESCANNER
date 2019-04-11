# Kony NFI Barcode Scanner

A sample application built with [Kony Visualizer](https://www.kony.com/products/visualizer/)
that implements a barcode scanner by leveraging native Android and iOS libraries. 

The goal of this project is not the barcode scanner in itself but rather to
showcase the capabilities of the Kony platform to import and use native API's
directly in Javascript code — something which in Kony terminology is known as
Native Function Interface (NFI).

For more information on NFI go to:

* [iOS NFI](http://docs.kony.com/konylibrary/visualizer/viz_api_dev_guide/Default.htm#guidelines_ios.htm)
* [Android NFI](http://docs.kony.com/konylibrary/visualizer/viz_api_dev_guide/Default.htm#guidelines_android.htm)

This app leverages the following native libraries:

* Android phone: [ZXing](https://github.com/zxing/zxing).
* iPhone: [AVFoundation](https://developer.apple.com/av-foundation/).
