import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ModalScreen() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { text: string; sender: string; image?: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const formatMessageText = (text: string) => {
    const parts = text.split(/(\*.*?\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <Text key={index} style={{ fontWeight: "bold" }}>
            {part.slice(1, -1)}
          </Text>
        );
      }
      return part;
    });
  };

  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    const newUserMessage = { text: userInput, sender: "user" };
    setChatHistory((prev) => [...prev, newUserMessage]);
    setUserInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://172.20.10.3:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput }),
      });
      const data = await response.json();
      const newBotMessage = { text: data.botResponse, sender: "bot" };
      setChatHistory((prev) => [...prev, newBotMessage]);
    } catch (error) {
      console.error("Error:", error);
      setChatHistory((prev) => [
        ...prev,
        { text: "Sorry, something went wrong.", sender: "bot" },
      ]);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [chatHistory]);

  const renderMessage = (
    message: { text: string; sender: string; image?: string },
    index: number
  ) => (
    <View
      key={index}
      style={[
        styles.messageContainer,
        message.sender === "user" ? styles.userMessage : styles.botMessage,
      ]}
    >
      {message.sender === "bot" && (
        <Image
          source={require("@/assets/images/chatbot.webp")} // Replace with your bot avatar image
          style={styles.avatar}
        />
      )}
      <View style={styles.messageContent}>
        {message.image ? (
          <Image source={{ uri: message.image }} style={styles.messageImage} />
        ) : (
          <Text style={styles.messageText}>
            {formatMessageText(message.text)}
          </Text>
        )}
      </View>
      {message.sender === "user" && (
        <Image
          source={require("@/assets/images/user.webp")} // Replace with your user avatar image
          style={styles.avatar}
        />
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={90}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Chat with the Bot</Text>

        <ScrollView
          ref={scrollViewRef}
          style={styles.chatContainer}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {chatHistory.map(renderMessage)}
          {isLoading && (
            <ActivityIndicator
              size="small"
              color="#6200EE"
              style={styles.loadingIndicator}
            />
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            value={userInput}
            onChangeText={setUserInput}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 8,
    color: "#6200EE",
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  chatContent: {
    paddingBottom: 20,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 5,
  },
  userMessage: {
    alignSelf: "flex-end",
    flexDirection: "row-reverse",
  },
  botMessage: {
    alignSelf: "flex-start",
  },
  messageContent: {
    maxWidth: "70%",
    backgroundColor: "#F1F0F0",
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 10,
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  messageImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  loadingIndicator: {
    alignSelf: "center",
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#CCC",
    backgroundColor: "#FFF",
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: "#F9F9F9",
  },
  sendButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#6200EE",
    alignItems: "center",
    justifyContent: "center",
  },
});
