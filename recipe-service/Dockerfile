FROM node:lts

RUN useradd -ms /bin/bash nonroot
RUN mkdir /code && chown -R nonroot:nonroot /code

USER nonroot
WORKDIR /code

COPY package.* .
RUN npm install

COPY . .

ENTRYPOINT ["npm", "run", "start"]