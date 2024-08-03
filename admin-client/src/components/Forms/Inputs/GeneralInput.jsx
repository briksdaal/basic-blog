import Input from './Input';
import TextArea from './TextArea';
import Select from './Select';
import ImageFile from './ImageFile';

function GeneralInput(props) {
  if (props.type === 'textarea') {
    return TextArea(props);
  }

  if (props.type === 'select') {
    return Select(props);
  }

  if (props.type === 'imagefile') {
    return ImageFile(props);
  }

  return Input(props);
}

export default GeneralInput;
