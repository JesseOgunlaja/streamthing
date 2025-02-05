interface PropsType {
  link: string;
  descriptionText?: string;
  linkText?: string;
  duration?: string;
}

const EmailComponent = ({
  link,
  descriptionText = "Verify your email address",
  linkText = "Confirm email",
  duration = "1 hour",
}: PropsType) => {
  return (
    <html>
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font*/}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <style>{`
          * {
            font-family: 'Poppins', sans-serif;
          }
          .page {
            background: #f1f1f1;
            padding: 50px;
          }
          .email-container {
            border-top: rgb(0, 140, 255) 2px solid;
            border-bottom: rgb(0, 140, 255) 2px solid;
            border-radius: 15px;
            margin: 0 auto;
            padding: 50px 30px;
            padding-bottom: 40px;
            width: 65%;
            background: white;
            color: black;
            font-size: 18px;
            border-radius: 7.5px;
          }
          .logo {
            height: 70px;
            width: 70px;
            display: block;
            margin: 0 auto;
          }
          .title {
            text-align: center;
            font-size: 25px;
            font-weight: 500;
            margin: 0;
          }
          .description {
            font-size: 16px;
            text-align: center;
            color: rgba(0, 0, 0, 0.5);
            margin-top: 5px;
            margin-bottom: 10px;
          }
          .button {
            display: block;
            text-decoration: none;
            color: white !important;
            padding: 10px 15px;
            border-radius: 5px;
            font-size: 20px;
            background: rgb(0, 115, 195);
            margin: 25px auto;
            width: fit-content;
          }
          .divider {
            width: 90%;
            height: 1px;
            background: #ddd;
            margin: 10px 0;
          }
          .expiry {
            text-align: center;
            color: black;
            margin: 0 auto;
            margin-top: 5px;
            font-size: 18px;
            color: rgba(0, 0, 0, 0.5);
          }
          .disclaimer {
            margin-top: 5px !important;
            text-align: center;
            color: black;
            margin: 0 auto;
            font-size: 16px;
            color: rgba(0, 0, 0, 0.5);
          }
        `}</style>
      </head>
      <body>
        <div className="page">
          <div className="email-container">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="logo"
              src="streamthing.dev/light-theme-logo.png"
              alt="Logo"
            />
            <h1 className="title">Welcome to Streamthing!</h1>
            <p className="description">{descriptionText}</p>
            <a href={link} className="button">
              {linkText}
            </a>
            <div className="divider"></div>
            <p className="expiry">This link will expire in {duration}.</p>
          </div>
          <p className="disclaimer">
            If you didn&apos;t request this, you can safely delete this email
          </p>
        </div>
      </body>
    </html>
  );
};

export default EmailComponent;
