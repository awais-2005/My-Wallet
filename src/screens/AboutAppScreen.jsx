import React from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  Linking,
} from 'react-native';

const AboutAppScreen = () => {
  const openLink = (url) => {
    Linking.openURL(url).catch(() => {});
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* App Name */}
      <Text style={styles.appName}>Expense Tracker</Text>

      {/* Version */}
      <Text style={styles.version}>Version 1.0.0</Text>

      {/* Description */}
      <Text style={styles.sectionTitle}>About the App</Text>
      <Text style={styles.text}>
        Expense Tracker is a simple and secure application designed to help
        users manage their daily expenses efficiently. It allows you to track
        income, expenses, analyze spending patterns, and stay financially
        organized.
      </Text>

      {/* Features */}
      <Text style={styles.sectionTitle}>Key Features</Text>
      <Text style={styles.text}>• Track income and expenses</Text>
      <Text style={styles.text}>• Category-wise expense analysis</Text>
      <Text style={styles.text}>• Offline-first with secure storage</Text>
      <Text style={styles.text}>• Multi-currency support</Text>
      <Text style={styles.text}>• Clean and minimal UI</Text>

      {/* Data & Privacy */}
      <Text style={styles.sectionTitle}>Privacy & Data</Text>
      <Text style={styles.text}>
        Your data is stored securely and is never shared with third parties.
        Authentication and cloud sync (if enabled) follow industry-standard
        security practices.
      </Text>

      {/* Developer */}
      <Text style={styles.sectionTitle}>Developer</Text>
      <Text style={styles.text}>
        Developed by an independent developer with a focus on performance,
        simplicity, and real-world usability.
      </Text>

      {/* Contact / Links */}
      <Text style={styles.sectionTitle}>Contact & Support</Text>
      <Text style={styles.link} onPress={() => openLink('mailto:rmawais852689@gmail.com')}>
        Contact Me
      </Text>

      <Text style={styles.link} onPress={() => openLink('https://github.com/awais-2005/my-wallet')}>
        GitHub Repository
      </Text>

      {/* Footer */}
      <Text style={styles.footer}>
        © {new Date().getFullYear()} Expense Tracker. All rights reserved.
      </Text>
    </ScrollView>
  );
};

export default AboutAppScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  appName: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
    color: '#111',
  },
  version: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 18,
    marginBottom: 8,
    color: '#222',
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
    marginBottom: 6,
  },
  link: {
    fontSize: 15,
    color: '#2f80ed',
    marginBottom: 6,
  },
  footer: {
    marginTop: 30,
    fontSize: 13,
    textAlign: 'center',
    color: '#888',
  },
});
