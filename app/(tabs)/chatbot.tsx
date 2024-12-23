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
import * as ImagePicker from 'expo-image-picker'; 

//expo env import
 
export default function ChatBot() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { text: string; sender: string; image?: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const formatMessageText = (text) => {
    // Split the text into lines
    const lines = text.split('\n');
  
    return lines.map((line, lineIndex) => {
      // Determine if the line is a bullet point
      const isBulletPoint = line.trim().startsWith('=*') || line.trim().startsWith('*');
  
      // Remove the bullet point marker for processing
      let content = line.trim();
      if (isBulletPoint) {
        content = content.replace(/^=\*\s*|\*\s*/, '').trim();
      }
  
      // Split the content by '**' to identify bold segments
      const parts = content.split(/(\*\*[^*]+\*\*)/g);
  
      return (
        <Text key={lineIndex} style={{ flexDirection: 'row', marginBottom: 5 }}>
          {isBulletPoint && <Text>{'\u2022 '}</Text>}
          {parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              // Render bold text without the '**' markers
              return (
                <Text key={index} style={{ fontWeight: 'bold' }}>
                  {part.slice(2, -2)}
                </Text>
              );
            }
            // Render regular text
            return <Text key={index}>{part}</Text>;
          })}
        </Text>
      );
    });
  };

  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    const newUserMessage = { text: userInput, sender: "user" };
    setChatHistory((prev) => [...prev, newUserMessage]);
    setUserInput("");
    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}api/chat`, {
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

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Ensure only images are selected
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled && result.assets?.length > 0) {
      const imageUri = result.assets[0].uri;
  
      if (typeof imageUri === "string" && imageUri.trim()) {
        try {
          // Upload the image to an external service
          const formData = new FormData();
          formData.append("file", {
            uri: imageUri,
            name: "photo.jpg", // Change name as needed
            type: "image/jpeg", // Adjust type if necessary
          } as any);
          formData.append("upload_preset", "your_upload_preset"); // Required for Cloudinary
  
          const uploadResponse = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
            method: "POST",
            body: formData,
          });
  
          const uploadData = await uploadResponse.json();
          const uploadedImageUrl = uploadData.secure_url; // URL to send to your backend
  
          // Add the image to chat history
          const newUserMessage = { text: "", sender: "user", image: uploadedImageUrl };
          setChatHistory((prev) => [...prev, newUserMessage]);
  
          // Send the image URL to the backend
          setIsLoading(true);
          const response = await fetch("http://172.20.10.3:5000/api/chat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: uploadedImageUrl }),
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
        } finally {
          setIsLoading(false);
        }
      } else {
        console.error("Invalid image URI");
      }
    } else {
      console.error("Image selection canceled or invalid");
    }
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
         {/*  <TouchableOpacity style={styles.imageButton} onPress={selectImage}>
            <Ionicons name="image" size={24} color="#6200EE" />
          </TouchableOpacity> */}
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
  imageButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#F1F0F0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
});
