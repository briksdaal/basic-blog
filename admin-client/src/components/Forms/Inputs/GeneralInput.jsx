import Input from './Input';
import TextArea from './TextArea';

function GeneralInput(props) {
  if (props.type === 'textarea') {
    return TextArea(props);
  }

  return Input(props);
}

export default GeneralInput;
