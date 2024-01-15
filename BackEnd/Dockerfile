FROM node:20-alpine
WORKDIR /capstoneBack
COPY . .
EXPOSE 3307
RUN npm install
CMD ["npm", "start"]

# docker build -t lilybarrettpower/capstone-back-end .
# lilybarrett-power@Lily-Barrett-Power BackEnd % docker run -d -p 3000:3307 lilybarrettpower/capstone-back-end