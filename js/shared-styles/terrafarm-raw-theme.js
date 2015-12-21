import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';

const TerrafarmRawTheme = {
  spacing: Spacing,
  fontFamily: 'Patrick Hand SC, cursive',
  palette: {
    primary1Color: Colors.blueGrey500,
    primary2Color: Colors.cyan700,
    primary3Color: Colors.lightBlack,
    accent1Color: Colors.green200,
    accent2Color: Colors.green100,
    accent3Color: Colors.green500,
    textColor: Colors.blueGrey900,
    alternateTextColor: Colors.blueGrey50,
    canvasColor: Colors.blueGrey50,
    borderColor: Colors.blueGrey300,
    disabledColor: ColorManipulator.fade(Colors.blueGrey900, 0.3),
  },
};

export default TerrafarmRawTheme;
