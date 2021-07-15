import List from '../../../common/List';
import Block from './Block';
import Description from './Description';
import OptionCard from './OptionCard';
import Subtitle from './Subtitle';
import Title from './Title';

export default Object.assign(OptionCard, {
  Title,
  Subtitle,
  Description,
  List,
  ListItem: List.Li,
  Block,
});
