#!/bin/bash

# Run docker container for development
docker run -it --rm \
  -v $(pwd)/src:/app/src \
  -v $(pwd)/prisma:/app/prisma \
  -p 3000:3000 \
  -p 5555:5555 \
  zenior \
  sh -c "npx prisma db push && (npm run dev & npx prisma studio)"
