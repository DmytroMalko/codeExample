import styles from "./input.module.scss";

type Props = {
  onChange: (value: string) => void;
  type?: string;
  value?: string | number;
  defaultValue?: string | number;
};

const Input = ({ onChange, type, value, defaultValue, ...rest }: Props) => {
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
        defaultValue={defaultValue}
      />
    </div>
  );
};

Input.defaultProps = {
  type: "text",
};

export default Input;
