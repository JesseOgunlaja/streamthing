import CodeBlock from "../CodeBlock";

const ServerCode = () => {
  return (
    <CodeBlock
      fileName="server.ts"
      code={`
        import { createServerStream } from 'streamthing';

        // Initialize stream out of route handler for better performance
        const stream = createServerStream({
          channel: "main",
          id: env.SERVER_ID,
          region: env.SERVER_REGION,
          password: env.SERVER_PASSWORD,
        });

        // Route handler
        let request, response; // Sample request and response
        const { event, message } = request.body;

        const { user } = await auth(request)
        if(!user) {
          return response.json({error: "Unauthenticated"}, 401)
        }

        await stream.send(event, message);
        return response.json({message: "Success"}, 200)
      `}
    />
  );
};

export default ServerCode;
