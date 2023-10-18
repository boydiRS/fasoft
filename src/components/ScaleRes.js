import { Dimensions } from 'react-native';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scale = size => WIDTH / guidelineBaseWidth * size;
const verticalScale = size => HEIGHT / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;
const responsiveFontSize = (f) => Math.sqrt((HEIGHT * HEIGHT) + (WIDTH * WIDTH)) * (f / 100);
export { scale, verticalScale, moderateScale, responsiveFontSize, WIDTH, HEIGHT };