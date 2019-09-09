---
page_type: sample 
products:
- ms-graph
languages:
- nodejs
- javascript
extensions:
  contentType: samples
  technologies:
  - Microsoft Graph
  createdDate: 3/9/2016 4:12:18 PM
---
# Microsoft Graph Webhooks Sample for Node.js

[![Build Status](https://travis-ci.org/microsoftgraph/nodejs-webhooks-rest-sample.svg)](https://travis-ci.org/microsoftgraph/nodejs-webhooks-rest-sample)

## Table Of Contents. ##
* [Introduction](#introduction)

* [Screenshots](#screenshots)

* [Prerequisites](#prerequisites)

* [Register the app](#Register-the-app)

* [Configure a tunnel for your localhost](#Configure-a-tunnel-for-your-localhost)

* [Configure and run the web app](#Configure-and-run-the-web-app)

* [Contributing](#contributing)

* [Questions and Comments](#Questions-and-Comments)

* [Additional resources](#Additional-resources)


## Introduction
<a name="introduction"></a>

This Node.js sample shows how to start getting notifications from Microsoft Graph. The following are common tasks that a web application performs with Microsoft Graph webhooks.

- Sign-in your users with their work or school account to get an access token.
- Use the access token to create a webhook subscription.
- Send back a validation token to confirm the notification URL.
- Listen for notifications from Microsoft Graph.
- Request for more information in Microsoft Office 365 using data in the notification.

## Screenshots
<a name="screenshots"></a>

1. First you need sign in.

    ![sign in](https://user-images.githubusercontent.com/3375461/31968683-c373ad30-b8c6-11e7-9d01-413fab9fd6d5.png)

1. Once signing in, the app will listen to the incoming emails.

    ![listening](https://user-images.githubusercontent.com/3375461/31968718-e19696c4-b8c6-11e7-91f2-f1806be0b134.png)

1. After sending the email to the address, you will see the email in the app.

    ![email](https://user-images.githubusercontent.com/3375461/31968754-0ce4dafc-b8c7-11e7-8458-8152d598228e.png)

## Prerequisites
<a name="prerequisites"></a>

To use the Webhook sample, you need the following:

- [Node.js](https://nodejs.org/) version 4 or 5.
- A [work or school account](http://dev.office.com/devprogram).

## Register the app
<a name="Register-the-app"></a>

This app uses the Azure AD endpoint, so you'll register it in the [Azure Portal](https://ms.portal.azure.com/#blade/Microsoft_AAD_IAM/ApplicationsListBlade).

1. Sign in to the Azure portal using either a work or school account or a personal Microsoft account.
1. If your account gives you access to more than one tenant, select your account in the top right corner, and set your portal session to the desired Azure AD tenant (using Switch Directory).
1. In the left-hand navigation pane, select the **Azure Active Directory service** , and then select **App registrations.**
![](readme-images/registrations.png)

1. Choose **New application registration**.

    1. Enter a friendly name for the application.
    1. Choose 'Web app/API' as the **Application Type**.
    1. Enter `http://localhost:3000/callback` for the **Sign-on URL**.
    1. In the Supported account types section, select Accounts in any organizational directory and personal Microsoft accounts (e.g. Skype, Xbox, Outlook.com).
    1. Click **Create**.

1. Choose your new application from the list of registered applications.
On the app **Overview** page, find the **Application (client) ID** value and record it for later. You'll need it to configure the Visual Studio configuration file for this project. 
![](readme-images/client.png)
1. Configure permissions for your application:

    1. Choose **Settings** > **Required permissions** > **Add**.
    1. Choose **Select an API** > **Microsoft Graph**, and then click **Select**.
    1. Choose **Select permissions**, scroll down to **Delegated Permissions**, choose **Mail.Read**, and then click **Select**.
    1. Click **Done**.
    ![](readme-images/permissions.png)

1. Select **Certificates & secrets** under **Manage**. Select the **New client secret** button. Enter a value in Description and select one of the options for Expires and choose **Add.**

![](readme-images/secrets.png)

1. **Important**: Copy the key value--this is your app's secret. You won't be able to access this value again after you leave this blade.

You'll use the **application ID** and **secret** to configure the app.

## Configure a tunnel for your localhost

The sample uses localhost as the development server. For this reason, we need a tunnel that can forward requests from a URL on the Internet to your localhost. If for any reason, you don't want to use a tunnel, see [Hosting without a tunnel](https://github.com/OfficeDev/Microsoft-Graph-Nodejs-Webhooks/wiki/Hosting-the-sample-without-a-tunnel). If you want a detailed explanation about why to use a tunnel, see [Why do I have to use a tunnel?](https://github.com/OfficeDev/Microsoft-Graph-Nodejs-Webhooks/wiki/Why-do-I-have-to-use-a-tunnel)

For this sample, we use [ngrok](https://ngrok.com/) to create the tunnel. To configure ngrok:

1. [Download](https://ngrok.com/download) and unzip the ngrok binaries for your platform.
1. Type the following command:

    ```Shell
    ngrok http 3000
    ```

1. Take note of the *https public URL* that ngrok provides for you. This is an example:

    ```http
    https://{NGROK_ID}.ngrok.io
    ```

You'll need the `NGROK_ID` value in the next section.

## Configure and run the web app

1. Use a text editor to open `constants.js`.
1. Replace `ENTER_YOUR_CLIENT_ID` with the client ID of your registered Azure application.
1. Replace `ENTER_YOUR_SECRET` with the client secret of your registered Azure application.
1. Replace `NGROK_ID` with the value in *https public URL* from the previous section.
![](const)
1. Install the dependencies running the following command:

    ```Shell
    npm install
    ```

1. Start the application with the following command:

    ```Shell
    npm start
    ```
    > **Note:** You can also make the application wait for a debugger. To wait for a debugger, use the following command instead:
    >
    > ```Shell
    > npm run debug
    > ```
    > You can also attach the debugger included in Microsoft Visual Studio Code. For more information, see [Debugging in Visual Studio Code](https://code.visualstudio.com/Docs/editor/debugging).

1. Open a browser and go to [http://localhost:3000](http://localhost:3000).

## Contributing

If you'd like to contribute to this sample, see [CONTRIBUTING.MD](/CONTRIBUTING.md).

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Questions and comments

We'd love to get your feedback about the Microsoft Graph Webhook sample. You can send your questions and suggestions to us in the [Issues](https://github.com/OfficeDev/Microsoft-Graph-NodeJs-Webhooks/issues) section of this repository.

Office 365 development questions? Post them to [Stack Overflow](http://stackoverflow.com/questions/tagged/Office365+API). Make sure to tag your questions or comments with [Office365] and [API].

## Additional resources

- [Overview of Microsoft Graph](http://graph.microsoft.io/)
- [Subscription reference documentation](https://graph.microsoft.io/en-us/docs/api-reference/beta/resources/subscription)

## Copyright

Copyright (c) 2019 Microsoft. All rights reserved.
