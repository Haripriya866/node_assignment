### Setup Instructions

* Initial Setup:
    open root folder for project in vscode:
        cd Backend
    
    initialize git in this folder (Backend):
        git init

    Set Up the Backend:

        Create a new folder for the backend:
        mkdir node_assignment

        Navigate to the backend folder:
        cd node_assignment

        Initialize the backend project:
	    npm init -y

        Install required dependencies:
	    npm install axios express dotenv mongodb nodemon

* Folder Structure and Logic:
    Backend:

        The backend uses Express.js for setting up APIs and axios is used for making HTTP requests.

* Running the Application:
    Start the Backend:

        Navigate to the backend folder:
		cd node_assignment

        Run the backend (you can add a index.js file to define your logic):	
		npm start

### API Endpoints

| Method             | Endpoint       | Description                      |
|--------------------|----------------|----------------------------------|
| GET                | /load          | Loads 10 users into DB           |
| DELETE             | /users         | Delete all users in the DB       |
| DELETE             | /users/:userId | Delete user with userId from DB  |
| GET                | /users/:userId | Fetches user, posts & comments   |
| PUT                | /users         | Adds a new user                  |

## Testing
Use Postman for API testing.
      

# Title
Backend Assignment

## Objective
The objective of this assignment is to design and implement a RESTful API using Node.js and JavaScript to interact with a MongoDB database.

