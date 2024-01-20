import classes from './contact-form.module.css';
import { useContext, useEffect, useRef } from 'react';
import notificationContext from '../../store/notification-context';
import Notification from '../../components/ui/notification';

const ContactForm = () => {
  const { notification, handleHideNotification, handleShowNotification } =
    useContext(notificationContext);

  useEffect(() => {
    if (['success', 'error'].includes(notification.status)) {
      const timer = setTimeout(() => handleHideNotification(), 2000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const { message, status, title } = notification;

  const emailRef = useRef();
  const nameRef = useRef();
  const contentRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    handleShowNotification({ title: 'Saving...', message: '', status: 'pending' });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const formData = JSON.stringify({
      email: emailRef.current.value,
      name: nameRef.current.value,
      content: contentRef.current.value,
    });

    const res = await fetch('/api/contact', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'aplication/json',
      },
    });

    if (!res.ok) {
      handleShowNotification({
        title: 'Message not sent',
        message: 'Please try again later',
        status: 'error',
      });
    } else {
      const data = await res.json();
      handleShowNotification({ title: 'Success', message: 'Message sent', status: 'success' });
      console.log(data);
    }
  };

  return (
    <>
      <section className={classes.contact}>
        <h1>How can I help you?</h1>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.controls}>
            <div className={classes.control}>
              <label htmlFor="email"></label>
              <input type="email" id="email" required ref={emailRef} />
            </div>

            <div className={classes.control}>
              <label htmlFor="name"></label>
              <input type="text" id="name" required ref={nameRef} />
            </div>
          </div>
          <div className={classes.control}>
            <label htmlFor="message">Your message content</label>
            <textarea name="message" id="message" rows="5" ref={contentRef}></textarea>
          </div>

          <button>Send Message</button>
        </form>
      </section>
      {status !== 'idle' && <Notification title={title} message={message} status={status} />}
    </>
  );
};

export default ContactForm;
