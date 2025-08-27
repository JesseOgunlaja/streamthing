import CodeBlock from "../CodeBlock";

const ClientCode = () => {
  return (
    <CodeBlock
      fileName="client.tsx"
      code={`
            import { createClientStream } from "streamthing";

            const res = await fetch("/api/get-streamthing-token");
            const data = await res.json();

            const stream = createClientStream({
              region: process.env.SERVER_REGION,
              id: process.env.SERVER_ID,
              token: data.token,
            });

            stream.receive("event", (message) => {
              console.log(message);
            });

            // Close to avoid hanging connections
            stream.disconnect()
          `}
    />
  );
};

export default ClientCode;
