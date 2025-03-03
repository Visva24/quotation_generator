# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install
RUN npm install @lottiefiles/lottie-player

# Copy project files
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the correct port
EXPOSE 3001

# Start the application in development mode
CMD ["npm", "run", "dev"]
