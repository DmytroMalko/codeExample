import styles from "./input.module.scss";

type Props = {
  onChange: (value: string) => void;
  type?: string;
  value?: string | number;
};

const Input = ({ onChange, type, value, ...rest }: Props) => {
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    onChange(target.value);
  };

  return (
    <div className={styles.inputContainer}>
      <input
        {...rest}
        className={styles.input}
        onChange={handleChange}
        type={type}
        value={value}
      />
    </div>
  );
};

Input.defaultProps = {
  type: "text",
};

export default Input;
