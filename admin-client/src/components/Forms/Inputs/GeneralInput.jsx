import Input from './Input';
import TextArea from './TextArea';
import Select from './Select';

function GeneralInput(props) {
  if (props.type === 'textarea') {
    return TextArea(props);
  }

  if (props.type === 'select') {
    return Select(props);
  }

  return Input(props);
}

export default GeneralInput;
