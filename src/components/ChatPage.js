// frontend/src/components/ChatPage.js

// We need to import hooks from React to manage our component's state
import React, { useState, useRef, useEffect } from 'react';

// This is a helper function that contains Luna's "AI" logic.
// It takes the user's message as input and returns Luna's response.
const getLunaResponse = (userInput) => {
    // Convert the user's input to lowercase to make keyword matching easier
    const lowerCaseInput = userInput.toLowerCase();

    // Check for keywords and return a specific, comforting response
    if (lowerCaseInput.includes('sad') || lowerCaseInput.includes('upset') || lowerCaseInput.includes('down')) {
        return "It's completely okay to feel sad. Remember to be kind to yourself. Can you tell me more about what's making you feel this way? 💙";
    }

    if (lowerCaseInput.includes('anxious') || lowerCaseInput.includes('worried') || lowerCaseInput.includes('scared')) {
        return "When you feel anxious, try to focus on your breath. Take a slow, deep breath in, and a long breath out. You are safe in this moment. What's on your mind? 🙏";
    }

    if (lowerCaseInput.includes('happy') || lowerCaseInput.includes('great') || lowerCaseInput.includes('excited')) {
        return "That's wonderful to hear! I'm so glad you're feeling happy. Hold onto that feeling and cherish it. What's bringing you this joy? ✨";
    }
    
    if (lowerCaseInput.includes('stressed') || lowerCaseInput.includes('overwhelmed')) {
        return "Feeling overwhelmed is tough. Let's try to break things down into smaller pieces. Is there one small thing you could do right now to feel a tiny bit better? 🌱";
    }

    // If no keywords are found, return a default, encouraging message
    return "Thank you for sharing that with me. I'm here to listen anytime you need to talk. Tell me more. 🌙";
};


// This is the main ChatPage component
const ChatPage = () => {
    // 'messages' state: An array to hold all the chat messages.
    // Starts with a welcoming message from Luna.
    const [messages, setMessages] = useState([
        { sender: 'luna', text: "Hello! I'm Luna. How are you feeling today?" }
    ]);
    
    // 'userInput' state: A string to hold what the user is currently typing in the input box.
    const [userInput, setUserInput] = useState('');

    // A 'ref' to the chat window div. This lets us directly control it, like for scrolling.
    const chatWindowRef = useRef(null);

    // This 'useEffect' hook runs every time the 'messages' array changes.
    // Its purpose is to automatically scroll the chat window to the bottom.
    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [messages]);


    // This function handles the logic when the user sends a message.
    const handleSendMessage = (e) => {
        e.preventDefault(); // Prevent the form from refreshing the page

        // Don't send a message if the input is empty
        if (!userInput.trim()) return;

        // 1. Create the new message object for the user
        const userMessage = { sender: 'user', text: userInput };

        // 2. Add the user's message to our messages state array
        // We use '...messages' to create a copy of the existing messages first.
        setMessages(prevMessages => [...prevMessages, userMessage]);

        // 3. Get Luna's response based on the user's input
        const lunaResponseText = getLunaResponse(userInput);
        const lunaMessage = { sender: 'luna', text: lunaResponseText };

        // 4. Simulate Luna "thinking" for a moment, then add her response
        setTimeout(() => {
            setMessages(prevMessages => [...prevMessages, lunaMessage]);
        }, 700); // 700 milliseconds = 0.7 seconds

        // 5. Clear the input box for the next message
        setUserInput('');
    };

    return (
        <section className="chat-section">
            <h2>Start a new chat to begin talking with Luna</h2>
            
            <div className="chat-window" ref={chatWindowRef}>
                {/* We map over the 'messages' array to display each message */}
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender}`}>
                        {message.text}
                    </div>
                ))}
            </div>

            {/* We use a <form> element to allow pressing 'Enter' to send */}
            <form className="chat-input" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your message…"
                />
                <button type="submit">Send</button>
            </form>
        </section>
    );
};

export default ChatPage;