import CodeBlock from "../CodeBlock";

const ServerCode = () => {
  return (
    <CodeBlock
      fileName="server.ts"
      code={`
        import { createServerStream } from 'streamthing';

        // Initialize stream out of route handler for better performance
        const stream = createServerStream({
          id: process.env.SERVER_ID,
          region: process.env.SERVER_REGION,
          password: process.env.SERVER_PASSWORD,
          channel: "main",
        });

        // Route handler
        let request, response; // Sample request and response
        const { event, message } = request.body;

        const { user } = await auth(request)
        if(!user) return response.json({error: "Unauthenticated"}, 401)

        await stream.send(event, message);
        return response.json({message: "Success"}, 200)
      `}
    />
  );
};

export default ServerCode;
