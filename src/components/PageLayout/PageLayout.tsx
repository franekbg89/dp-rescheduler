import { Footer } from "../Footer";

import styles from "./PageLayout.module.scss";

type PageLayoutProps = {
  children: React.ReactNode;
};

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className={styles.container}>
      <main className={styles.content}>{children}</main>
      <Footer />
    </div>
  );
};
