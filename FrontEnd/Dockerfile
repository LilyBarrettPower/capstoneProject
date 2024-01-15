FROM node:20-alpine
WORKDIR /capstoneFront
COPY . .
EXPOSE 5173
RUN npm install
RUN npm run build
CMD ["npm", "run", "dev"] 

# lilybarrett-power@Lily-Barrett-Power FrontEnd % docker run -d -p 80:5173 lilybarrettpower/capstone-front-end
