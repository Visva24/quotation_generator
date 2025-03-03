# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install
RUN npm install @lottiefiles/lottie-player  # Ensure this package is installed

# Copy project files
COPY . .

# Set Next.js to run on port 3001
ENV PORT=3001

# Build the Next.js app
RUN npm run build

# Expose the correct port
EXPOSE 3001

# Start the application on port 3001
CMD ["npm", "run", "start"]
