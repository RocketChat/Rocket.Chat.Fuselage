import colors from '../../tokens/colors';
import borders from '../../styles/borders';
import typography from '../../styles/typography';


export default {
  trackWidth: '2.5rem',
  trackHeight: typography.p1.lineHeight,
  thumbSize: `calc(${ typography.p1.lineHeight } - 2 * ${ borders.default.width })`,
  borderWidth: borders.default.width,
  borderRadius: '9999px',
  color: colors.white,
  backgroundColor: colors.dark400,
  hoverBackgroundColor: colors.dark500,
  activeBackgroundColor: colors.dark600,
  focusBackgroundColor: colors.dark500,
  focusBorderColor: colors.blue500,
  focusShadowColor: colors.blue100,
  disabledColor: colors.dark200,
  disabledBackgroundColor: colors.dark400,
  checkedBackgroundColor: colors.blue500,
  checkedHoverBackgroundColor: colors.blue600,
  checkedActiveBackgroundColor: colors.blue700,
  checkedFocusBackgroundColor: colors.blue500,
  checkedFocusBorderColor: colors.blue700,
  checkedFocusShadowColor: colors.blue100,
  checkedDisabledColor: colors.white,
  checkedDisabledBackgroundColor: colors.blue200,
};
