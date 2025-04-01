# [Webify AI 🚀](https://main.d2wswqoezwikuk.amplifyapp.com/)  

## Deployed Link: [https://main.d2wswqoezwikuk.amplifyapp.com/](https://main.d2wswqoezwikuk.amplifyapp.com/)


Webify AI is a **Next.js-powered AI-driven web development platform** inspired by Bolt.new. Unlike traditional tools, it features a **custom-built Large Language Model (LLM) module**, enhancing the development process with AI-assisted suggestions, auto-generated code, and seamless deployment.

## Features ✨  

- 🧠 **Custom LLM Module** - AI-powered assistance for development.  
- 🔄 **Convex DB** - Real-time, serverless database for fast data handling.  
- 💳 **PayPal Integration** - Secure payment processing.  
- ☁️ **AWS IAM** - Managed access control for cloud-based resources.  
- 🔑 **Google Authentication** - Seamless and secure user authentication.  
- 🚀 **Fast Deployment** - AI-assisted workflows for efficient web app creation.  

## Tech Stack 🛠️  

- **Frontend:** Next.js, Tailwind CSS  
- **Backend:** Next.js API routes, Convex DB  
- **LLM Module:** Custom-built AI model for intelligent code suggestions  
- **Authentication:** Google OAuth  
- **Payments:** PayPal API  
- **Cloud Services:** AWS IAM, AWS Amplify  

## Installation 🏗️  

1. Clone the repository:  

   ```bash
   git clone https://github.com/harshuCodes-git/Webify-AI.git
   ```  

2. Install dependencies:  

   ```bash
   npm install
   ```  

3. Set up environment variables in `.env.local`:  

   ```plaintext
   NEXT_PUBLIC_CONVEX_URL=your_convex_url
   PAYPAL_CLIENT_ID=your_paypal_client_id
   PAYPAL_SECRET=your_paypal_secret
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   LLM_API_KEY=your_llm_api_key
   ```  

4. Run the development server:  

   ```bash
   npm run dev
   ```  

   The app will be available at `http://localhost:3000`.  

## Deployment 🚀  

Webify AI is deployed on **AWS Amplify**. To deploy your own instance, follow these steps:

1. Push your code to a GitHub repository.
2. Go to **AWS Amplify Console** and connect your repository.
3. Configure the build settings (Amplify detects Next.js automatically).
4. Deploy and monitor your application through the Amplify dashboard.

Alternatively, you can deploy using **Vercel** or other cloud providers:

```bash
vercel deploy
```  

## Contributing 🤝  

We welcome contributions! Feel free to submit issues and pull requests.  

## License 📜  

This project is licensed under the MIT License.
