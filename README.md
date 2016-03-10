# Microsoft Graph Webhook Sample for Node.js

This Node.js sample shows how to start getting notifications from Microsoft Graph. The following are common tasks that a web application performs with Microsoft Graph webhooks:

1. Sign-in your users with their work or school account to get an access token.
2. Use the access token to create a webhook subscription.
3. Send back a validation token to confirm the notification URL.
4. Listen for notifications from Microsoft Graph.
5. Request for more information in Office 365 using data in the notification.
  
![Microsoft Graph Webhook Sample for Node.js screenshot](/readme-images/Microsoft-Graph-NodeJs-Webhooks.png)

The previous screenshot shows the app in action. After your app gets a subscription, your app gets a notification when events happen in user data. Your app can then react to the event. This sample writes a list item for every notification received by the notification URL.

## Prerequisites

To use the Webhook sample, you need the following:

* [Node.js](https://nodejs.org/) version 4 or 5.
* A Bash shell. Windows developers can use [Git Bash for Windows](https://git-for-windows.github.io/) or Cygwin. Mac and Linux developers can use their standard terminals.

> Note: Try out the [Get started with Office 365 APIs](http://dev.office.com/getting-started/office365apis?platform=option-node#setup) page. It simplifies app registration on Microsoft Azure. If you follow the previous link, then you can skip the next prerequisites.

* An Office 365 account. You can sign up for [an Office 365 Developer subscription](https://portal.office.com/Signup/Signup.aspx?OfferId=6881A1CB-F4EB-4db3-9F18-388898DAF510&DL=DEVELOPERPACK&ali=1#0). The developer subscription includes resources to start building Office 365 apps.

     > Note: If you already have a subscription, the previous link sends the following message. Sorry, you can’t add that to your current account. In that case, use an account from your current Office 365 subscription.
     
* A Microsoft Azure subscription to register your application. Azure Active Directory provides identity services for your application. You can use a [Microsoft Azure trial subscription](https://account.windowsazure.com/SignUp).

     > Important: You also need to make sure your Azure subscription is bound to your Office 365 tenant. To do this, see the blog post, [Creating and Managing Multiple Windows Azure Active Directories](http://blogs.technet.com/b/ad/archive/2013/11/08/creating-and-managing-multiple-windows-azure-active-directories.aspx). The section **Adding a new directory** explains how to do this. For more information, see [Associate your Office 365 account with Azure AD to create and manage apps](https://msdn.microsoft.com/office/office365/howto/setup-development-environment#bk_CreateAzureSubscription).
* A client ID and key of an application registered in Azure. [Add a web application in Azure](https://msdn.microsoft.com/office/office365/HowTo/add-common-consent-manually#bk_RegisterServerApp) and [grant the proper permissions](https://github.com/OfficeDev/Microsoft-Graph-NodeJs-Webhooks/wiki/Grant-permissions-to-the-application-in-Azure) to it.

     > Note: During the app registration process, specify **http://localhost:3000/** as the **Sign-on URL**.
     
## Configure tunneling software for your localhost

Microsoft Graph needs a notification URL that it can reach to deliver notifications. The sample uses *localhost* as the development server. Microsoft Graph can't deliver notifications to *localhost*. For this reason, we need a tunnel that can forward requests from an URL on the internet to our *localhost*. For a more detailed explanation, see [Why do I have to use a tunnel?](https://github.com/OfficeDev/Microsoft-Graph-NodeJs-Webhooks/wiki/Why-do-I-have-to-use-a-tunnel%3F). 

> Note: You can also choose to deploy the sample to a cloud service, such as Azure. If you rather deploy this sample to Azure, see [Deploying the sample to Azure
](https://github.com/OfficeDev/Microsoft-Graph-NodeJs-Webhooks/wiki/Deploying-the-sample-to-Azure).

For this sample, we use [ngrok](https://ngrok.com/) to create the tunnel. To configure ngrok:

1. [Download](https://ngrok.com/download) and unzip the ngrok binaries for your platform.
2. Type the following command
    
    `ngrok http 3000`.
3. Take note of the *https public URL* that ngrok provider for you. This is an example

    `https://<identifier>.ngrok.io`.

You'll need the *https public URL* in the next section.

## Configure and run the web app

1. Use a text editor to open `constants.js`.
2. Replace *ENTER_YOUR_CLIENT_ID* with the client ID of your registered Azure application.
3. Replace *ENTER_YOUR_SECRET* with the client secret of your registered Azure application.
4. Replace *ENTER_YOUR_NOTIFICATION_URL* with the *https public URL* from the previous section.
5. Install the dependencies running the following command:
    ```
    npm install
    ```

6. Start the application with the following command:
    ```
    npm start
    ```
    > Note: You can also make the application wait for a debugger. To wait for a debugger, use the following command instead:
    ```
    npm run debug
    ```
    You can attach the Visual Studio Code debugger. For more information, see [Debugging in Visual Studio Code](https://code.visualstudio.com/Docs/editor/debugging).
    
7. Open a browser and go to http://localhost:3000. 

## Questions and comments

We'd love to get your feedback about the Office 365 PHP Connect sample. You can send your questions and suggestions to us in the [Issues](./issues) section of this repository.

Office 365 development questions? Post them to [Stack Overflow](http://stackoverflow.com/questions/tagged/Office365+API). Make sure to tag your questions or comments with [Office365] and [API].
  
## Additional resources

* [Office 365 APIs platform overview](https://msdn.microsoft.com/office/office365/howto/platform-development-overview)
* [Getting started with Office 365 APIs](http://dev.office.com/getting-started/office365apis)
* [Overview of Microsoft Graph](http://graph.microsoft.io/)
* [Subscription reference documentation](https://graph.microsoft.io/en-us/docs/api-reference/beta/resources/subscription)

## Copyright
Copyright (c) 2016 Microsoft. All rights reserved.
