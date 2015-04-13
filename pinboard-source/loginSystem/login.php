<?
require "config.php";
$LS->init();
if(isset($_POST['act_login'])){
 $user=$_POST['login'];
 $pass=$_POST['pass'];
 if($user=="" || $pass==""){
  $msg=array("Error", "Username / Password Wrong !");
 }else{
  if(!$LS->login($user, $pass)){
   $msg=array("Error", "Username / Password Wrong !");
  }
 }
}
?>
<html>
 <head>
  <title>Log In</title>
 </head>
 <body>
  <div id="content">
   <h1>Log In</h1>
   <form action="login.php" method="POST" style="margin:0px auto;display:table;">
    <label>Username / E-Mail</label><br/>
    <input name="login" type="text"/><br/>
    <label>Password</label><br/>
    <input name="pass" type="password"/><br/>
    <label>
     <input type="checkbox" name="remember_me"/> Remember Me
    </label>
    <div clear></div>
    <button style="width:150px;" name="act_login">Log In</button>
   </form>
   <style>input[type=text], input[type=password]{width: 230px;}</style>
   <?
   if(isset($msg)){
    echo $msg[0]."<br/>".$msg[1];
   }
   ?>
   <p>
    <a class="button" href="register.php">Register</a>
   </p>
   <p>
    <a class="button" href="reset.php">Forgot Your Password ?</a>
   </p>
  </div>
  <!-- http://subinsb.com/php-logsys -->
 </body>
</html>