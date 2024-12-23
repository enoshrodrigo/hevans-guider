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
   return
   (<></>)
  ;
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
