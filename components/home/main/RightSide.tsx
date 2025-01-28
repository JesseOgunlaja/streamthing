import styles from "@/styles/home/page.module.css";
import { BookA, BookText, Power, SquareLibrary } from "lucide-react";
import { AnimationCanvas } from "../AnimationCanvas";

const RightSide = () => {
  return (
    <article className={styles["right-side"]}>
      <div>
        <Power />
        <p>Initiate connection</p>
      </div>
      <div>
        <span>
          <BookA />
        </span>
        <p>status STRING</p>
      </div>
      <div>
        <span>
          <BookText />
        </span>
        <p>user JSON</p>
      </div>
      <div>
        <span>
          <SquareLibrary />
        </span>
        <p>messages ARRAY</p>
      </div>
      <AnimationCanvas />
      <div>
        <div className={styles.status}>
          <p>Status: GOOD</p>
          <p>status STRING</p>
        </div>
        <div className={styles.messages}>
          <div className={styles.message}></div>
          <div className={styles.message}></div>
          <div className={styles.message}></div>
          <div className={styles.message}></div>
          <div className={styles.message}></div>
          <div className={styles.message}></div>
          <p>messages ARRAY</p>
        </div>
        <div className={styles.topLine}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {/*
      <Server />
      <LaptopMinimal />
      <LaptopMinimal />
      <MoveUpRight />
      <MoveDownRight />
      <LeftCanvas /> */}
    </article>
  );
};

export default RightSide;
