import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, Animated, TouchableWithoutFeedback, ImageBackground, FlatList } from 'react-native';
import React, { useRef } from 'react';
import { COLORS, icons, SIZES, images, FONTS } from '../constants';
import { newSeasons, continueWatching } from '../utils'
import {Profiles, ProgressBar } from '../components';

const Home = ({ navigation }) => {
  const newSeasonScrollx = useRef(new Animated.Value(0)).current;
  const renderHeader = () => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: SIZES.padding
      }}
    >
      {/* Profile  */}
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: 50,
          width: 50
        }}
        onPress={() => console.warn("profile")}
      >
        <Image
          source={images.profile_photo}
          resizeMode='contain'
          style={{
            width: 40,
            height: 40,
            borderRadius: 20
          }}
        />
      </TouchableOpacity>

      {/* Screen Mirror */}
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: 50,
          width: 50
        }}
        onPress={() => console.warn("screen mirror")}
      >
        <Image
          source={icons.airplay}
          resizeMode='contain'
          style={{
            width: 25,
            height: 25,
            tintColor: COLORS.primary
          }}
        />
      </TouchableOpacity>
    </View>
  );

  const renderNewSeasonSection = () => {

    const renderItem = ({ item, index }) => {
      return (
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("movieDetail", { "selectedMovie": item })}
        >
          <View
            style={{
              width: SIZES.width,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {/* Thumbnail */}
            <ImageBackground
              source={item.thumbnail}
              resizeMode='cover'
              style={{
                width: SIZES.width * 0.85,
                height: SIZES.width * 0.85,
                justifyContent: "flex-end"
              }}
              imageStyle={{
                borderRadius: 40
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: 60,
                  flexDirection: "row",
                  marginBottom: SIZES.radius,
                  paddingHorizontal: SIZES.radius
                }}
              >
                {/* Play Now Section */}
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: COLORS.transparentWhite
                    }}
                  >
                    <Image 
                      source={icons.play}
                      resizeMode='contain'
                      style={{
                        width:15,
                        height:15,
                        tintColor:COLORS.white
                      }}
                    />
                  </View>
                  <Text style={{ ...FONTS.h3, color:COLORS.white, marginLeft:SIZES.base }}>Play Now</Text>
                </View>

                {/* Still Watching Section */}
                { item.stillWatching.length > 0 && 
                  <View
                    style={{ justifyContent:"center" }}
                  >
                    <Text style={{color:COLORS.white, ...FONTS.h4 }}>Still Watching</Text>
                    <Profiles 
                      profiles={item.stillWatching}
                    />
                  </View>
                }
              </View>
(
            </ImageBackground>
          </View>
        </TouchableWithoutFeedback>
      )
    }
    return (
      <Animated.FlatList
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment={"center"}
        snapToInterval={SIZES.width}
        decelerationRate={0}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: newSeasonScrollx } } }],
          { useNativeDriver: false })}

        data={newSeasons}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}

      />
    )
  };

  const renderDots = () => {
    const dotPosition = Animated.divide(newSeasonScrollx, SIZES.width)
    return (
      <View
        style={{
          marginTop:SIZES.padding,
          flexDirection:"row",
          justifyContent:"center",
          alignItems:"center",
        }}
      >
        { newSeasons.map ((item, index) => {

          const opacity = dotPosition.interpolate({
            inputRange:[index-1, index, index+1],
            outputRange:[0.3,1,0.3],
            extrapolate:"clamp"
          });
          const dotWidth = dotPosition.interpolate({
            inputRange:[index-1, index, index+1],
            outputRange:[6, 20, 6],
            extrapolate:"clamp"
          });
          const dotColor = dotPosition.interpolate({
            inputRange:[index-1, index, index+1],
            outputRange:[COLORS.lightGray, COLORS.primary, COLORS.lightGray],
            extrapolate:"clamp"
          });

          return (
            <Animated.View
              key={`dot-${index}`}
              opacity={opacity}
              style={{
                width:dotWidth,
                height:6,
                borderRadius:SIZES.radius,
                backgroundColor:dotColor,
                marginHorizontal:3
              }}
            />
          )
        })}
      </View>
    )
  };
  const renderContinueWatchingSection = () => {
    return (
      <View
        style={{ marginTop:SIZES.padding }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection:"row",
            alignItems:"center",
            paddingHorizontal:SIZES.padding,
          }}
        >
          <Text style={{ ... FONTS.h2, color:COLORS.white, flex:1  }}>Continue Watching</Text>
          <Image 
            source={icons.right_arrow}
            resizeMode='contain'
            style={{
              width:20,
              height:20,
              tintColor:COLORS.primary
            }}
          />
        </View>
        {/* List */}
        <FlatList 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginTop:SIZES.padding }}
          keyExtractor={item => `${item.id}`}
          data={continueWatching}
          renderItem={({item, index}) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate("movieDetail", {"selectedMovie": item})}
              >
                <View
                  style={{
                    marginLeft: index == 0 ? SIZES.padding : 20,
                    marginRight: index == continueWatching.length -1 ? SIZES.padding : 0
                  }}
                >
                  {/* Thumbnail */}
                  <Image 
                    source={item.thumbnail}
                    resizeMode='cover'
                    style={{
                      width:SIZES.width / 3,
                      height:(SIZES.width / 3) + 60,
                      borderRadius:20,
                    }}
                  />
                  {/* Name */}
                  <Text style={{ ...FONTS.h4, color:COLORS.white, marginTop:SIZES.base }}>{item.name}</Text>
                  
                  {/* ProgressBar */}
                  <ProgressBar 
                    containerStyle={{ marginTop: SIZES.radius}}
                    barStyle={{ height: 3}}
                    barPercentage={item.overallProgress}

                  />
                </View>
              </TouchableWithoutFeedback>
            )
          }}
        />
      </View>
    )
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
      {renderHeader()}
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {renderNewSeasonSection()}
        {renderDots()}
        {renderContinueWatchingSection()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
