# 🔐 Password Strength Checker

A lightweight, privacy-focused **Password Strength Checker and Data Breach Detection Tool** built using HTML5, CSS3, and Vanilla JavaScript.

This project evaluates password complexity in real time and checks whether a password has appeared in publicly known data breaches using the **Have I Been Pwned (HIBP) Pwned Passwords API**.

Designed with cybersecurity best practices in mind, the application uses the Web Crypto API for SHA-1 hashing and implements the HIBP k-anonymity model to minimize exposure of sensitive password information.

---

## 🚀 Key Features

- **Real-Time Password Analysis:** Evaluates password strength as the user types.
- **Password Complexity Assessment:** Checks multiple security characteristics:
  - Minimum password length
  - Uppercase letters (A–Z)
  - Lowercase letters (a–z)
  - Numeric digits (0–9)
  - Special characters (!, @, #, $, etc.)
- **Data Breach Detection:** Checks passwords against the HIBP database of previously exposed passwords.
- **Privacy-Focused Architecture:** The original password is never transmitted to the HIBP API.
- **SHA-1 Hashing:** Uses the browser's Web Crypto API to generate a SHA-1 hash for breach lookup.
- **K-Anonymity Implementation:** Sends only the first five characters of the SHA-1 hash to the HIBP API.
- **Responsive Interface:** Provides a clean and user-friendly experience across different screen sizes.
- **Client-Side Execution:** No backend server, database, or account registration required.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| CSS3 | Responsive styling and UI |
| JavaScript (ES6) | Password analysis and API integration |
| Web Crypto API | SHA-1 password hashing |
| Have I Been Pwned API | Compromised password detection |
| Fetch API | Secure HTTPS communication with HIBP |

---

## 🔍 How It Works

The application performs password analysis and breach detection through the following workflow.

### 1. Password Complexity Analysis

When a user enters a password, JavaScript evaluates its characteristics against predefined security rules.

The application checks:

- Password length
- Presence of uppercase characters
- Presence of lowercase characters
- Presence of numeric digits
- Presence of special characters

Based on the evaluation, it calculates a strength score and displays an appropriate strength indicator.

### 2. SHA-1 Hash Generation

The application uses the browser's built-in Web Crypto API to generate a SHA-1 hash of the entered password.

SHA-1 is used here only because it is the hashing format required by the HIBP Pwned Passwords API.

**Important:** SHA-1 is not recommended for password storage or authentication systems.

### 3. K-Anonymity-Based Breach Checking

The application follows the HIBP range API methodology.

The process works as follows:

1. Generate the SHA-1 hash of the password.
2. Extract the first five hexadecimal characters of the hash.
3. Send only this five-character prefix to the HIBP API.
4. Receive a list of matching hash suffixes.
5. Compare the remaining hash characters locally in the browser.
6. If a match is found, display the corresponding breach occurrence count.

This approach ensures that the complete password and its complete SHA-1 hash are not sent to the API.

**API Endpoint:**

`https://api.pwnedpasswords.com/range/{first5}`

**API Documentation:**

https://haveibeenpwned.com/API/v3#PwnedPasswords

---

## 🔐 Security and Privacy Considerations

Security and privacy are important design considerations for this project.

### Privacy Protection

- The original password is processed locally in the browser.
- The complete password is never sent to an external API.
- Only the first five hexadecimal characters of the SHA-1 hash are transmitted to HIBP.
- Hash suffix comparison happens locally.
- No application backend or password database is required.

### Security Limitations

Although the application uses privacy-conscious techniques, it is important to understand its limitations.

- SHA-1 is not a secure password-storage algorithm.
- The HIBP API request exposes a partial hash prefix to the API provider.
- A password strength score is a heuristic, not a guarantee of security.
- A password that is not found in HIBP is not necessarily safe.
- Client-side applications cannot protect users against compromised devices, malicious browser extensions, or injected scripts.
- The application should be served over HTTPS when deployed.

**Security Recommendation:** Use a unique, long password for every account and consider using a reputable password manager. Prefer randomly generated passwords or long passphrases.

---

## 📸 Project Preview

![Password Strength Checker Preview](https://github.com/mukulgrover/password-strength-checker/raw/main/preview.png)

---

## ⚙️ Installation and Setup

No additional dependencies, frameworks, or package installations are required.

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/password-strength-checker.git
```

### Step 2: Navigate to the Project Directory

```bash
cd password-strength-checker
```

### Step 3: Run the Application

Open the `index.html` file in any modern web browser.

Alternatively, use the VS Code Live Server extension to run the project locally.

---

## 📂 Project Structure

```text
password-strength-checker/
│
├── index.html       # Application structure
├── style.css        # Styling and responsive design
├── script.js        # Password analysis and API integration
├── preview.png      # Project screenshot
└── README.md        # Project documentation
```

*Note: Adjust the filenames above if your actual repository uses a different structure.*

---

## 🌐 Live Demo

Try the application:

👉 https://mukulgrover.github.io/password-strength-checker/

---

## 🧪 Testing and Validation

The application can be tested using the following scenarios:

| Test Case | Expected Result |
|---|---|
| Empty password | No strength or breach result |
| Short password | Weak strength indicator |
| Password without uppercase letters | Uppercase requirement not satisfied |
| Password without digits | Digit requirement not satisfied |
| Password without special characters | Special character requirement not satisfied |
| Strong, unique password | Higher strength indicator |
| Known compromised password | Breach warning with occurrence count |
| Password not found in HIBP | No matching breach record reported |

For privacy, use test passwords rather than real credentials belonging to personal accounts.

---

## 🛡️ Cybersecurity Concepts Demonstrated

This project demonstrates practical implementation of several cybersecurity concepts:

1. **Password Security:** Understanding password complexity and common password weaknesses.
2. **Cryptographic Hashing:** Implementing SHA-1 hashing using the Web Crypto API.
3. **API Security:** Integrating an external security intelligence service over HTTPS.
4. **K-Anonymity:** Reducing sensitive information exposure during password breach checks.
5. **Data Breach Awareness:** Identifying passwords that have appeared in known data breaches.
6. **Client-Side Security:** Processing sensitive user input locally rather than transmitting the original password to a backend.
7. **Secure Development Practices:** Applying privacy-conscious design principles.

---

## 🔮 Future Enhancements

Potential improvements for future versions include:

- Integration of the zxcvbn password strength estimation library.
- Detection of common dictionary words and predictable password patterns.
- Password entropy estimation.
- Support for passphrase-based strength evaluation.
- Improved accessibility and keyboard navigation.
- Loading indicators and improved API error handling.
- Enhanced breach-checking feedback and result visualization.
- Unit testing for password evaluation and hashing functionality.

---

## ⚠️ Disclaimer

This project is developed for **educational and cybersecurity awareness purposes**.

It is intended to demonstrate password strength evaluation and compromised-password detection.

It is not a replacement for professional password security auditing, enterprise authentication systems, or dedicated security solutions.

Never enter sensitive production credentials into an application unless you have reviewed and trust its source code and deployment environment.

---

## 👨‍💻 Author

**Mukul Grover**

GitHub: https://github.com/er-surajky

---

## 📜 License

This project is available for educational and personal learning purposes. Add an appropriate open-source license, such as the MIT License, to your repository if you intend to permit reuse and redistribution.

---

⭐ **If you find this project useful, consider giving the repository a star on GitHub!**

Contributions, suggestions, and feedback are welcome.
