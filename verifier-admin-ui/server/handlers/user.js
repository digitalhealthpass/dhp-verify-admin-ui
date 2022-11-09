/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

const logger = require('../config/logger').getLogger('user-handler');
const axios = require('../helpers/axiosClient');
const sgMail = require('@sendgrid/mail');

const sendEmail = async ({
  email,
  firstName,
  role,
  customerName,
  orgName,
  baseUrl,
}) => {
  const enableWelcomeEmail = process.env.ENABLE_VERIFIER_WELCOME_EMAIL;
  const senderEmail = process.env.SENDER_EMAIL_ID;
  const sendGridAPIKey = process.env.SENDGRID_API_KEY;

  if (!!enableWelcomeEmail) {
    // Environment not setup correctly
    if (!sendGridAPIKey || !senderEmail) {
      logger.error('Missing Sendgrid configuration');
      return false;
    } else {
      try {
        if (role === 'custadmin') {
          subject = 'Welcome to Digital Health Pass';
          text = `Hello ${firstName},

					${customerName} has assigned you as a Customer Administrator in the Digital Health Pass Verifier Portal.
					You will receive an e-mail from no-reply@yourcompany.com requesting that you reset your password.
					Once you have reset your password, you can log into the Verifier Portal at the following url: https://${baseUrl}
						
					Additional documentation can be found in the Digital Health Pass Administration Guide:
					https://${baseUrl}/admin.pdf
					
					Regards,	
					Digital Health Pass Verifier Portal`;

          html = `<p>Hello ${firstName},<br><br>
					${customerName} has assigned you as a Customer Administrator in the Digital Health Pass Verifier Portal.<br>
					You will receive an e-mail from <i>no-reply@yourcompany.com</i> requesting that you reset your password.<br>
					Once you have reset your password, you can log into the <a href="https://${baseUrl}">Verifier Portal</a>.<br><br>
					Additional documentation can be found in the <a href="https://${baseUrl}/admin.pdf"> Digital Health Pass Administration Guide</a>
					<br><br>
					Regards,<br>
					Digital Health Pass Verifier Portal</p>`;
        } else {
          subject = 'Welcome to Digital Health Pass';

          text = `Hello ${firstName},

					${customerName} has assigned you as an Organization Administrator for ${orgName} in the Digital Health Pass Verifier Portal.
					You will receive an e-mail from no-reply@yourcompany.com requesting that you reset your password.
					Once you have reset your password, you can log into the Verifier Portal at the following url: https://${baseUrl}
						
					Additional documentation can be found in the Digital Health Pass Administration Guide:
					https://${baseUrl}/admin.pdf
						
					Regards,
					Digital Health Pass Verifier Portal`;

          html = `<p>Hello ${firstName},<br><br>
					${customerName} has assigned you as an Organization Administrator for ${orgName} in the Digital Health Pass Verifier Portal.<br>
					You will receive an e-mail from <i>no-reply@yourcompany.com</i> requesting that you reset your password.<br>
					Once you have reset your password, you can log into the <a href="https://${baseUrl}">Verifier Portal</a>.<br><br>
					Additional documentation can be found in the <a href="https://${baseUrl}/admin.pdf">Digital Health Pass Administration Guide</a>
					<br><br>
					Regards,<br>
					Digital Health Pass Verifier Portal</p>`;
        }

        sgMail.setApiKey(sendGridAPIKey);
        const mail = {
          to: email,
          from: senderEmail,
          subject,
          text,
          html,
        };
        await sgMail.send(mail);
        return true;
      } catch (error) {
        return false;
      }
    }
  }
};

exports.addUser = async (request, response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      role,
      customerId,
      customerName,
      orgId,
      orgName,
      baseUrl,
    } = request.body;

    const client = axios.getVerifierClient(request);
    const apiResponse = await client.post('/admin/onboarding/user', {
      role,
      customerId,
      orgId,
      firstName,
      lastName,
      email,
    });

    const emailResponse = await sendEmail({
      email,
      firstName,
      role,
      customerName,
      orgName,
      baseUrl,
    });
    apiResponse.data.data.emailed = emailResponse;

    return response.status(apiResponse.status).send(apiResponse.data);
  } catch (error) {
    return response
      .status(error.response.status)
      .send(error.response.statusText);
  }
};

exports.deleteUser = async (request, response) => {
  try {
    const { email, userId } = request.body;

    const client = axios.getVerifierClient(request);
    const apiResponse = await client.delete('/admin/onboarding/user', {
      data: request.body,
    });
    return response.status(apiResponse.status).send(apiResponse.data);
  } catch (error) {
    return response
      .status(error.response.status)
      .send(error.response.statusText);
  }
};

exports.listUsers = async (request, response) => {
  try {
    const { custId, orgId } = request.query;

    const client = axios.getVerifierClient(request);
    const URL = orgId
      ? `/admin/onboarding/user?orgId=${orgId}`
      : `/admin/onboarding/user?custId=${custId}`;
    const apiResponse = await client.get(URL);

    return response.status(apiResponse.status).send(apiResponse.data);
  } catch (error) {
    return response
      .status(error.response.status)
      .send(error.response.statusText);
  }
};

exports.resetPassword = async (request, response) => {
  try {
    const { userId } = request.body;

    const client = axios.getVerifierClient(request);
    const apiResponse = await client.put('/admin/onboarding/user', { userId });
    return response.status(apiResponse.status).send(apiResponse.data);
  } catch (error) {
    return response
      .status(error.response.status)
      .send(error.response.statusText);
  }
};
