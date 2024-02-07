# Frontend My Yelp Project

## Task
Create a simple React application for managing Todos using AWS Amplify.

## Description
This project is a basic web application for managing Restaurants. It leverages AWS Amplify for authentication, API integration, and data storage. Users can sign in, create, view Restaurants. The application includes features such as a navigation bar, a modal for creating Restaurants, and a table for displaying Restaurants.

## Installation

Follow the steps below to set up and run the project locally:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/your-project.git
   cd your-project
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure AWS Amplify:**
   - Run `amplify init` to initialize your Amplify project.
   - Follow the prompts to set up your backend resources.

4. **Run the Application:**
   ```bash
   npm start
   ```

5. **Access the Application:**
   Open your web browser and navigate to [http://localhost:3000](http://localhost:3000).

## Usage
### Sign In

- Launch the application and sign in with your Amplify authentication credentials.

### View Todos

- Once signed in, you will see a list of existing Restaurants.

### Create Todo
- Click the "Create Restaurant" button to open the modal.
- Enter the name and description for the new Restaurant.
- Click "Create Restaurant" to add the Restaurant to the list.

### Sign Out
- Click the "Sign out" button to sign out from the application.