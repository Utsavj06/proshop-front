
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    FaPaperPlane,
    FaRegComments,
    FaTimes,
    FaTrash,
} from "react-icons/fa";
import "./Chatbot.css";

const STORAGE_KEY = "proshop-chatbot-messages";
const MAX_MESSAGE_LENGTH = 500;
const BOT_DELAY_MS = 650;

const INITIAL_MESSAGES = [
    {
        id: "welcome-message",
        sender: "bot",
        text: "Hi! I’m your ProShop assistant. I can help with orders, shipping, returns, product details, and account questions.",
        timestamp: new Date().toISOString(),
    },
];

const QUICK_ACTIONS = [
    "Track my order",
    "Shipping info",
    "Return policy",
    "Product help",
];

const createMessage = (sender, text) => ({
    id: `${sender}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    sender,
    text,
    timestamp: new Date().toISOString(),
});

const isValidStoredMessage = (message) =>
    message &&
    typeof message.id === "string" &&
    ["bot", "user"].includes(message.sender) &&
    typeof message.text === "string" &&
    typeof message.timestamp === "string";

const loadStoredMessages = () => {
    try {
        const storedMessages = window.localStorage.getItem(STORAGE_KEY);

        if (!storedMessages) {
            return INITIAL_MESSAGES;
        }

        const parsedMessages = JSON.parse(storedMessages);

        return Array.isArray(parsedMessages) &&
            parsedMessages.every(isValidStoredMessage)
            ? parsedMessages
            : INITIAL_MESSAGES;
    } catch (error) {
        return INITIAL_MESSAGES;
    }
};

const getBotReply = (rawMessage) => {
    const message = rawMessage.toLowerCase();

    if (message.includes("track") || message.includes("order")) {
        return "You can track orders from Profile > My Orders. Open an order to see status, payment details, and delivery updates.";
    }

    if (message.includes("ship") || message.includes("deliver")) {
        return "Shipping costs and delivery estimates are calculated during checkout after you add your shipping address.";
    }

    if (message.includes("return") || message.includes("refund")) {
        return "Most items can be returned if they are unused and in original packaging. Keep your order number ready for faster support.";
    }

    if (
        message.includes("product") ||
        message.includes("stock") ||
        message.includes("help")
    ) {
        return "Open a product page to view price, rating, reviews, and stock availability. If an item is in stock, you can add it to your cart.";
    }

    if (
        message.includes("account") ||
        message.includes("login") ||
        message.includes("profile")
    ) {
        return "For account help, sign in and visit your Profile page. You can review orders and manage account details there.";
    }

    if (
        message.includes("payment") ||
        message.includes("card") ||
        message.includes("pay")
    ) {
        return "Payment options are available during checkout. Please verify your card details and billing information before placing an order.";
    }

    if (
        message.includes("hello") ||
        message.includes("hi") ||
        message.includes("hey")
    ) {
        return "Hello! How can I help with your ProShop shopping experience today?";
    }

    return "Thanks for reaching out. I can help with orders, shipping, returns, products, accounts, and payments. What would you like to do?";
};

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState(loadStoredMessages);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const botReplyTimerRef = useRef(null);

    const remainingCharacters = useMemo(
        () => MAX_MESSAGE_LENGTH - inputValue.length,
        [inputValue]
    );

    const scrollToLatestMessage = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, []);

    useEffect(() => {
        try {
            window.localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(messages)
            );
        } catch (error) {
            // localStorage can be unavailable in private browsing or restricted contexts.
        }
    }, [messages]);

    useEffect(() => {
        if (isOpen) {
            scrollToLatestMessage();
            inputRef.current?.focus();
        }
    }, [isOpen, messages, scrollToLatestMessage]);

    useEffect(() => {
        const closeOnEscape = (event) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("keydown", closeOnEscape);

        return () => {
            document.removeEventListener("keydown", closeOnEscape);
            window.clearTimeout(botReplyTimerRef.current);
        };
    }, []);

    const sendMessage = useCallback(
        (messageText) => {
            const sanitizedMessage = messageText.trim().slice(
                0,
                MAX_MESSAGE_LENGTH
            );

            if (!sanitizedMessage || isTyping) {
                return;
            }

            const userMessage = createMessage("user", sanitizedMessage);

            setMessages((currentMessages) => [
                ...currentMessages,
                userMessage,
            ]);

            setInputValue("");
            setIsTyping(true);

            window.clearTimeout(botReplyTimerRef.current);

            botReplyTimerRef.current = window.setTimeout(() => {
                setMessages((currentMessages) => [
                    ...currentMessages,
                    createMessage("bot", getBotReply(sanitizedMessage)),
                ]);

                setIsTyping(false);
            }, BOT_DELAY_MS);
        },
        [isTyping]
    );

    const handleSubmit = (event) => {
        event.preventDefault();
        sendMessage(inputValue);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value.slice(0, MAX_MESSAGE_LENGTH));
    };

    const handleClearChat = () => {
        window.clearTimeout(botReplyTimerRef.current);
        setMessages(INITIAL_MESSAGES);
        setInputValue("");
        setIsTyping(false);
        inputRef.current?.focus();
    };

    return (
        <section className="chatbot" aria-label="ProShop chatbot assistant">
            {isOpen && (
                <div
                    className="chatbot__panel"
                    role="dialog"
                    aria-modal="false"
                    aria-labelledby="chatbot-title"
                >
                    <div className="chatbot__header">
                        <div>
                            <p className="chatbot__eyebrow">Live assistant</p>
                            <h2 id="chatbot-title">ProShop Help</h2>
                        </div>

                        <div className="chatbot__header-actions">
                            <button
                                type="button"
                                className="chatbot__icon-button"
                                onClick={handleClearChat}
                                aria-label="Clear chat history"
                            >
                                <FaTrash aria-hidden="true" />
                            </button>

                            <button
                                type="button"
                                className="chatbot__icon-button"
                                onClick={() => setIsOpen(false)}
                                aria-label="Close chatbot"
                            >
                                <FaTimes aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <div
                        className="chatbot__messages"
                        role="log"
                        aria-live="polite"
                        aria-relevant="additions"
                    >
                        {messages.map((message) => (
                            <article
                                key={message.id}
                                className={`chatbot__message chatbot__message--${message.sender}`}
                            >
                                <p>{message.text}</p>

                                <time dateTime={message.timestamp}>
                                    {new Intl.DateTimeFormat("en", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    }).format(new Date(message.timestamp))}
                                </time>
                            </article>
                        ))}

                        {isTyping && (
                            <div
                                className="chatbot__typing"
                                aria-label="Assistant is typing"
                            >
                                <span />
                                <span />
                                <span />
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    <div
                        className="chatbot__quick-actions"
                        aria-label="Quick chatbot actions"
                    >
                        {QUICK_ACTIONS.map((action) => (
                            <button
                                type="button"
                                key={action}
                                onClick={() => sendMessage(action)}
                                disabled={isTyping}
                            >
                                {action}
                            </button>
                        ))}
                    </div>

                    <form
                        className="chatbot__form"
                        onSubmit={handleSubmit}
                    >
                        <label
                            htmlFor="chatbot-message"
                            className="visually-hidden"
                        >
                            Type your message
                        </label>

                        <textarea
                            id="chatbot-message"
                            ref={inputRef}
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="Ask about orders, shipping, returns..."
                            rows="2"
                            maxLength={MAX_MESSAGE_LENGTH}
                            disabled={isTyping}
                        />

                        <div className="chatbot__form-footer">
                            <span aria-live="polite">
                                {remainingCharacters} characters left
                            </span>

                            <button
                                type="submit"
                                disabled={!inputValue.trim() || isTyping}
                            >
                                <FaPaperPlane aria-hidden="true" />
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <button
                type="button"
                className="chatbot__launcher"
                onClick={() => setIsOpen((currentValue) => !currentValue)}
                aria-expanded={isOpen}
                aria-controls="chatbot-title"
                aria-label={
                    isOpen
                        ? "Close ProShop assistant"
                        : "Open ProShop assistant"
                }
            >
                {isOpen ? (
                    <FaTimes aria-hidden="true" />
                ) : (
                    <FaRegComments aria-hidden="true" />
                )}

                <span>{isOpen ? "Close" : "Help"}</span>
            </button>
        </section>
    );
};

export default Chatbot;
