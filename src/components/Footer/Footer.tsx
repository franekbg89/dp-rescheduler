import styles from "./Footer.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.container}>
      <img
        className={styles.logo}
        src="/src/assets/logo.svg"
        alt="Docplanner logo"
      />
    </footer>
  );
};
