import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const BackButton = () => {
    const navigation = useNavigation();
    
    return (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{marginLeft: 16}}>
            <Image source={require('../assets/img/weui_arrow-filled.png')} />
        </TouchableOpacity>
    );
};

export default BackButton; 