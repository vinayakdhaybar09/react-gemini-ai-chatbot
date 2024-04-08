import React from "react";
import { CSSProperties, useEffect, useRef, useState } from "react";
// import "./style.css";
import { HiArrowSmUp } from "react-icons/hi";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { InfinitySpin } from "react-loader-spinner";

const defaultData = [
  {
    chatBotName: "jenny",
  },
  {
    name: "Services",
    subcategories: [
      {
        name: "Overview",
        details: [
          "Our fitness center name is 'Golds gym'",
          "State-of-the-art gym equipment",
          "Personalized training programs",
          "Group fitness classes",
          "Nutritional counseling",
        ],
      },
      {
        name: "Prices",
        details: [
          { plan: "Basic Membership", price: "$30/month" },
          { plan: "Premium Membership", price: "$50/month" },
          { plan: "Personal Training Session", price: "$50/hour" },
          { plan: "Group Fitness Class", price: "$10/class" },
        ],
      },
      {
        name: "Facilities",
        details: [
          "Cardio machines",
          "Strength training area",
          "Group exercise rooms",
          "Locker rooms with showers",
        ],
      },
      {
        name: "Time Shedule",
        details: [
          { name: "Yoga Class", date: "2024-04-15", time: "6:00 PM" },
          { name: "Zumba Party", date: "2024-04-20", time: "7:30 PM" },
        ],
      },
    ],
  },
  {
    name: "Location",
    subcategories: [
      {
        name: "Address",
        details: "123 Fitness Street, City, Country",
      },
      {
        name: "Map",
        details: "https://maps.app.goo.gl/WcpDGC6NRXohbC6r7",
      },
    ],
  },
  {
    name: "Contact",
    subcategories: [
      {
        name: "Phone",
        details: "+1 123-456-7890",
      },
      {
        name: "Email",
        details: "info@gymwebsite.com",
      },
    ],
  },
  {
    name: "About Us",
    subcategories: [
      {
        name: "Description",
        details:
          "We are dedicated to helping you achieve your fitness goals with our top-notch facilities and expert trainers.",
      },
      {
        name: "History",
        details:
          "Established in 20XX, we have been serving the fitness needs of our community for over a decade.",
      },
    ],
  },
];

const prompt =
  "I will stick to the provided data while communicating with you and will not veer off-topic. If you ask about anything outside the scope of my services or any unrelated questions, I will let you know that I cannot respond to such queries. Feel free to ask me anything related to my services.";

interface IMessage {
  role: "function" | "user" | "model";
  parts: { text: string }[];
}

interface IChatBot {
  /**
   * API key for the Gemini AI service.
   */
  geminiApiKey: string;

  /**
   * Custom styles to be applied to the chatbot component.
   * @defaultValue `{}`
   */
  style?: CSSProperties;

  /**
   * Primary color for the chatbot component.
   * @defaultValue `"blueviolet"`
   */
  primaryColor?: string;

  /**
   * Secondary color for the chatbot component.
   * @defaultValue `"rgba(137, 43, 226, 0.321)"`
   */
  secondaryColor?: string;

  /**
   * Text color for the chatbot component.
   * @defaultValue `"#fff"`
   */
  textColor?: string;

  /**
   * Background color for the chatbot component.
   * @defaultValue `"#fff"`
   */
  backgroundColor?: string;

  /**
   * Width of the chatbot component.
   * @defaultValue `"500px"`
   */
  width?: string;

  /**
   * Height of the chatbot component.
   * @defaultValue `"500px"`
   */
  height?: string;

  /**
   * Model name for the Gemini AI service.
   * @defaultValue `"gemini-pro"`
   */
  geminiModel?: string;

  /**
   * Name of the chatbot.
   * @defaultValue `"Golds Gym"`
   */
  chatbotName?: string;

  /**
   * Image URL for the chatbot avatar.
   * @defaultValue `"https://media.istockphoto.com/id/1310380177/vector/avatar-smiling-brunette-nurse-with-bangs-and-bun.jpg?s=612x612&w=0&k=20&c=4lRjm5npCy2qqWHl3iH6CnejQglXkse3O-9ViKrpQ6I="`
   */
  chatBotImg?: string;

  /**
   * Title for the chat interface.
   * @defaultValue `"Ask me anything about our gym service"`
   */
  chatTitle?: string;

  /**
   * Training data for the chatbot. This data is used to train the AI model to understand and respond to user queries.
   * @defaultValue `defaultData`
   */
  trainingData?: any[];

  /**
   * Prompt for the chatbot to use during training. This prompt guides the AI model on how to interact with the user.
   * @defaultValue `prompt`
   */
  trainingPrompt?: string;

  /**
   * A function that returns a JSX element to be used as the loading component.
   * This component is displayed while the chatbot is processing a request.
   * @defaultValue `() => <InfinitySpin color={primaryColor} />`
   */
  loadingComp?: () => JSX.Element;
}

const styles: { [key: string]: CSSProperties } = {
  // "@import": {
  //   fontFamily: '"Roboto", sans-serif',
  // },
  // "*": {
  //   fontFamily: '"Roboto", sans-serif',
  // },
  chatbotComp: {
    border: "2px solid var(--primary-color)",
    borderRadius: "20px",
    overflow: "hidden",
  },
  avatarSection: {
    padding: "20px",
    backgroundColor: "var(--primary-color)",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: "10px",
  },
  chatbotImage: {
    height: "50px",
    width: "50px",
    borderRadius: "18px",
    objectFit: "cover",
  },
  avatarInfo: {},
  avatarLabel: {
    color: "var(--text-color)",
    fontSize: "12px",
  },
  avatarTitle: {
    color: "var(--text-color)",
    fontSize: "large",
    fontWeight: "bold",
  },
  chatbotConversationBox: {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    rowGap: "20px",
  },
  chatbotConversation: {
    display: "flex",
    flexDirection: "column",
    rowGap: "14px",
    overflowY: "auto",
  },
  conversationStartMsg: {
    fontSize: "12px",
    color: "var(--primary-color)",
    textAlign: "center",
    width: "70%",
    alignSelf: "center",
    lineHeight: "16px",
  },
  chatbotBotReply: {
    backgroundColor: "var(--primary-color)",
    maxWidth: "70%",
    color: "var(--text-color)",
    padding: "8px 10px",
    borderRadius: "6px",
    fontSize: "14px",
    width: "fit-content",
    lineHeight: "22px",
    textAlign: "left",
    overflowWrap: "anywhere",
  },
  chatbotUserReply: {
    backgroundColor: "var(--secondary-color)",
    maxWidth: "70%",
    padding: "8px 10px",
    borderRadius: "6px",
    alignSelf: "flex-end",
    color: "var(--primary-color)",
    fontSize: "14px",
    lineHeight: "22px",
    textAlign: "left",
  },
  chatbotInputBox: {
    display: "flex",
    alignItems: "center",
    columnGap: "8px",
    border: "1.5px solid var(--primary-color)",
    borderRadius: "10px",
    padding: "8px",
    marginTop: "auto",
  },
  chatbotInput: {
    border: "none",
    outline: "none",
    width: "100%",
    fontSize: "14px",
    padding: "6px 10px",
    resize: "none",
    backgroundColor: "transparent",
    color: "var(--primary-color)",
  },
  chatbotEnterBtn: {
    backgroundColor: "var(--secondary-color)",
    borderRadius: "4px",
    color: "var(--primary-color)",
    fontSize: "24px",
    padding: "6px 8px",
  },
};

function ReactAiChatBot({
  geminiApiKey,
  style = {},
  primaryColor = "blueviolet",
  secondaryColor = "rgba(137, 43, 226, 0.321)",
  textColor = "#fff",
  backgroundColor = "#fff",
  width = "400px",
  height = "500px",
  chatTitle = "Ask me anything about our gym service",
  geminiModel = "gemini-pro",
  chatbotName = "Golds Gym",
  chatBotImg = "https://media.istockphoto.com/id/1310380177/vector/avatar-smiling-brunette-nurse-with-bangs-and-bun.jpg?s=612x612&w=0&k=20&c=4lRjm5npCy2qqWHl3iH6CnejQglXkse3O-9ViKrpQ6I=",
  trainingData = defaultData,
  trainingPrompt = prompt,
  loadingComp = () => {
    return <InfinitySpin color={primaryColor} />;
  },
}: IChatBot) {
  const genAI = new GoogleGenerativeAI(geminiApiKey);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [inputText, setInputText] = useState("");
  const [messageArr, setMessageArr] = useState<IMessage[]>([]);
  const [loader, setLoader] = useState(false);

  const dataHistory: IMessage[] = [
    {
      role: "user",
      parts: [{ text: JSON.stringify(trainingData) }],
    },
    {
      role: "model",
      parts: [
        {
          text: trainingPrompt,
        },
      ],
    },
  ];

  useEffect(() => {
    setMessageArr(dataHistory);
  }, []);

  const model = genAI.getGenerativeModel({ model: geminiModel });

  const chat = model.startChat({
    history: messageArr,
    generationConfig: {
      maxOutputTokens: 1000,
    },
  });

  const handleSubmit = async () => {
    setLoader(true);
    const result = await chat.sendMessage(inputText);

    const response = await result.response;
    setLoader(false);

    console.log(response.text());

    setInputText("");
  };

  const AlwaysScrollToBottom = () => {
    useEffect(() =>
      elementRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "end",
      })
    );
    return <div style={{ backgroundColor: "red" }} ref={elementRef} />;
  };

  const Loader = loadingComp;

  return (
    <div
      className="chatbot-comp"
      style={{
        ...style,
        width,
        ...styles.chatbotComp,
      }}
    >
      <style>
        {`
          .chatbot-comp {
            --primary-color: ${primaryColor};
            --secondary-color: ${secondaryColor};
            --background-color: ${backgroundColor};
            --text-color:${textColor};
          }
          .chatbot-coversation::-webkit-scrollbar {
            display: none;
          }

          .chatbot-input::-webkit-scrollbar {
            display: none;
          }

          .chatbot-enter-btn:hover {
            background-color: var(--primary-color);
            color: var(--text-color);
            cursor: pointer;
          }
        `}
      </style>
      <div className="avatar-section" style={styles.avatarSection}>
        <img
          src={chatBotImg}
          alt="chat-bot"
          className="chatbot-image"
          style={styles.chatbotImage}
        />
        <div className="avatar-info" style={styles.avatarInfo}>
          <p className="avatar-label" style={styles.avatarLabel}>
            Chat with
          </p>
          <p className="avatar-title" style={styles.avatarTitle}>
            {chatbotName}
          </p>
        </div>
      </div>
      <div
        className="chatbot-coversation-box"
        style={{ height, backgroundColor, ...styles.chatbotConversationBox }}
      >
        <div className="chatbot-coversation" style={styles.chatbotConversation}>
          <p
            className="conversation-start-msg"
            style={styles.conversationStartMsg}
          >
            {chatTitle}
          </p>
          {messageArr?.slice(2)?.map((data, i) => {
            return (
              <p
                key={i}
                className={
                  data?.role === "model"
                    ? "chatbot-bot-reply"
                    : "chatbot-user-reply"
                }
                style={
                  data?.role === "model"
                    ? styles.chatbotBotReply
                    : styles.chatbotUserReply
                }
              >
                {data?.parts?.[0]?.text}
              </p>
            );
          })}
          <AlwaysScrollToBottom />
          {loader ? (
            <div style={{ alignSelf: "center" }}>
              <Loader />
            </div>
          ) : null}
        </div>
        <div className="chatbot-input-box" style={styles.chatbotInputBox}>
          <input
            autoFocus
            value={inputText}
            style={styles.chatbotInput}
            className="chatbot-input"
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <HiArrowSmUp
            style={styles.chatbotEnterBtn}
            type="submit"
            className="chatbot-enter-btn"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export { ReactAiChatBot };
