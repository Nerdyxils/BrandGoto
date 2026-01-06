# 📧 EmailJS Setup Guide for Live Agent

The chatbot now has a "Live Agent" feature that sends emails directly to `silas@brandgoto.com` using EmailJS!

## 🎯 **What's New**
- ✅ "Live Agent" suggestion replaces "Share Contact"
- ✅ Simple form with just Name + Email
- ✅ Direct email to silas@brandgoto.com
- ✅ No server-side dependencies

## 🚀 **Quick Setup (5 minutes)**

### **Step 1: Create EmailJS Account**
1. Go to [emailjs.com](https://emailjs.com)
2. Sign up (free - 200 emails/month)
3. Verify your email

### **Step 2: Add Email Service**
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. **Copy your Service ID** (e.g., `service_abc123`)

### **Step 3: Create Email Template**
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

```
Subject: New Live Agent Request from Chatbot

From: {{from_name}} <{{from_email}}>
To: silas@brandgoto.com

New Live Agent Request from BrandGoto Chatbot

Name: {{from_name}}
Email: {{from_email}}
Time: {{message}}
Source: BrandGoto Chatbot

Reply directly to this email to contact the user.
```

4. **Copy your Template ID** (e.g., `template_xyz789`)

### **Step 4: Get Public Key**
1. Go to "Account" → "General"
2. **Copy your Public Key** (e.g., `user_abc123def456`)

### **Step 5: Update Chatbot Code**
Replace these placeholders in `src/components/ChatbotWidget.tsx`:

```typescript
await emailjs.send(
  'YOUR_SERVICE_ID',     // Replace with your Service ID
  'YOUR_TEMPLATE_ID',    // Replace with your Template ID
  templateParams,
  'YOUR_PUBLIC_KEY'      // Replace with your Public Key
);
```

**Example:**
```typescript
await emailjs.send(
  'service_abc123',
  'template_xyz789',
  templateParams,
  'user_abc123def456'
);
```

## 🧪 **Testing**
1. Open chatbot on your site
2. Click "Live Agent"
3. Enter name and email
4. Click "Connect with Agent"
5. Check silas@brandgoto.com for the email!

## 📊 **What Gets Sent**
- **To:** silas@brandgoto.com
- **From:** User's email (so you can reply directly)
- **Subject:** "New Live Agent Request from Chatbot"
- **Content:** Name, email, timestamp, source

## 🔧 **Troubleshooting**
- **Email not received?** Check spam folder
- **Error in console?** Verify your IDs are correct
- **Need more emails?** Upgrade EmailJS plan

---

**That's it!** The chatbot will now send live agent requests directly to Silas's email! 🎉
