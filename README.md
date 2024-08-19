# Prompt Sharing Application

## Initial packages

- `npx create-next-app@latest ./`
- `npm install bcrypt mongodb mongoose next-auth`

## Note 1

The code you provided sets up authentication in a Next.js application using NextAuth with Google as a provider. Here's a brief breakdown of what each part does:

1. **NextAuth Configuration**:

   - The `handler` function is defined using `NextAuth` with options that include the authentication providers (in this case, Google) and callbacks for handling sessions and sign-ins.
   - `GoogleProvider`: Uses `clientId` and `clientSecret` from environment variables to authenticate users via Google.

2. **Callbacks**:
   - `session`: This callback is called whenever a session is checked. You can modify the session object before it's returned to the client.
   - `signIn`: This callback is triggered when a user signs in. You can use it to control the sign-in process, like checking if the user is allowed to sign in.

3. **Exports**:
   - The `handler` is exported for both `GET` and `POST` requests, making it easy to handle authentication via API routes in Next.js.

This setup gives you a foundation for integrating Google authentication in your Next.js app, while providing hooks to customize the authentication flow as needed.

## Note 2

This code snippet sets up a connection to a MongoDB database using Mongoose in a Node.js environment. It includes a mechanism to ensure that the database connection is only established once, which helps prevent multiple connections when the function is called multiple times. Here's a breakdown of how it works:

### Code Breakdown

1. **`isConnected` Variable**:
   - The `isConnected` variable is used to track whether the MongoDB connection has already been established. This prevents the application from attempting to connect to the database multiple times.

2. **`connectToDB` Function**:
   - **`mongoose.set('strictQuery', true);`**: This sets Mongoose's strict query option to true, ensuring that only defined schema paths are allowed in queries.
   - **Connection Check**: Before attempting a new connection, the function checks if `isConnected` is `true`. If so, it logs that MongoDB is already connected and exits the function early.
   - **`mongoose.connect`**: If not already connected, the function attempts to connect to MongoDB using the connection string from the environment variable `MONGODB_URI`. It also specifies a database name (`dbName: "share_prompt"`) and uses `useNewUrlParser` and `useUnifiedTopology` options to handle the MongoDB connection string and server discovery in a more robust way.
   - **Connection Success**: Upon successful connection, `isConnected` is set to `true`, and a success message is logged.
   - **Error Handling**: If the connection fails, the error is caught and logged to the console.

### Example Usage

You would typically call this `connectToDB` function at the start of your application's server-side code, ensuring that the database is connected before handling any requests that require database access.

### Improved Error Handling

For better maintainability, you might consider adding more detailed error handling or even retry logic in case of transient connection failures.

```js
try {
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: "share_prompt",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  isConnected = true;
  console.log('MongoDB connected');
} catch (error) {
  console.error('MongoDB connection error:', error);
  // Optionally add retry logic here
}
```

This setup ensures that your application efficiently handles database connections, avoiding unnecessary re-connections and potential performance issues.

## Note 3

This code defines a Mongoose schema and model for a `User` in a MongoDB database, ensuring that user data adheres to specific validation rules. Here's a breakdown of how this works:

1. **Schema Definition (`UserSchema`)**:
   - **`email`**:
     - **Type**: `String`
     - **Unique**: The `unique: [true, 'Email already exists!']` constraint ensures that each email is unique in the database. If a duplicate email is attempted, it throws the error message "Email already exists!".
     - **Required**: The `required: [true, 'Email is required!']` constraint ensures that the email field must be provided. If not, the error message "Email is required!" is thrown.

   - **`username`**:
     - **Type**: `String`
     - **Required**: The `required: [true, 'Username is required!']` constraint ensures that the username field is mandatory. If not provided, the error message "Username is required!" is thrown.
     - **Match**: The `match` property contains a regular expression that enforces specific rules on the username:
       - The username must be between 8 and 20 characters.
       - It must be alphanumeric, allowing letters, numbers, underscores, and periods.
       - It cannot start or end with an underscore or period.
       - It cannot have consecutive underscores or periods.
       - If the username does not match this pattern, the error message "Username invalid, it should contain 8-20 alphanumeric letters and be unique!" is thrown.

   - **`image`**:
     - **Type**: `String`
     - This field is optional and can store a URL or path to the user's profile image.

2. **Model Definition (`User`)**:
   - The `models.User || model("User", UserSchema)` ensures that the `User` model is only created if it doesn't already exist. This is helpful in environments like Next.js, where modules may be hot-reloaded and models could be redefined multiple times.

3. **Export**:
   - The `User` model is exported as the default export, making it available for use in other parts of the application.

### Usage Example

You can use this `User` model to create, read, update, and delete user documents in your MongoDB database. Here's a simple example of creating a new user:

```js
import User from './path/to/userModel';

const createUser = async () => {
  try {
    const newUser = await User.create({
      email: 'example@example.com',
      username: 'validUsername123',
      image: 'https://example.com/profile.jpg'
    });
    console.log('User created:', newUser);
  } catch (error) {
    console.error('Error creating user:', error.message);
  }
};
```

### Considerations

- **Error Handling**: Ensure that you handle potential validation errors properly when creating or updating users, as these constraints will throw errors if violated.
- **Schema Flexibility**: If you need to add more fields or customize the schema further, Mongoose allows you to do so easily by updating the `UserSchema`.

This setup is a solid foundation for handling user data in a MongoDB database, with built-in validation to ensure data integrity.
