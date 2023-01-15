import { ErrorMessage } from '@hookform/error-message';
import {
  CloseIcon,
  NormalInput,
  Photo,
  TextAreaInput,
  useMovieInputs,
} from 'components';
import Image from 'next/image';
import { Fragment } from 'react';
import { MovieInputsTypes } from './movieInputsTypes';

const MovieInputs: React.FC<MovieInputsTypes> = ({
  handleSubmit,
  register,
  onSubmit,
  errors,
  handleFileUpload,
  getValues,
  setModel,
}) => {
  const { t, name, image } = useMovieInputs();

  return (
    <Fragment>
      <div
        onClick={() => setModel(false)}
        className='h-screen w-screen fixed top-0 left-0 z-20 backdrop-filter backdrop-blur-main-page '
      />
      <div className='lg:w-[60rem] lg:h-[calc(100vh_-_9rem)] z-30 lg:max-h-[70rem]  fixed overflow-scroll overflow-x-hidden  top-0 lg:top-28 left-1/2 translate-x-[-50%] w-screen h-screen bg-neutral-950 rounded-xl backdrop-filter backdrop-blur-user-page rotate--180'>
        <div className='w-full flex px-8 py-10 border-b border-b-border-transparent items-center justify-between'>
          <div />
          <h1 className='text-white text-xl lg:text-2xl leading-[150%] font-medium'>
            {t('user.allMovies.addMovie')}
          </h1>
          <div onClick={() => setModel(false)} className='cursor-pointer'>
            <CloseIcon />
          </div>
        </div>
        <div className='ml-8 mt-8 mb-4 flex items-center gap-4'>
          {image && (
            <Image
              src={image}
              alt='author-image'
              width={60}
              height={60}
              className='rounded-full w-[3.75rem] h-[3.75rem]'
            />
          )}
          <h1 className='text-white text-xl = leading-[150%] font-medium'>
            {name}
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='mx-8'>
          <NormalInput
            type='text'
            register={register}
            name={'name-en'}
            text={t('form.login.required')}
            placeholder='Movie name'
            labelText='Eng'
          />

          <div className='text-red-550 h-5 font-normal text-base leading-[150%] my-1 '>
            <ErrorMessage errors={errors} name='name-en' />
          </div>

          <NormalInput
            type='text'
            register={register}
            name={'name-ka'}
            text={t('form.login.required')}
            placeholder='ფილმის სახელი'
            labelText='ქარ'
          />

          <div className='text-red-550 h-5 font-normal text-base leading-[150%] my-1 '>
            <ErrorMessage errors={errors} name='name-ka' />
          </div>

          <NormalInput
            type='text'
            register={register}
            name={'director-en'}
            text={t('form.login.required')}
            placeholder='Director'
            labelText='Eng'
          />

          <div className='text-red-550 h-5 font-normal text-base leading-[150%] my-1 '>
            <ErrorMessage errors={errors} name='director-en' />
          </div>

          <NormalInput
            type='text'
            register={register}
            name={'director-ka'}
            text={t('form.login.required')}
            placeholder='დირექტორი'
            labelText='ქარ'
          />

          <div className='text-red-550 h-5 font-normal text-base leading-[150%] my-1 '>
            <ErrorMessage errors={errors} name='director-ka' />
          </div>

          <NormalInput
            type='number'
            register={register}
            name={'budget'}
            text={t('form.login.required')}
            placeholder={t('user.singleMovie.budget')}
            labelText=''
          />

          <div className='text-red-550 h-5 font-normal text-base leading-[150%] my-1 '>
            <ErrorMessage errors={errors} name='budget' />
          </div>

          <NormalInput
            type='number'
            register={register}
            name={'date'}
            text={t('form.login.required')}
            placeholder={t('user.singleMovie.date')}
            labelText=''
          />

          <div className='text-red-550 h-5 font-normal text-base leading-[150%] my-1 '>
            <ErrorMessage errors={errors} name='date' />
          </div>

          <TextAreaInput
            register={register}
            name={'description-en'}
            text={t('form.login.required')}
            placeholder='Movie description'
            labelText='Eng'
          />

          <div className='text-red-550 h-5 font-normal text-base leading-[150%] mb-1 '>
            <ErrorMessage errors={errors} name='description-en' />
          </div>

          <TextAreaInput
            register={register}
            name={'description-ka'}
            text={t('form.login.required')}
            placeholder='ფილმის აღწერა'
            labelText='ქარ'
          />

          <div className='text-red-550 h-5 font-normal text-base leading-[150%] mb-1 '>
            <ErrorMessage errors={errors} name='description-ka' />
          </div>

          <div className='relative w-full h-[5.25rem] border border-gray-550 rounded-md'>
            <input
              type='file'
              accept='image/*'
              multiple
              onChange={(e) => handleFileUpload(e.target.files)}
              className='w-full h-[5.25rem] opacity-0 z-50 absolute top-0 left-0'
            />

            <div className='w-full h-[5.25rem] absolute top-0 flex justify-start gap-2 items-center px-4'>
              <div className='flex justify-center items-center gap-2'>
                <Photo />
                <h1 className='hidden text-xl lg:inline text-white leading-[150%]'>
                  {t('user.singleMovie.drag')}
                </h1>
                <h1 className='text-base inline lg:hidden text-white leading-[150%]'>
                  {t('user.singleMovie.upload')}
                </h1>
              </div>
              <h1 className='bg-purple-150 text-white text-xl leading-6 p-2'>
                {t('user.singleMovie.chooseFile')}
              </h1>
            </div>
          </div>
          <div className='text-red-550 h-5 font-normal text-base leading-[150%] my-1 z-50 '>
            <ErrorMessage errors={errors} name='image' />
          </div>

          {getValues().image !== '' && (
            <Image
              src={
                typeof getValues().image === 'string'
                  ? (getValues().image as string)
                  : URL.createObjectURL(getValues().image as Blob)
              }
              alt='uploaded-photo'
              width={900}
              height={500}
              className='lg:w-[56.25rem] lg:h-[31.875rem] mb-5 w-full h-auto object-cover rounded-xl'
            />
          )}

          <button
            type='submit'
            className='bg-red-650 mb-5  hover:bg-red-750 text-white text-xl  h-[2.375rem]  leading-[150%]  w-full rounded-md '
          >
            {t('user.allMovies.addMovie')}
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default MovieInputs;