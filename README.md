"# ViteErrorProject" 

Steps required for running project 

npm install

npm build 

npm dev


Issues with project 

After updating the project to vite 5 and adding type="module" in package.json started getting issue with vite dev

Vite build is working perfectly fine.

Vite dev is producing error :
[vite] Pre-transform error: Failed to load url /src/pages/index/main (resolved id: /src/pages/index/main). Does the file exist? 

And the browser shows the following message :

main:1 Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of "". Strict MIME type checking is enforced for module scripts per HTML spec.
