import React from "react";
import styles from "./FormInput.module.css";

const FormInput = ({ titel, type, name, id, placeholder, ref }) => {
  return (
    <>
      <div className={styles.formFlex}>
        <label htmlFor={name} className={styles.formLabel}>
          {titel}
        </label>
        <input
          type={type}
          name={name}
          id={id}
          ref={ref}
          placeholder={placeholder}
          className={styles.formInput}
        />
      </div>
    </>
  );
};

export default FormInput;
