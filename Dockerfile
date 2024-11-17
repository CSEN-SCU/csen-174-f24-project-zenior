# Use an official Node.js image as the base
FROM node:20

# Install system dependencies
RUN apt-get update && apt-get install -y openssl

# Set the working directory inside the container
WORKDIR /app

# Copy files from the host to the container
COPY . .

# Install dependencies
RUN npm install

# Expose the ports
EXPOSE 3000
EXPOSE 5555

# Start dev server and prisma studio
CMD ["sh", "-c", "npx prisma generate && (npm run dev & npx prisma studio)"]
