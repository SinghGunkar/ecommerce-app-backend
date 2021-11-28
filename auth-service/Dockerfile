FROM node:alpine

# set up working directory of /app
WORKDIR /app

# copy over the package.json file
COPY package.json .

# install the dependencies
RUN npm install

# copy over everything from project directory into the working directory (/app)
COPY . . 

# set up command to run when container first starts up
CMD ["npm", "start"]
