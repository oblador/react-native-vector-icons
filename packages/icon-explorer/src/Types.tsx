/* This file exists to make sure the types work properly */

import AntD from '@react-native-vector-icons/ant-design';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';

export const Component = () => {
  AntD.getImageSource('robot', 20, 'red');
  FontAwesome5.getImageSource('regular', 'address-book', 20, 'red');
  // @ts-expect-error bad font name
  FontAwesome5.getImageSource('brand', 'address-book', 20, 'red');
  // @ts-expect-error bad font name
  FontAwesome5.getImageSource('solid', 'github', 20, 'red');

  return (
    <>
      <AntD name="robot" />
      {/* @ts-expect-error bad font name */}
      <AntD name="rnvi" />

      <FontAwesome5 name="address-book" />
      <FontAwesome5 iconStyle="regular" name="address-book" />
      <FontAwesome5 iconStyle="brand" name="github" />
      <FontAwesome5 iconStyle="solid" name="address-book" />
      {/* @ts-expect-error bad font name */}
      <FontAwesome5 name="500px" />
      {/* @ts-expect-error no name */}
      <FontAwesome5 iconStyle="solid" />
      {/* @ts-expect-error no name */}
      <FontAwesome5 iconStyle="olid" />
      {/* @ts-expect-error bad name for style */}
      <FontAwesome5 iconStyle="solid" name="github" />
      {/* @ts-expect-error bad name for style */}
      <FontAwesome5 iconStyle="brand" name="address-book" />
    </>
  );
};
