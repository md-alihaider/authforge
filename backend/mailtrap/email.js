import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify Your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken,
      ),
      category: "Email Verification",
    });
    console.log("Email sent successfully", response);
  } catch (error) {
    console.log(`Error in sending email: ${error.message}`);
    throw new Error(`Error in sending email: ${error.message}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "259781f5-04fa-4ce9-a0fb-baf39d1eec4e",
      template_variables: {
        company_info_name: "AuthForge Company",
        name: name,
      },
    });
    console.log("Email sent successfully", response);
  } catch (error) {
    console.log(`Error in sending email: ${error.message}`);
    throw new Error(`Error in sending email: ${error.message}`);
  }
};
