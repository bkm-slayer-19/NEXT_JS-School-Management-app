# Use Node.js as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application code (including prisma folder)
COPY . .

# Generate Prisma Client (don't run migrate in build, do it at runtime)
RUN npx prisma generate

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Create a startup script
RUN echo '#!/bin/sh\n\
# Wait for database to be ready\n\
echo "Waiting for database..."\n\
npx prisma migrate deploy\n\
echo "Database ready, starting app..."\n\
npm start' > /app/start.sh

RUN chmod +x /app/start.sh

# Start the application with database migration
CMD ["/app/start.sh"]