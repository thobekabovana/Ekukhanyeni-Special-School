import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Linking, Platform } from "react-native";

// Conditionally import MapView based on the platform
let MapViewComponent;
if (Platform.OS !== 'web') {
  MapViewComponent = require('react-native-maps').default; // For native platforms
} else {
  // Placeholder map for web
  MapViewComponent = () => (
    <View style={{ height: 200, backgroundColor: "#ddd", justifyContent: 'center', alignItems: 'center' }}>
      <Text>Map is not supported on the web. Use a different map solution here.</Text>
    </View>
  );
}

const ContactScreen = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", form);
    // Handle form submission logic (e.g., send to API)
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Contact Us</Text>
      <Text style={styles.subheading}>We would love to hear from you!</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          value={form.name}
          onChangeText={(text) => handleChange("name", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Your Email"
          keyboardType="email-address"
          value={form.email}
          onChangeText={(text) => handleChange("email", text)}
        />
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Your Message"
          multiline
          numberOfLines={4}
          value={form.message}
          onChangeText={(text) => handleChange("message", text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Send Message</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contactInfo}>
        <Text>Email: </Text>
        <Text style={styles.link} onPress={() => Linking.openURL("mailto:info@example.com")}>info@example.com</Text>
        <Text>Phone: </Text>
        <Text style={styles.link} onPress={() => Linking.openURL("tel:+1234567890")}>+1 234 567 890</Text>
      </View>

      {/* Conditionally render MapView based on platform */}
      <MapViewComponent
        style={styles.map}
        initialRegion={{
          latitude: 37.7749,
          longitude: -122.4194,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <MapViewComponent.Marker coordinate={{ latitude: 37.7749, longitude: -122.4194 }} title="Our Location" />
      </MapViewComponent>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: "#fff" },
  heading: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  subheading: { fontSize: 16, textAlign: "center", marginBottom: 20 },
  inputContainer: { marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginBottom: 10 },
  textarea: { height: 100, textAlignVertical: "top" },
  button: { backgroundColor: "#007bff", padding: 15, borderRadius: 5, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  contactInfo: { marginVertical: 20, alignItems: "center" },
  link: { color: "#007bff", textDecorationLine: "underline" },
  map: { height: 200, width: "100%", borderRadius: 10, marginTop: 10 },
});

export default ContactScreen;
