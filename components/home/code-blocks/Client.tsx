import CodeBlock from "../CodeBlock";

const ClientCode = () => {
  return (
    <CodeBlock
      fileName="client.tsx"
      code={`
        import { createClientStream } from "streamthing";

          const stream = await createClientStream(env.SERVER_REGION)
          const res = await fetch("/api/get-token?id=" + stream.id);
          const { token } = await res.json();

          // Authenticate stream
          stream.authenticate(token);

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
