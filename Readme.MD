# myblog
A light weight blog system for github pages 

## This is a very early version,it may change a lot   
example [here](https://archcy.github.io/)  

## Features
1. myblog uses github pages to host your blog,it dose't need extra Auth
2. myblog dsen't need you to build pages when you write a blog,you can edit Your blogs in ${Project}/MarkDown/  
Which you shoud name the file as Order + TitleName +'.md'
3. myblog supports self-adoption (PC and Mobile)

###  About
1. myblog is build from scratch,so it may have bugs.
2. myblog system will dynamically get MD files from ${Project}/MarkDown/ and show it.
3. This is the first version.

### How to use
1. Setup a github pages ([Howto?](https://pages.github.com/))
2. clone myblog to your local storage
3. Configure your username and project name in /App.vue
4. Set your blog title in /App.vue
5. Setup project by run ``` npm install```
6. build the project by run ``` npm rum build```
7. copy /dist to your github pages project dictionary
8. You can new/edit/delete/ dircetly by editing files in your github page project ```${Project}/MarkDown```

Your MarkDown files need to be named as below rules
```
Order .+ ${tags} .+ Name +'.md'
```
```Order``` is like year-month-day-[order of blog in that day]  
such as ```2019-01-12-2.Readme.md ```  
```Order``` is bigger, it will be more advanced   
```${tags}``` is optional,it should be writed like this ```{tag1,tag2,tag3...}```   
amount of tags should better be less than 4   
such as ``` 2019-02-21-1.{compiler,c++}.StackVM.md```


### structure here
```
___________________________________________
|                   |-----/css #css_files_here
|    - /dist--------|
|    |           |  |------index.html #index
|    |           |  |-----/js #js_files_here
|    |           |
|    |           |-----/MarkDown #Put your articles here
|    |           |
|    |           |-----/Pic #You can Store Pictures here(or not)
|    |    
|    |
| /--|--App.vue #change your settings here
|   
|
______________________________________________
```
It still has a Very Long Way to Go

### Version Support
current version : 0.0.1f5  
explore: True  
edit in blog: False  
comment in blog: False  

### Todos
1. beautify
2. support for editing
3. support for highligt