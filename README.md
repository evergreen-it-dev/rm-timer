# rm-timer
Timer for redmine 
Tested on Redmine 2.6.0.stable

## Setup notes

1. Setup "include any script" feature: copy _sidebar.html.erb to app/views/issues/_sidebar.html.erb or add this code to it 

```
<div id="dashboardBox"></div>
<script src="http://[YOUR-PUBLIC-SERVER-FOLDER]/js/issues/issues.box.js"></script>
```
You can set YOUR-PUBLIC-SERVER-FOLDER to any accessible to you public URL. You can use redmine server or any other if you wish.

2. Copy issues/issues.box.js and issues/flipclock.min.js to http://[YOUR-PUBLIC-SERVER-FOLDER]/js/issues/
3. Copy issues/timer.css to http://[YOUR-PUBLIC-SERVER-FOLDER]/css/timer.css
4. Fix issues/issues.box.js [YOUR-PUBLIC-SERVER-FOLDER] includes to your actual URL
5. Restart httpd or redmine

## Enjoy
Start timer button:
![Start timer button](https://image.prntscr.com/image/05373d63e6c140e28d2eb26a3ffaff8c.png)
Working timer:
![Working timer](https://image.prntscr.com/image/658f7e53ace04255a3f416653f689655.png)
