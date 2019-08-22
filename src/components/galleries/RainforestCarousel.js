import React, { Component } from 'react';
import { Text, View } from 'react-native';
import GallerySwiper from "react-native-gallery-swiper";

export default class RainforestCarousel extends Component {
  render() {
      return (
          <GallerySwiper
              style={{ flex: 1, backgroundColor: "black" }}
              images={[
                  {
                    source: require("../../../assets/images/RainForest/rain1.jpg"),
                    dimensions: { width: 1080, height: 1920 }
                  },
                  {
                    source: require("../../../assets/images/RainForest/rain3.jpg"),
                    dimensions: { width: 1080, height: 1920 }
                  },
                  {
                    source: require("../../../assets/images/RainForest/rain4.jpg"),
                    dimensions: { width: 1080, height: 1920 }
                  },
                  {
                    source: require("../../../assets/images/RainForest/rain5.jpg"),
                    dimensions: { width: 1080, height: 1920 }
                  },
                  {
                    source: require("../../../assets/images/RainForest/rain6.jpg"),
                    dimensions: { width: 1080, height: 1920 }
                  },
                  {
                    source: require("../../../assets/images/RainForest/rain7.jpg"),
                    dimensions: { width: 1080, height: 1920 }
                  },
              ]}
          />
      );
  }
}
