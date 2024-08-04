import { useState } from 'react';
import Modal from '../General/Modal';
import ModelForm from './ModelForm';
import useFormAction from '../../hooks/useFormAction';
import deleteFetcher from '../../fetchers/deleteFetcher';
import Typography from '../General/Typography';

function ModalContent({ type, suffixUrl, redirectPath, setHoldModal }) {
  const formAction = useFormAction(suffixUrl, deleteFetcher);

  return (
    <>
      <div className="relative h-56 w-full rounded-md bg-white p-10 ring-1 ring-slate-300 sm:w-96">
        <div className="relative flex w-full flex-col items-center justify-center">
          <Typography>Are you sure?</Typography>
          <ModelForm
            buttonText={`Permanently Delete ${type}`}
            formAction={formAction}
            successMsg={`Successfully Deleted! You're being redirected...`}
            redirectPath={redirectPath}
            submitColor="red"
            centered={true}
            setHoldModal={setHoldModal}
          />
        </div>
      </div>
    </>
  );
}

function DeleteForm({ type, suffixUrl, redirectPath }) {
  const [overlay, setOverlay] = useState(false);
  const [holdModal, setHoldModal] = useState(false);

  return (
    <div>
      <div className="flex justify-between sm:max-w-sm">
        <button
          onClick={() => setOverlay(true)}
          type="button"
          className="text-md rounded-md bg-red-500 px-6 py-2 font-bold text-white shadow-sm hover:bg-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 disabled:bg-red-300">
          Delete {type}
        </button>
      </div>
      {(overlay || holdModal) && (
        <Modal close={() => setOverlay(false)}>
          <ModalContent
            type={type}
            suffixUrl={suffixUrl}
            redirectPath={redirectPath}
            setHoldModal={setHoldModal}
          />
        </Modal>
      )}
    </div>
  );
}

export default DeleteForm;
