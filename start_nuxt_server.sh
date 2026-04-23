#/bin/bash
docker run -p 3000:3000 \
    -e HOST=0.0.0.0 \
    -e PORT=3000 \
    -e NUXT_PUBLIC_API_URL=http://localhost:8080 \
    express-plate-front:latest