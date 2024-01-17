# Flywheels

Welcome to the Flywheels project! This platform allows users to rent vehicles, make online payments, and manage bookings. The system includes features for both users and administrators.

## Table of Contents
1. Introduction
2. Features
3. Technologies

## Introduction

The Rent-a-Car project is a web-based platform that enables users to rent vehicles, make online payments, and manage bookings efficiently. Users can sign up with their mobile numbers, view available vehicles at different hubs, and book them according to their preferences. The project also includes an admin panel with various controls for managing users, vehicles, hubs, and bookings.

## Features

- **User Authentication:**
  - Users can sign up and log in using their mobile numbers.
  - JWT tokens are used for secure authentication on both the user and admin sides.

- **Vehicle Management:**
  - Admins can add, edit, and delete vehicle details.
  - Vehicles are associated with specific hubs.

- **Hub Management:**
  - Admins can manage the locations (hubs) where vehicles are stationed.

- **Booking System:**
  - Users can view a list of available vehicles and select one based on their requirements.
  - Online payments are facilitated through Razorpay.
  - Users need to upload their driving license during the booking process.
  - Users can track the status of their bookings.

- **Admin Controls:**
  - Admins have full control over user management, vehicle management, hub management, and booking management.

- **Technologies:**
  - JWT tokens for user and admin authentication.
  - Razorpay for secure online payments.
  - Tailwind CSS framework for styling.

## Technologies

- **Frontend:**
  - HTML, CSS, JavaScript
  - Tailwind CSS

- **Backend:**
  - Node.js
  - Express.js

- **Database:**
  - MongoDB

- **Authentication:**
  - JSON Web Tokens (JWT)

- **Payment Gateway:**
  - Razorpay
