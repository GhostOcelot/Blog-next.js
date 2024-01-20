import Image from 'next/image';
import classes from './hero.module.css';

const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/headshot.jpg"
          alt="an image show the author portrait"
          width={500}
          height={500}
        />
      </div>
      <h1>Hi, I'm Łukasz</h1>
      <p>I blog about web development. I specialise in React.</p>
    </section>
  );
};

export default Hero;
