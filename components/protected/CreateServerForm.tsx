import { createServer } from "@/actions/servers/create";
import { regions } from "@/constants/constants";
import { promiseToast } from "@/lib/lib";
import { FormSubmit, GenericFunction } from "@/lib/types";
import { getFormValues } from "@/lib/utils";
import styles from "@/styles/protected/home/layout/layout.module.css";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface PropsType {
  closeDialog: GenericFunction;
}

const CreateServerForm = ({ closeDialog }: PropsType) => {
  const router = useRouter();

  async function formSubmit(e: FormSubmit) {
    e.preventDefault();

    const formValues = getFormValues(e);
    const serverName = formValues["new-server-name"];
    const region = formValues["new-server-region"];

    const promise = new Promise((resolve, reject) => {
      createServer(serverName, region).then((res) => {
        const message = res.message as string;
        if (res.ok) {
          resolve(message);
        } else {
          reject(message);
        }
      });
    });

    promiseToast(promise, {
      successFunction: () => {
        closeDialog();
        router.refresh();
      },
      errorFunction: router.refresh,
    });
  }
  return (
    <form onSubmit={formSubmit}>
      <p>Create your server</p>
      <label htmlFor="create-server-text-input">Name</label>
      <input
        autoComplete="off"
        name="new-server-name"
        id="create-server-text-input"
        type="text"
      />
      <label htmlFor="create-server-region-input">Region</label>
      <select name="new-server-region" id="create-server-region-input">
        <option value="us3">us3 ({regions.us3})</option>
        <option value="eus">eus ({regions.eus})</option>
      </select>
      <div className={styles.buttons}>
        <button type="reset" onClick={closeDialog}>
          <X />
        </button>
        <button>Create server</button>
      </div>
    </form>
  );
};

export default CreateServerForm;
