<?php

if (isset($_POST['submit'])){
    $name = $_POST['name'];
    $mailFrom = $_POST['mail'];
    $message = $_POST['message'];
    $subject = $_POST['subject'];
    $mailTo = "wfoster12@gmail.com";
    $headers = "From: ".$mailFrom;

    mail($mailTo, $subject, $message, $headers);
    header("Location: index.html?mailsent");    
}
