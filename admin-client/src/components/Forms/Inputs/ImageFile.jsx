import { useRef, useState } from 'react';
import Typography from '../../General/Typography';
import { BsTrash } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';

function ImageFile({
  id,
  label,
  existing,
  validations,
  register,
  errorMsg,
  setValue
}) {
  const [previewImage, setPreviewImage] = useState(existing);
  const [removeImage, setRemoveImage] = useState('');
  const fileRef = useRef();

  const { ref, onChange, ...rest } = register(id);

  function handleChange(e) {
    if (e.target.files.length && e.target.files[0].type.includes('image/')) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    } else {
      setPreviewImage(existing);
    }
    setRemoveImage('');
  }

  function handleRemoveChange() {
    setRemoveImage((cur) => {
      if (cur === '') {
        setValue('removeImage', 'true');
        return 'true';
      } else {
        setValue('removeImage', '');
        return '';
      }
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>
        <Typography>{label}</Typography>
      </label>
      <div className="flex flex-col gap-2">
        <div className="relative sm:w-[27rem]">
          <img
            src={
              removeImage || !previewImage
                ? '/placeholder-image.jpg'
                : previewImage
            }
            className="h-[21rem] w-full cursor-pointer object-cover ring-1 ring-gray-300"
            onClick={() => fileRef.current.click()}
          />
          <button
            type="button"
            onClick={handleRemoveChange}
            className="absolute right-5 top-5">
            <div className="flex items-center justify-center rounded-full bg-white p-2 ring-1 ring-gray-300">
              {removeImage || !previewImage ? <MdEdit /> : <BsTrash />}
            </div>
          </button>
        </div>
        <div className="flex h-8 gap-8">
          <input
            hidden
            accept="image/*"
            type="file"
            id={id}
            onChange={(e) => {
              onChange(e);
              handleChange(e);
            }}
            {...rest}
            ref={(e) => {
              ref(e);
              fileRef.current = e;
            }}
          />
          <input type="hidden" id="removeImage" {...register('removeImage')} />
        </div>
      </div>
    </div>
  );
}

export default ImageFile;
