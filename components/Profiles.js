import { View, Text, Image } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../constants';

const Profiles = ({ profiles }) => {

    if (profiles.length <= 3) {
        return (
            <View
                style={{ flexDirection: "row", alignItems: "center" }}
            >
                {profiles.map(( item, index ) => (
                    <View
                        key={`profile-${index}`}
                        style={{
                            marginLeft: index == 0 ? null : -15
                        }}
                    >
                        <Image
                            source={item.profile}
                            resizeMode='cover'
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                borderColor: COLORS.black,
                            }}
                        />
                    </View>
                ))}
            </View>
        );
    } else {
        return (
            <View
                style={{ flexDirection: "row", alignItems: "center" }}
            >
                {profiles.map((item, index) => {
                    if (index <= 2) {
                        return (
                            <View
                                key={`profile-${index}`}
                                style={{
                                    marginLeft: index == 0 ? null : -15
                                }}
                            >
                                <Image
                                    source={item.profile}
                                    resizeMode='cover'
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 20,
                                        borderColor: COLORS.black,
                                    }}
                                />
                            </View>
                        )
                    }
                })}
                <Text style={{ ...FONTS.body3, color:COLORS.white, marginLeft:SIZES.base}}>+{profiles.length -3}</Text>
            </View>
        );
    }

};

export default Profiles;
