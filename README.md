# Microsoft Graph Webhook Sample for Node.js

This Node.js sample shows how to start getting notifications from Microsoft Graph. The following are common tasks that a web application performs with Microsoft Graph webhooks:

1. Sign-in your users with their work or school account to get an access token.
2. Use the access token to create a webhook subscription.
3. Send back a validation token to confirm the notification URL.
4. Listen for notifications from Microsoft Graph.
5. Request for more information in Office 365 using data in the notification.
  
![Microsoft Graph Webhook Sample for Node.js screenshot](/readme-images/Microsoft-Graph-NodeJs-Webhooks.png)

Keep in mind that Office add-ins run on a variety of platforms and devices, which presents a great opportunity for your add-in. You must be aware, however, of [design considerations](../wiki/Office-add-in-design-considerations-when-using-OAuth-2.0-services) when you try to make OAuth flows work across a combination of platforms and technologies.

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

## Configure and run the web app

1. Use a text editor to open ```ws-conf.js```.
2. Replace *ENTER_YOUR_CLIENT_ID* with the client ID of your registered Azure or Google application.
3. Replace *ENTER_YOUR_SECRET* with the client secret of your registered Azure or Google application.
4. Generate a self-signed certificate using the included script: [`ss_certgen.sh`](/ss_certgen.sh).

    To run the script, run the following command in your terminal:
    
    On Linux, Mac and Git Bash for Windows
    ```
    $ bash ss_certgen.sh
    ```
    On Cygwin for Windows
    ```
    $ bash -o igncr ss_certgen.sh
    ```
    > **Note:** <br />
    Some OpenSSL installations on Windows throw the following error `Unable to load config info from /usr/local/ssl/openssl.cnf`. To specify the correct path, run the following command instead:
    ```
    $ OPENSSL_CONF='C:\Program Files (x86)\Git\ssl\openssl.cnf' bash ss_certgen.sh
    ```

   After running the script, two files will be created in the project root:
   ```
   server.crt // the certificate
   ```
   
   ```
   server.key // the key file
   ```
   
   > **Note:** <br />
   The `server.crt` and `server.key` files must be present in the project root - they will be picked up automatically at runtime. To use an alternate path see [`certconf.js`](/certconf.js).

5. Install the dependencies running the following command:
    ```
    npm install
    ```

6. Start the application with the following command:
    ```
    npm start
    ```
    
    > **Note:** <br />
    You must trust the self-signed certificate so it can display properly in Office. See, [Trust your self-signed certificate](https://github.com/OfficeDev/Office-add-in-Nodejs-ServerAuth/wiki/Trust-your-self-signed-certificate) for instructions.
    
7. Open Microsoft Word or Microsoft Excel and click **Insert** > **My add-ins** > **See all**
8. Choose **Shared Folder** if you deployed the add-in to a network share, or **My Organization** if you deployed the add-in to the add-in catalog.
9. Select **ServerAuth Sample**.

## Deploy the add-in

To make the add-in available in your Office client, you must deploy the manifest to a folder share. If you want to use the add-in in Word or Excel Online you must deploy the manifest to the add-in catalog.

### To deploy the manifest to a folder share

1. Create a folder on a network share, for example \\MyShare\MyManifests.
2. Copy the manifest files from the root folder of this sample and paste to the network share.
3. Open a new document in Excel or Word.
4. Choose the File tab, and then choose Options.
5. Choose Trust Center, and then choose the Trust Center Settings button.
6. Choose Trusted Add-in Catalogs.
7. In the Catalog Url box, enter the path to the network share you created in Step 1, and then choose Add Catalog.
8. Select the Show in Menu check box, and then choose OK.

For a detailed explanation of the previous process, see [Create a network shared folder catalog for task pane and content add-ins](https://msdn.microsoft.com/library/office/fp123503.aspx).

### To deploy the manifest to the add-in catalog

1. Browse to the add-in catalog.
2. Choose **Apps for Office** from the left navigation bar.
3. Choose **Upload**, and then **Choose files** to browse to the *manifest.xml* file in the root folder of this sample.
4. Choose **OK**.

For a detailed explanation of the previous process, see [Publish task pane and content add-ins to an add-in catalog on SharePoint](https://msdn.microsoft.com/library/office/fp123517.aspx).

## Open the add-in in Word or Excel

You can try the ServerAuth sample in Word or Excel desktop clients if you deployed the manifest to a network share or in Word or Excel Online if you deployed the manifest to the add-in catalog.

To open the add-in:

1. Open Word or Excel.
2. Choose **My Add-ins** on the **Insert** tab.
3. Choose **Shared Folder** if you deployed the manifest to a network share or **My Organization** if you deployed the manifest to the add-in catalog.
4. Choose **ServerAuth sample**.

## Credits

This code sample is based on ideas originally published in a [blog post](http://blogs.msdn.com/b/richard_dizeregas_blog/archive/2015/08/10/connecting-to-office-365-from-an-office-add-in.aspx) by Richard diZerega. Richard is an evangelist at Microsoft who works with Office 365 developers.

## Questions and comments

We'd love to get your feedback about this sample. You can send your questions and suggestions to us in the [Issues](https://github.com/OfficeDev/Office-add-in-Nodejs-ServerAuth/issues) section of this repository.

Questions about Office 365 development in general should be posted to [Stack Overflow](http://stackoverflow.com/questions/tagged/office-addins). Make sure that your questions or comments are tagged with [office-addins].
  
## Additional resources

* [More add-in samples](https://github.com/OfficeDev?utf8=%E2%9C%93&query=-add-in)
* [Office add-ins](http://msdn.microsoft.com/library/office/jj220060.aspx)
* [Anatomy of an add-in](https://msdn.microsoft.com/library/office/jj220082.aspx#StartBuildingApps_AnatomyofApp)

## Copyright
Copyright (c) 2015 Microsoft. All rights reserved.
