import styles from "@/styles/home/page.module.css";
import sh from "prettier-plugin-sh";
import esTree from "prettier/plugins/estree";
import html from "prettier/plugins/html";
import ts from "prettier/plugins/typescript";
import prettier from "prettier/standalone";
import { codeToHtml } from "shiki";
import CodeBlockContent from "./CodeBlockContent";

interface PropsType {
  code: string;
  lang?: string;
  fileName?: string;
}

const languagesToFormat = ["javascript", "tsx", "typescript", "html"];

const CodeBlock = async ({
  code,
  lang = "javascript",
  fileName,
}: PropsType) => {
  const formattedCode = languagesToFormat.includes(lang)
    ? await prettier.format(code, {
        parser: lang === "html" ? "html" : "typescript",
        plugins: [esTree, sh, ts, html],
      })
    : code;

  const lightHtml = await codeToHtml(formattedCode.trim(), {
    lang: lang,
    theme: `github-light`,
  });

  const darkHtml = await codeToHtml(formattedCode.trim(), {
    lang: lang,
    theme: `github-dark`,
  });

  return (
    <div className={styles.codeBlock}>
      {fileName && <p className={styles.fileName}>{fileName}</p>}

      <CodeBlockContent lightHtml={lightHtml} darkHtml={darkHtml} />
    </div>
  );
};

export default CodeBlock;
