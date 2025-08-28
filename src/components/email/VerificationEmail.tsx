import {
  Body,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  //   Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface WeCareVerifyEmailProps {
  name: string;
  verificationCode: string;
}

export default function WeCareVerifyEmail({
  verificationCode,
}: Readonly<WeCareVerifyEmailProps>) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <Font fontFamily="Poppind" fallbackFontFamily="Verdana" />
      </Head>
      <Preview>AWS Email Verification</Preview>
      <Body className="bg-white text-gray-800">
        <Container className="p-5 mx-auto bg-gray-200">
          <Section className="bg-white">
            {/* <Section className="bg-gray-800 flex p-5 items-center justify-center">
              <Img
                src={`${baseUrl}/static/aws-logo.png`}
                width="75"
                height="45"
                alt="AWS's Logo"
              />
            </Section> */}
            <Section className="p-6 md:p-9">
              <Heading className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                Verify your email address
              </Heading>
              <Text className="text-gray-700 text-sm md:text-base my-6">
                Thanks for starting the new AWS account creation process. We
                want to make sure it&apos;s really you. Please enter the
                following verification code when prompted. If you don&apos;t
                want to create an account, you can ignore this message.
              </Text>
              <Section className="flex items-center justify-center">
                <Text className="text-sm md:text-base font-bold text-center text-gray-700">
                  Verification code
                </Text>
                <Text className="text-3xl md:text-4xl font-bold text-center text-gray-700 my-2">
                  {verificationCode}
                </Text>
                <Text className="text-sm md:text-base text-center text-gray-700">
                  (This code is valid for 10 minutes)
                </Text>
              </Section>
            </Section>
            <Hr className="border-t border-gray-300" />
            <Section className="p-6 md:p-9">
              <Text className="text-sm md:text-base text-gray-700">
                Amazon Web Services will never email you and ask you to disclose
                or verify your password, credit card, or banking account number.
              </Text>
            </Section>
          </Section>
          <Text className="text-xs md:text-sm text-gray-700 px-5">
            This message was produced and distributed by Amazon Web Services,
            Inc., 410 Terry Ave. North, Seattle, WA 98109. © 2022, Amazon Web
            Services, Inc. All rights reserved. AWS is a registered trademark of{" "}
            <Link
              href="https://amazon.com"
              target="_blank"
              className="text-blue-600 underline"
            >
              Amazon.com
            </Link>
            , Inc. View our{" "}
            <Link
              href="https://amazon.com"
              target="_blank"
              className="text-blue-600 underline"
            >
              privacy policy
            </Link>
            .
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
