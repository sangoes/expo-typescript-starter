import * as React from 'react';
import { Text as DefaultText, View as DefaultView } from 'react-native';
import useColorScheme from '@/hooks/useColorScheme';
import Theme from '@/constants/Theme';

/**
 * @description color
 * @author jerry.c
 * @date 2020-09-24
 * @export
 * @param {{ light?: string; dark?: string }} props
 * @param {(keyof typeof Colors.light & keyof typeof Colors.dark)} colorName
 * @returns
 */
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Theme.light & keyof typeof Theme.dark,
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Theme[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

/**
 * @description Text
 * @author jerry.c
 * @date 2020-09-24
 * @export
 * @param {TextProps} props
 * @returns
 */
export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

/**
 * @description View
 * @author jerry.c
 * @date 2020-09-24
 * @export
 * @param {ViewProps} props
 * @returns
 */
export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
