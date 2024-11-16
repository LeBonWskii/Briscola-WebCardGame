## Briscola Web Game 🃏
Welcome to Briscola Web Game, a web-based implementation of the classic Italian card game Briscola. Designed with simplicity and functionality in mind, this project allows players to enjoy traditional gameplay with modern features like account management, leaderboards, and deck customization.

## Features
### 🌐 Account Management
- User Registration and Login: Create a personal account with a unique username and password.
- Secure Authentication: Passwords are securely hashed for safe storage using PHP.
- Profile Tracking: Keep track of your game statistics, including wins, losses, and customizations.
### 🤖 Single-Player Mode
- AI Opponent: Play against a challenging bot with dynamic strategies.
- Game Progression: Your performance is saved to your account for future reference.
### 🏆 Leaderboard
- Top Players: View the leaderboard to see the best players ranked by scores.
- Competitive Rankings: Rankings are updated based on your wins and performance.
- Real-Time Updates: Leaderboard reflects the latest matches and scores.
### 🎨 Deck Customization
- Custom Decks: Personalize your experience by selecting different card designs.
## Technologies Used
### Backend
- PHP: Core logic for handling game mechanics, user authentication, and database interactions.
- MySQL: Database for storing user data, scores, and leaderboard rankings.
### Frontend
- HTML, CSS, and JavaScript: Used to create a dynamic, responsive, and visually appealing user interface.
- AJAX: Ensures smooth communication between frontend and backend without page reloads.
## Getting Started ⚙

### Prerequisites
- **XAMPP**: A local development environment for PHP and MySQL.
- A web browser to access the game (e.g., Chrome, Firefox).

### Setup Instructions

1. **Install and Configure XAMPP**  
   - Download and install [XAMPP](https://www.apachefriends.org/index.html) on your system.  
   - Start the Apache and MySQL services using the XAMPP control panel.  

2. **Set Up the Database**  
   - Open **phpMyAdmin** by navigating to `http://localhost/phpmyadmin` in your browser.  
   - Create a new database called `BriscolaDB`.  
   - Import the database schema:  
     - Click on the `BriscolaDB` database in phpMyAdmin.  
     - Select the **Import** tab and upload the SQL file located [here](https://github.com/LeBonWskii/Briscola-WebCardGame/blob/main/sql/BriscolaDB.sql).  
     - Execute the import.

3. **Update the Database Connection**  
   - Locate the `connection.php` file [here](https://github.com/LeBonWskii/Briscola-WebCardGame/blob/main/php/connection.php).  
   - Ensure the database connection credentials match your MySQL setup. Example:
     ```php
     <?php
      DEFINE('DB_HOST', 'mysql:host=localhost:3306;dbname=BriscolaDB;charset=utf8');
      DEFINE('DB_USER', 'root');
      DEFINE('DB_PASSWORD', 'YourPassword');
     ?>
     ```

4. **Move the Project to the XAMPP Directory**  
   - Copy the project folder to the `htdocs` directory inside your XAMPP installation (default path: `C:/XAMPP/htdocs`).

5. **Run the Application**  
   - Open your browser and type `http://localhost/` in the address bar.  
   - Click on the project folder name to start the game.

6. **Enjoy the Game** 🎮  

