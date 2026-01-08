import CodeBlock from "../CodeBlock";

const ServerCode = () => {
    return (
        <CodeBlock
            fileName="server.ts"
            code={`
        import { createServerStream } from 'streamthing';

        // Initialize stream out of route handler for better performance
        const stream = await createServerStream({
          id: process.env.SERVER_ID,
          region: process.env.SERVER_REGION,
          password: process.env.SERVER_PASSWORD,
        });

        // Route handler
        let request, response; // Sample request and response
        const { event, message } = request.body;

        const { user } = await auth(request)
        if(!user) {
          return response.json({error: "Unauthenticated"}, 401)
        }
        const channel = user.id // Derive channel from user

        await stream.send(channel, event, message);
        return response.json({message: "Success"}, 200)
      `}
        />
    );
};

export default ServerCode;
