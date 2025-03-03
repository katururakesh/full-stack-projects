# Use an official Java runtime as a parent image
FROM openjdk:23-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the JAR file into the container
COPY target/foodapp-0.0.1-SNAPSHOT.jar app.jar

# Expose the application port
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
