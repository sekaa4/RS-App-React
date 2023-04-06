import cls from './Button.module.scss';

interface ButtonProps {
  handleClick?: () => void;
  text?: string;
  refSubmit?: React.RefObject<HTMLInputElement | HTMLButtonElement>;
}

const Button = (props: ButtonProps) => {
  const { handleClick, refSubmit, text = 'Button' } = props;

  if (refSubmit) {
    return (
      <button
        type="submit"
        className={[cls.button, cls['button-submit']].join(' ')}
        ref={refSubmit as React.RefObject<HTMLButtonElement>}
      >
        {text}
      </button>
    );
  }

  return (
    <button type="button" onClick={handleClick} className={cls.button}>
      {text}
    </button>
  );
};

export default Button;
