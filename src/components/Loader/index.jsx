import styles from "./loader.module.css";

const Loader = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className={styles.imageContainer}>
        <img
          width={1024}
          height={1024}
          src={"images/logo/bilaspur-police-logo.png"}
          alt="Logo"
        />
      </div>
    </div>
  );
};

export default Loader;
