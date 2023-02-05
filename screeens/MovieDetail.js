import {StyleSheet, View, Text, ScrollView, ImageBackground, Platform, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, FONTS, icons, SIZES } from '../constants'
import { ProgressBar } from '../components'
import { LinearGradient } from 'expo-linear-gradient';

const MovieDetail = ({ navigation, route }) => {

  const [selectedMovie, setSelectedMovie] = useState(null)

  useEffect(() => {
    const { selectedMovie } = route.params;
    setSelectedMovie(selectedMovie)
  }, []);

  const renderHeaderBar = () => (
    <View
      style={{
        flexDirection: "row",
        marginTop: Platform.OS == "ios" ? 40 : 20,
        paddingHorizontal: SIZES.padding,
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      {/* Back Button */}
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: 50,
          height: 50,
          borderRadius: 20,
          backgroundColor: COLORS.transparentBlack
        }}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={icons.left_arrow}
          resizeMode='contain'
          style={{
            width: 20,
            height: 20,
            tintColor: COLORS.white
          }}
        />
      </TouchableOpacity>

      {/* Share Button */}
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: 50,
          height: 50,
          borderRadius: 20,
          backgroundColor: COLORS.transparentBlack
        }}
        onPress={() => console.warn("share")}
      >
        <Image
          source={icons.upload}
          resizeMode='contain'
          style={{
            width: 20,
            height: 20,
            tintColor: COLORS.white
          }}
        />
      </TouchableOpacity>
    </View>
  );

  const renderHeaderSection = () => {
    return (
      <ImageBackground
        source={selectedMovie?.details.image}
        resizeMode='cover'
        style={{
          width: "100%",
          height: SIZES.height < 700 ? SIZES.height * 0.6 : SIZES.height * 0.7
        }}
      >
        <View
          style={{ flex: 1 }}
        >
          {renderHeaderBar()}

          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={["transparent", "#000"]}
              style={{
                width: "100%",
                height: 150,
                justifyContent: "flex-end",
                alignItems: "center"
              }}
            >
              {/* Seasons */}
              <Text style={{ ...FONTS.body4, color: COLORS.white }}>{selectedMovie?.details.season}</Text>

              {/* Name */}
              <Text style={{ marginTop: SIZES.base, color: COLORS.white, ...FONTS.h1, textTransform: "uppercase" }}>{selectedMovie?.name}</Text>
            </LinearGradient>
          </View>
        </View>
      </ImageBackground>
    );
  };

  const renderCategoryAndRatingSection = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: SIZES.base,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {/* Age */}
        <View
          style={[styles.categoryContainer, { marginLeft: 0}]}
        >
          <Text style={{ color:COLORS.white, ...FONTS.h4 }}>{selectedMovie?.details.age}</Text>
        </View>

        {/* Genre */}
        <View
          style={[styles.categoryContainer, { paddingHorizontal:SIZES.padding}]}
        >
          <Text style={{ color:COLORS.white, ...FONTS.h4 }}>{selectedMovie?.details.genre}</Text>
        </View>

        {/* Rating */}
        <View
          style={ styles.categoryContainer}
        >
          <Image 
            source={icons.star}
            resizeMode='contain'
            style={{
              width:15,
              height:15
            }}
          />
          <Text style={{ marginLeft:SIZES.base, color:COLORS.white, ...FONTS.h4 }}>{selectedMovie?.details.ratings}</Text>
        </View>

      </View>
    );
  };

  const renderMovieDetail = () => {
    return (
      <View
        style={{
          flex:1,
          paddingHorizontal:SIZES.padding,
          marginTop:SIZES.padding,
          justifyContent:"space-around"
        }}
      >
        {/* Title, ProgressBar And Running Time */}
        <View>
          {/* Title and Running Time */}
          <View
            style={{ flexDirection:"row" }}
          >
            <Text
              style={{
                flex:1, 
                color:COLORS.white,
                ...FONTS.h4
              }}
            >{selectedMovie?.details?.currentEpisode}</Text>

            <Text
              style={{
                color:COLORS.lightGray,
                ...FONTS.body4
              }}
            >{selectedMovie?.details?.runningTime}</Text>
          </View>

          <ProgressBar 
            containerStyle={{
              marginTop: SIZES.radius,
            }}
            barStyle={{
              height:5,
              borderRadius:3
            }}
            barPercentage={selectedMovie?.details?.progress}
          />
        </View>

        {/* Watch */}
        <TouchableOpacity
          style={{
            height:60,
            justifyContent:"center",
            alignItems:"center",
            marginBottom:Platform.OS == "ios" ?SIZES.padding * 2 : 0,
            backgroundColor:COLORS.primary,
            borderRadius: 15
          }}
          onPress={() => console.warn("watch")}
        >
          <Text
            style={{
              color:COLORS.white,
              ...FONTS.h2
            }}
          >{selectedMovie?.details?.progress === "0%" ? "WATCH NOW" : "CONTINUE WATCHING"}</Text>
        </TouchableOpacity>

      </View>
    );
  };
  return (
    <ScrollView
      contentContainerStyle={{ flex: 1, backgroundColor: COLORS.black }}
      style={{ backgroundColor: COLORS.black }}
    >
      {/* Header */}
      {renderHeaderSection()}

      {/* Category and Rating */}
      {renderCategoryAndRatingSection()}

      {/* Movie Details */}
      {renderMovieDetail()}
    </ScrollView>
  );
};

export default MovieDetail;


const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: SIZES.base,
    paddingHorizontal: SIZES.base,
    paddingVertical: 3,
    borderRadius: SIZES.base,
    backgroundColor: COLORS.gray1
  }
});
