import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { emailRegex } from 'config';
import { addAdditionalEmail, updateUserInfo } from 'services';
import { updateUserData } from 'state';
import { ProfileFormTypes, UserAllInfoTypes } from 'types';

const useProfilePageDesktop = (data: UserAllInfoTypes) => {
  const { t } = useTranslation();
  const [isNameEditOpen, setIsNameEditOpen] = useState<boolean>(false);
  const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);
  const [isPasswordEditOpen, setIsPasswordEditOpen] = useState<boolean>(false);
  const [isAddEmailOpen, setIsAddEmailOpen] = useState<boolean>(false);

  const dispatch = useDispatch();

  const {
    register,
    getValues,
    control,
    setValue,
    setError,
    formState: { errors, isValid },
  } = useForm<ProfileFormTypes>({
    mode: 'onChange',
    defaultValues: { image: data.image, name: data.name, email: '' },
  });

  useWatch({ control, name: ['image'] });

  const handleFileUpload = (imageData: FileList | null) => {
    if (imageData !== null) {
      if (imageData[0]) {
        setValue('image', imageData[0]);
        setIsFileUploaded(true);
      }
    }
  };

  const closeForms = () => {
    setIsFileUploaded(false);
    setIsNameEditOpen(false);
    setIsPasswordEditOpen(false);
    setIsAddEmailOpen(false);
  };

  const cancelChanges = () => {
    setValue('image', data.image);
    setValue('name', data.name);
    setValue('email', '');
    setValue('password', '');
    setValue('password_confirmation', '');
    closeForms();
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation(updateUserInfo, {
    onSuccess: (data) => {
      dispatch(updateUserData(data.data));
      queryClient.invalidateQueries('profile-info');
    },
  });

  const submitChanges = () => {
    if (
      isPasswordEditOpen &&
      (getValues().password === '' || getValues().password_confirmation === '')
    ) {
      setError('password', {
        type: 'custom',
        message: t('form.login.required')!,
      });
      setError('password_confirmation', {
        type: 'custom',
        message: t('form.login.required')!,
      });
    }
    if (!isValid) return;
    const formData = new FormData();

    formData.append('image', getValues().image);
    formData.append('name', getValues().name);
    formData.append('password', getValues().password);

    mutate(formData);
    closeForms();
  };

  const { mutate: addEmailMutation } = useMutation(addAdditionalEmail, {
    onSuccess: () => {
      queryClient.invalidateQueries('profile-info');
    },
  });

  const submitEmail = () => {
    if (!emailRegex.test(getValues().email)) {
      setError('email', {
        type: 'custom',
        message: t('form.forgotPassword.inputEmail')!,
      });
      return;
    }

    if (data.emails.find((email) => email.email === getValues().email)) {
      setError('email', {
        type: 'custom',
        message: t('user.profile.emailIsUsed')!,
      });
      return false;
    }

    addEmailMutation(getValues().email);
    setValue('email', '');
    closeForms();
  };

  return {
    t,
    register,
    handleFileUpload,
    getValues,
    isNameEditOpen,
    setIsNameEditOpen,
    isFileUploaded,
    isPasswordEditOpen,
    setIsPasswordEditOpen,
    cancelChanges,
    submitChanges,
    errors,
    isAddEmailOpen,
    setIsAddEmailOpen,
    submitEmail,
    setValue,
  };
};

export default useProfilePageDesktop;
