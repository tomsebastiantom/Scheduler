# Use an official Nginx image as the base
FROM nginx:stable-alpine

# Copy the local build output to the Nginx HTML directory
COPY dist /usr/share/nginx/html

# Copy the Nginx configuration file to the container
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
