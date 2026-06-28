# 🔗 Fullstack URL Shortener

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

A robust, full-stack web application designed to convert long, cumbersome URLs into concise, easily shareable links. This project features a clean, responsive user interface, custom URL aliases, and click-tracking analytics, secured with industry-standard authentication.

## ✨ Features

- **Link Shortening:** Instantly generate short URLs from long links.
- **Custom Aliases:** Allow users to create their own custom back-half for links (e.g., `short.ly/my-custom-link`).
- **Analytics Dashboard:** Track the number of clicks and usage statistics for each shortened URL.
- **User Authentication:** Secure signup and login using JSON Web Tokens (JWT) to manage personal link histories.
- **Modern UI:** A highly responsive, sleek interface built with React and Tailwind CSS.
- **QR Code Generation:** (Optional) Automatically generate downloadable QR codes for shortened links.

## 🛠️ Tech Stack

**Frontend:**
* [React.js](https://reactjs.org/) (UI Library)
* [Tailwind CSS](https://tailwindcss.com/) (Utility-first styling)
* Axios / Fetch API (HTTP requests)

**Backend:**
* [Spring Boot](https://spring.io/projects/spring-boot) (Java framework)
* Spring Security (Authentication & Authorization)
* JWT (JSON Web Tokens) for secure, stateless API access
* Spring Data JPA / Hibernate (ORM)

**Database:**
* [MySQL](https://www.mysql.com/)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

* Java Development Kit (JDK) 17 or higher
* Node.js (v16.x or higher) and npm/yarn
* Maven (for building the Spring Boot app)
* Your chosen Database (e.g., PostgreSQL or MySQL) installed and running

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Nicklaus-bot/fullstack-url-shortener.git](https://github.com/Nicklaus-bot/fullstack-url-shortener.git)
   cd fullstack-url-shortener
