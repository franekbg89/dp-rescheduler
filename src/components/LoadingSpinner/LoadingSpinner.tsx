import { ImSpinner3 } from "react-icons/im";

import styles from "./LoadingSpinner.module.scss";
import { IconBaseProps } from "react-icons";

export const LoadingSpinner = (props: IconBaseProps) => (
  <ImSpinner3 className={styles.spinner} {...props} />
);
