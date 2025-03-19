import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useState } from "react";

export default function Signup({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    if (!username) errors.username = "Username is required";
    if (!email) errors.email = "Email is required";
    else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) errors.email = "Invalid email format";
    if (!password) errors.password = "Password is required";
    if (!confirmPassword) errors.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Signed Up", username, email, password);
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setErrors({});
    }
  };

  return (
    <KeyboardAvoidingView 
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      behavior="padding"
      style={styles.container}
    >
      <View style={styles.form}>
        <Text style={styles.label}>Username</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter your username" 
          value={username} 
          onChangeText={setUsername}
        />
        {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

        <Text style={styles.label}>Email</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter your email" 
          value={email} 
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <Text style={styles.label}>Password</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter your password" 
          secureTextEntry
          value={password} 
          onChangeText={setPassword}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Confirm your password" 
          secureTextEntry
          value={confirmPassword} 
          onChangeText={setConfirmPassword}
        />
        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.linkText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 20,
      backgroundColor: "#f5f5f5",
    },
    form: {
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10,
      shadowColor: "black",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
      fontWeight:"bold",
    },
    input: {
      height: 40,
      borderColor: "#ddd",
      borderWidth: 1,
      marginBottom: 15,
      padding: 10,
      borderRadius: 5,
    },
    errorText: {
      color: "red",
      marginBottom: 10,
    },
    linkText: {
        marginTop: 15,
        color: "green",
        textAlign: "center",
        fontWeight: "500",
    },
    button: {
        backgroundColor: "#007BFF",  
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginVertical: 10,
        width: "40%",  
        alignSelf: "center", 
      },
      buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
      }
    
  }
);
  