import React, { Component } from 'react';
import { Text, View } from 'react-native';
import GallerySwiper from "react-native-gallery-swiper";

export default class LillysCarousel extends Component {
  render() {
      return (
          <GallerySwiper
              style={{ flex: 1, backgroundColor: "black" }}
              images={[
                  {
                    source: require("../../../assets/images/Lilly/lilly_1.jpg"),
                    dimensions: { width: 1080, height: 1920 }
                  },
                  {
                    source: require("../../../assets/images/Lilly/lilly_2.jpg"),
                    dimensions: { width: 1080, height: 1920 }
                  },
                  {
                    source: require("../../../assets/images/Lilly/lilly_3.jpg"),
                    dimensions: { width: 1080, height: 1920 }
                  },
                  {
                    source: require("../../../assets/images/Lilly/lilly_4.jpg"),
                    dimensions: { width: 1080, height: 1920 }
                  },
                  {
                    source: require("../../../assets/images/Lilly/lilly_5.jpg"),
                    dimensions: { width: 1080, height: 1920 }
                  },
                  {
                    source: require("../../../assets/images/Lilly/lilly_6.jpg"),
                    dimensions: { width: 1080, height: 1920 }
                  },
              ]}
          />
      );
  }
}
