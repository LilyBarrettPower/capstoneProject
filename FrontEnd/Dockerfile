FROM node:20-alpine
WORKDIR /capstoneFront
COPY . .
EXPOSE 8080
RUN npm install
RUN npm run build
CMD ["npm", "run", "dev"] 

# lilybarrett-power@Lily-Barrett-Power FrontEnd % docker run -d -p 80:8080 lilybarrettpower/capstone-front-end
