import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";

import styles from "./styles.module.scss";

export function SignInButton() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const handleClickLogin = () => {
    setIsUserLoggedIn(!isUserLoggedIn);
  };

  return isUserLoggedIn ? (
    <button
      type="button"
      className={styles.singInButton}
      onClick={handleClickLogin}
    >
      <FaGithub color="#04d361" />
      Nalisson Gomes
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      type="button"
      className={styles.singInButton}
      onClick={handleClickLogin}
    >
      <FaGithub color="#eba417" />
      Sign in with Github
    </button>
  );
}
