# React Gemini AI Chat bot

React AI Chatbot is a React component package that allows developers to easily integrate a chatbot powered by Google's Gemini AI model into their client websites for help desk purposes, queries, and more.

## Features

- Integration of Google's Gemini AI model for conversational interactions.
- Customizable chatbot appearance and behavior.
- Predefined training data structure for easy setup.
- Support for training prompts to guide AI model interactions.

## Installation

Install react-gemini-ai-chatbot with npm

```bash
npm install react-gemini-ai-chatbot
```

Install react-gemini-ai-chatbot with yarn

```bash
yarn add react-gemini-ai-chatbot
```

## Basic usage

### Step 1: Generate API Key

Before using the React AI Chatbot component, you need to generate an API key from the([Google AI Studio](https://aistudio.google.com/app/apikey)). This API key will be used to authenticate requests to the Gemini AI model.

### Step 2: Import ReactAiChatBot

To use the React AI Chatbot component, simply import it into your React application and pass the required props:

```javascript
import React from "react";
import { ReactAiChatBot } from "react-gemini-ai-chatbot";

const MyChatbot = () => {
  const geminiApiKey = "YOUR_GEMINI_API_KEY";
  const trainingData = [{}]

  return (
    <ReactAiChatBot
      geminiApiKey={geminiApiKey}
      trainingData={trainingData}
      // Add other props as needed
    />
  );
};

export default MyChatbot;
```

### Predefined Example

To help you get started quickly, the package includes a predefined example of a fitness club. However, it's essential to customize this data according to your specific requirements before deploying the chatbot in your application.

## Props

The following props are available for customization:

| Prop            | Description                                                            |
| --------------- | ---------------------------------------------------------------------- |
| geminiApiKey    | API key for the Gemini AI service.                                     |
| style           | Custom styles to be applied to the chatbot component.                  |
| primaryColor    | Primary color for the chatbot component.                               |
| secondaryColor  | Secondary color for the chatbot component.                             |
| textColor       | Text color for the chatbot component.                                  |
| backgroundColor | Background color for the chatbot component.                            |
| width           | Width of the chatbot component.                                        |
| height          | Height of the chatbot component.                                       |
| geminiModel     | Model name for the Gemini AI service.                                  |
| chatbotName     | Name of the chatbot.                                                   |
| chatBotImg      | Image URL for the chatbot avatar.                                      |
| chatTitle       | Title for the chat interface.                                          |
| trainingData    | Training data for the chatbot.                                         |
| trainingPrompt  | Prompt for the chatbot to use during training.                         |
| loadingComp     | Loading component displayed while the chatbot is processing a request. |

### Training Data

The `trainingData` prop in the `ReactAiChatBot` component requires JSON-formatted data containing all the necessary information about your service, company, or any other relevant content. This data is crucial for training the AI model to understand and respond to user queries effectively.

```json
[
  {
    "name": "Services",
    "subcategories": [
      {
        "name": "Overview",
        "details": [
          "Our fitness center name is 'Golds gym'",
          "State-of-the-art gym equipment",
          "Personalized training programs",
          "Group fitness classes",
          "Nutritional counseling"
        ]
      },
      {
        "name": "Prices",
        "details": [
          { "plan": "Basic Membership", "price": "$30/month" },
          { "plan": "Premium Membership", "price": "$50/month" },
          { "plan": "Personal Training Session", "price": "$50/hour" },
          { "plan": "Group Fitness Class", "price": "$10/class" }
        ]
      }
      // Add more subcategories as needed
    ]
  },
  {
    "name": "Location",
    "subcategories": [
      {
        "name": "Address",
        "details": "123 Fitness Street, City, Country"
      },
      {
        "name": "Map",
        "details": "https://maps.app.goo.gl/WcpDGC6NRXohbC6r7"
      }
    ]
  }
  // Add more categories as needed
]
```
