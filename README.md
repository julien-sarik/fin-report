NextJS project bootstrapped with the command below:  
```
podman run --rm -it -v ${PWD}/app:/fin-report node:20-alpine3.17 npx create-next-app@latest fin-report
```

# local development
Run the server with:  
```
podman run --rm --name nextjs -p 3000:3000 -w /fin-report -v ${PWD}/app:/fin-report node:20-alpine3.17 npm run dev
```