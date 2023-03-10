import {
  LandingTop,
  LandingPictureAnimation,
  Navbar,
  Login,
  Footer,
  ForgotPassword,
  EmailSent,
  Registration,
  SuccessMessage,
  NewPassword,
  PasswordChangeSuccess,
} from 'components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { useFormChooser } from 'hooks';
import { Fragment } from 'react';
import Head from 'next/head';

export default function Home() {
  const { whichForm, setWhichForm, query } = useFormChooser();

  return (
    <Fragment>
      <Head>
        <title>Movie Quotes</title>
      </Head>
      <div
        className={`${
          whichForm !== '' &&
          'fixed w-screen overflow-hidden md:static md:w-auto md:overflow-visible'
        }`}
      >
        <Navbar setWhichForm={setWhichForm} />
        <LandingTop setWhichForm={setWhichForm} />
        <LandingPictureAnimation />
        {whichForm === 'login' ? (
          <Login setWhichForm={setWhichForm} />
        ) : whichForm === 'forgot' ? (
          <ForgotPassword setWhichForm={setWhichForm} />
        ) : whichForm === 'forgot-sent' ? (
          <EmailSent
            setWhichForm={setWhichForm}
            header={'form.verify.headerOne'}
            main={'form.verify.mainOne'}
            goToEmail={'form.verify.goToEmail'}
            skip={'form.verify.skip'}
          />
        ) : whichForm === 'registration' ? (
          <Registration setWhichForm={setWhichForm} />
        ) : whichForm === 'registration-sent' ? (
          <EmailSent
            setWhichForm={setWhichForm}
            header={'form.verify.headerTwo'}
            main={'form.verify.mainTwo'}
            goToEmail={'form.verify.goToEmail'}
          />
        ) : (
          <></>
        )}

        {(query['register-link'] || whichForm === 'email-verified') && (
          <SuccessMessage
            setWhichForm={setWhichForm}
            header={'form.successMessage.headerOne'}
            mainText={'form.successMessage.mainOne'}
            goToLogin={'form.successMessage.button'}
          />
        )}

        {query['reset-link'] && <NewPassword setWhichForm={setWhichForm} />}

        {query['password-change'] && (
          <PasswordChangeSuccess setWhichForm={setWhichForm} />
        )}
        <Footer />
      </div>
    </Fragment>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  };
};
