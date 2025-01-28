import CodeBlock from "../CodeBlock";

const ClientCode = () => {
  return (
    <CodeBlock
      fileName="client.tsx"
      code={`
        import { createClientStream } from "streamthing";

          const stream = createClientStream({
            channel: "main",
            id: env.SERVER_ID,
            region: env.SERVER_REGION,
            password: env.SERVER_PASSWORD,
            encryptionKey: env.SERVER_ENCRYPTION_KEY,
        })

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
