import Head from 'next/head';
import ContactForm from '../../components/contact/contact-form';

const ContactPage = () => {
  return (
    <>
      <Head>
        <title>Contact</title>
        <meta name="description" content="contact page" />
      </Head>
      <ContactForm />;
    </>
  );
};

export default ContactPage;
