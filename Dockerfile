FROM node:18-alpine

ENV SHOPIFY_API_KEY=710112a353529d2916cc33b1a6ebd1b8
ENV SHOPIFY_API_SECRET=663de4dc29d484dd78e60957d3ee0f40
ENV SCOPES=write_products
ENV HOST=https://admin.shopify.com/store/myy-storee-testt
EXPOSE 8080
WORKDIR /app
COPY web .
RUN npm install
RUN cd frontend && npm install && npm run build
CMD ["npm", "run", "serve"]
