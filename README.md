# MERN Stack Photo Gallery Project

Welcome to the MERN Stack Photo Gallery project! This is a web application that allows users to register, log in, upload photos, view all photos, delete photos, and add favorite photos.

## Table of Contents
  
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)


## Introduction

This project is a full-stack web application built using the MERN (MongoDB, Express, React, Node.js) stack. It provides a user-friendly interface for managing photos, including user authentication, photo uploading, and interaction with photos.

## Features

- User Registration: Users can create accounts and register using their email addresses.
- User Login: Registered users can log in to their accounts securely.
- Photo Upload: Users can upload their photos to the application.
- View All Photos: Users can browse and view all the uploaded photos.
- Delete Photo: Users can delete their uploaded photos.
- Add to Favorites: Users can mark photos as their favorites for easy access.

## Technologies Used

- MongoDB: Database to store user information and photos.
- Express.js: Backend framework for building APIs.
- React: Frontend library for building user interfaces.
- Node.js: Server-side runtime environment.
- Storage: Photos are stored in our database  mongoDB using multer.

## Installation

1. Clone the repository: `git clone https://github.com/Roopam10/Photograph_Store.git`
2.Open  terminal in your backend folder  
3. Install server dependencies: `npm install mongoose`,npm install multer,npm install cors,npm install express
4.   Start the backend server: `nodemon`
5. Navigate to the client directory: `cd frontend`
6. Install client dependencies: 'npm install react-scripts --save',
`npm install axios`
7.Start the frontend or react server: `npm start`
8.Before running back end server start mongodb server and create database 'PhotographDB'. In that create 2 collections
->users
->photos
    



## Usage

1. Register a new account using your email.
2. Log in with your registered account.
3. Upload photos by clicking on the upload button.
4. View all uploaded photos on the All Photos page.
5. Delete a photo by clicking the delete button when viewing the photo.
6. Mark photos as favorites by clicking the favorite button.

## Contributing

Contributions are welcome! If you find any bugs or want to add new features, feel free to open issues or submit pull requests.



