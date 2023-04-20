import FormContainer from 'modules/form-container/components/FormContainer/FormContainer';
import cls from './Form.module.scss';

const Form = () => {
  return (
    <section className={cls.form}>
      <h2>Form Page</h2>
      <FormContainer />
    </section>
  );
};

export default Form;
