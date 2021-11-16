import styled from "styled-components/native";
import {Feather} from '@expo/vector-icons'
import { RFValue } from "react-native-responsive-fontsize";

import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import theme from "../../global/styles/theme";

interface CategoryProps {
    isActive: boolean;
}

export const Container = styled(GestureHandlerRootView)`
    flex: 1;
    background: ${({theme}) => theme.colors.background};
`;

export const Header = styled.View`
    width: 100%;
    height: ${RFValue(113)}px;

    background: ${({theme}) => theme.colors.primary};

    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
    color: ${({theme}) => theme.colors.shape};
`;

export const Category = styled(TouchableOpacity)<CategoryProps>`
    width: 100%;
    padding: 15px;

    flex-direction: row;
    align-items: center;

    background: ${({ isActive }) =>
    isActive ? theme.colors.secondary_light : theme.colors.background
};
`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    margin-right: 16px;
`;

export const Name = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;

`;

export const Separetor = styled.View`
    width: 100%;
    height: 1px;

    background: ${({theme}) => theme.colors.text};
`;

export const Footer = styled.View`
    width: 100%;
    padding: 24px;
`;