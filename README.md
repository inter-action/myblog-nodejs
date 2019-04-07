
## before start you dev

```
npm i -g nodemon
```


## debugging
using chrome:

`make debug.tsc.chrome`

then open chrome `chrome://inspect/#devices` click link listed under remote devices section.

using vscode:
* setting a break point
* then open debug pannel, run `Launch Program`, note the code has to be compiled before starting a vscode debugger.



links:
* https://nodejs.org/en/docs/guides/debugging-getting-started/
* ! https://hackernoon.com/debugging-javascript-typescript-node-apps-with-chrome-devtools-vs-code-and-webstorm-97b882aee0ad
* [Debugging TypeScript Mocha Tests With VSCode](https://medium.com/@benlesh/debugging-typescript-mocha-tests-with-vscode-89310051531)
* [Debugging Visual Studio Code (Node)](https://www.youtube.com/watch?v=yFtU6_UaOtA)



## deployment
the automatic deployment process depends on `anisble` & `docker`, you have to install them first

### anisible:
! configure your ssh correctly on both your dev computer & your server

create a [inventory](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html#host-variables) file under anisible folder, `touch ansible/hosts`, insert your server 
content with format like below

```
[staging]
139.59.170.69

[production]
139.59.170.70

[wordpress]
139.59.170.69:<your customized ssh port, if not 22>
```



links:
* [Automating Server Setup with Ansible](https://deliciousbrains.com/automating-server-setup-ansible/)

## typescript

* typescript path alias, 
    * https://dev.to/lars124/path-aliases-with-typescript-in-nodejs-4353


## docker 

* creating a docker build
```
docker build -t <your_dockerhub_username>/<your_dockerhub_reponame> .

# push to your remote repo
docker push <REPOSITORY>

# clean docker resources
docker system prune -a
```

## todos

* enable mocha test debugging in vscode, https://medium.com/@FizzyInTheHall/run-typescript-mocha-tests-in-visual-studio-code-58e62a173575

* add hemlet
* nodejs production practice
* possible SSR?
* fix security vunerbility
* add tslint, make unused variable error
* MD_ROOT
* make nodemon globally installed?
* server crash report?

 
