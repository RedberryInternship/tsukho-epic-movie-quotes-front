import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { Fragment } from 'react';

const NotAllowedPage = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Head>
        <title>Movie Quotes - 403</title>
      </Head>
      <div className='bg-main-gradient h-screen flex flex-col items-center'>
        <div className='relative lg:mt-[15.125rem] mt-[7.875rem] w-[21.563rem] h-[16.313rem] '>
          <Image
            src={'/assets/imgs/gendalf.png'}
            width={121}
            height={137}
            alt='error ghost'
            className=' w-[21.563rem] h-[16.313rem] z-20 absolute top-0'
            priority
          />
          <Image
            src={'/assets/imgs/union.png'}
            width={121}
            height={137}
            alt='error ghost'
            className='w-[14.625rem] h-[9.125rem] absolute top-[4.375rem] z-10 left-[3.438rem]'
            priority
          />
        </div>
        <h1 className='lg:text-[2.938rem] text-2xl text-white mt-[1.75rem] leading-9.5 font-bold'>
          {t('403.mainText')}
        </h1>
        <h1 className='text-white leading-9.5 text-base lg:text-2xl font-medium mt-4 lg:mt-2 mb-8 lg:mb-[2.938rem]'>
          {t('403.noEntry')}
        </h1>
        <Link
          href={'/'}
          className='bg-red-650 text-white text-base lg:text-xl leading-9.5 py-2 lg:py-2.5 px-7 lg:px-4 rounded-md '
        >
          {t('404.return')}
        </Link>
      </div>
    </Fragment>
  );
};

export default NotAllowedPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  };
};
