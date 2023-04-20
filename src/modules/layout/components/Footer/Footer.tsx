import cls from './Footer.module.scss';
import git from '../../../../assets/logo/github-logo.svg';
import rs from '../../../../assets/logo/rs-school.svg';

const Footer = () => {
  return (
    <footer className={cls.container}>
      <div className={cls.footer}>
        <div className={cls.item}>
          <a href="https://github.com/sekaa4/" target="_blank" rel="noreferrer">
            <img className={cls.img} src={git} alt="github" />
          </a>
        </div>
        <div className={cls.item}>All Rights Reserved © RS School, 2023</div>
        <div className={cls.item}>
          <a href="https://rs.school/react/" target="_blank" rel="noreferrer">
            <img className={cls.img} src={rs} alt="rsschool" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
